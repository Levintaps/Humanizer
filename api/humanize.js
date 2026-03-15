export default async function handler(req, res) {
  // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { text, systemPrompt } = req.body || {};
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid text field.' });
    }
    if (text.length > 12000) {
        return res.status(400).json({ error: 'Text too long. Maximum 12,000 characters.' });
    }

    const provider = (process.env.AI_PROVIDER || 'groq').toLowerCase();

    try {
        let result;
        if (provider === 'gemini') {
        result = await callGemini(text, systemPrompt);
        } else {
        result = await callGroq(text, systemPrompt);
        }
        return res.status(200).json({ result });
    } catch (err) {
        console.error('API error:', err);
        const status = err.status || 500;
        return res.status(status).json({ error: err.message || 'Internal server error' });
    }
}

// ── GROQ (Llama 3.3 70B — free, very fast, excellent writing quality) ──────
async function callGroq(text, systemPrompt) {
    const key = process.env.GROQ_API_KEY;
    if (!key) throw Object.assign(new Error('GROQ_API_KEY not configured.'), { status: 500 });

    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 4096,
        temperature: 0.78,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text },
        ],
        }),
    });

    if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        const msg = body?.error?.message || `Groq error ${resp.status}`;
        throw Object.assign(new Error(msg), { status: resp.status });
    }

    const data = await resp.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
}

// ── GEMINI 1.5 FLASH (Google — free tier) ───────────────────────────────────
async function callGemini(text, systemPrompt) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw Object.assign(new Error('GEMINI_API_KEY not configured.'), { status: 500 });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: { temperature: 0.78, maxOutputTokens: 4096 },
        }),
    });

    if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        const msg = body?.error?.message || `Gemini error ${resp.status}`;
        throw Object.assign(new Error(msg), { status: resp.status });
    }

    const data = await resp.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}