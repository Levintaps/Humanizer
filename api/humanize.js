// api/humanize.js — Vercel Serverless Function
// Auto-fallback: tries Groq first, then Gemini if Groq hits its limit.
// Set in Vercel Environment Variables:
//   GROQ_API_KEY    — from https://console.groq.com/ (free)
//   GEMINI_API_KEY  — from https://aistudio.google.com/ (free, fallback)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, systemPrompt } = req.body || {};
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text.' });
  }
  if (text.length > 12000) {
    return res.status(400).json({ error: 'Text too long. Maximum 12,000 characters.' });
  }

  // ── Try providers in order. First success wins. ──────────────────────────
  const providers = [
    { name: 'Groq',   fn: () => callGroq(text, systemPrompt) },
    { name: 'Gemini', fn: () => callGemini(text, systemPrompt) },
  ];

  let lastError = null;
  let allLimited = true;

  for (const provider of providers) {
    try {
      console.log(`Trying ${provider.name}...`);
      const result = await provider.fn();
      if (result) {
        console.log(`Success via ${provider.name}`);
        return res.status(200).json({ result, provider: provider.name });
      }
    } catch (err) {
      console.warn(`${provider.name} failed (${err.status}): ${err.message}`);
      lastError = err;
      if (err.status === 400) { allLimited = false; break; }
      if (err.status !== 429 && err.status !== 503) allLimited = false;
      continue;
    }
  }

  // ── All providers failed ─────────────────────────────────────────────────
  // If every provider hit rate limits, return special flag so frontend
  // shows the "system limit reached" banner instead of a generic error.
  if (allLimited) {
    return res.status(429).json({
      error: 'RATE_LIMIT_ALL',
      message: 'Our AI system has reached its daily limit. Please try again in a few minutes or come back later. We apologize for the inconvenience.',
    });
  }

  const status = lastError?.status || 500;
  return res.status(status).json({
    error: lastError?.message || 'All AI providers are currently unavailable. Please try again later.',
  });
}

// ── GROQ — Llama 3.3 70B (primary) ──────────────────────────────────────────
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
        { role: 'user',   content: text },
      ],
    }),
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    const msg  = body?.error?.message || `Groq error ${resp.status}`;
    throw Object.assign(new Error(msg), { status: resp.status });
  }

  const data = await resp.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

// ── GEMINI 1.5 Flash (fallback) ──────────────────────────────────────────────
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
    const msg  = body?.error?.message || `Gemini error ${resp.status}`;
    throw Object.assign(new Error(msg), { status: resp.status });
  }

  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}