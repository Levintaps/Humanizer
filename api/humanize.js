// api/humanize.js — Vercel Serverless Function
// Set in Vercel Environment Variables:
//   GROQ_API_KEY    — from https://console.groq.com/ (free, recommended)
//   GEMINI_API_KEY  — from https://aistudio.google.com/ (optional fallback)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, systemPrompt, docMode } = req.body || {};

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text.' });
  }
  if (text.length > 12000) {
    return res.status(400).json({ error: 'Text too long. Maximum 12,000 characters.' });
  }

  // docMode = true means this is a document section humanize call.
  // Use a short, focused system prompt to save tokens and avoid Groq TPM limits.
  const prompt = docMode
    ? buildDocPrompt(req.body)
    : (systemPrompt || 'Rewrite the following text to sound natural and human-written. Preserve all meaning. Output only the rewritten text.');

  // Build provider list — only include configured providers
  const providers = [];
  if (process.env.GROQ_API_KEY)   providers.push({ name: 'Groq',   fn: () => callGroq(text, prompt) });
  if (process.env.GEMINI_API_KEY) providers.push({ name: 'Gemini', fn: () => callGemini(text, prompt) });

  if (providers.length === 0) {
    return res.status(500).json({
      error: 'No AI provider configured. Add GROQ_API_KEY in your Vercel environment variables.',
    });
  }

  let lastError  = null;
  let rateLimited = 0;

  for (const provider of providers) {
    try {
      console.log(`Trying ${provider.name} (docMode=${!!docMode}, textLen=${text.length})...`);
      const result = await provider.fn();
      if (result) {
        console.log(`✓ Success via ${provider.name}`);
        return res.status(200).json({ result, provider: provider.name });
      }
    } catch (err) {
      console.error(`✗ ${provider.name} failed — status:${err.status} msg:${err.message}`);
      lastError = err;
      if (err.status === 429 || err.status === 503) rateLimited++;
      if (err.status === 400) break;
      continue;
    }
  }

  // All providers rate-limited → show limit banner
  if (rateLimited > 0 && rateLimited === providers.length) {
    return res.status(429).json({
      error: 'RATE_LIMIT_ALL',
      message: 'Our AI system has reached its daily limit. Please try again in a few minutes.',
    });
  }

  const status = lastError?.status || 500;
  return res.status(status).json({
    error: lastError?.message || 'AI service temporarily unavailable. Please try again.',
  });
}

// ── Short focused prompt for document section humanization ────────────────────
// Much shorter than the full system prompt = fewer tokens = fewer Groq TPM errors
function buildDocPrompt(body) {
  const style    = body.style    || 'academic';
  const strength = body.strength || 'moderate';

  const styleInstructions = {
    casual:       'Rewrite in a friendly, conversational tone. Contractions OK. First person OK.',
    professional: 'Rewrite in a clear, professional tone. No contractions. Neutral perspective.',
    thesis:       'STRICT: Third person only (never I/we/my). No contractions. Formal academic language. Passive voice acceptable. Use hedging (suggests, appears to, may indicate).',
    research:     'STRICT: Third person only. No contractions. Scientific language. Passive voice OK. Preserve all statistics and citations exactly.',
    academic:     'Scholarly tone. Third person preferred. No contractions. Preserve academic rigour.',
    blog:         'Engaging blog tone. First person OK. Conversational. Varied sentence lengths.',
    email:        'Concise professional email tone. Short paragraphs. Direct.',
    creative:     'Vivid expressive style. Varied sentence lengths. Metaphors welcome.',
    simple:       'Very plain language. Short sentences. Easy vocabulary.',
  };

  const strengthInstructions = {
    light:    'Minimal changes — fix obvious AI patterns only (~20-30% words change).',
    moderate: 'Significantly rework phrasing and structure (~40-60% words change).',
    heavy:    'Complete rewrite in human voice (~60-80% words change).',
  };

  return `You are an expert editor. ${styleInstructions[style] || styleInstructions.academic}

${strengthInstructions[strength] || strengthInstructions.moderate}

Rules:
- Eliminate AI patterns: "It is important to note", "Furthermore", "Moreover", "In conclusion", "In today's world"
- Preserve ALL facts, numbers, citations, and meaning exactly
- Output ONLY the rewritten text — no preamble, no notes`;
}

// ── GROQ — Llama 3.3 70B ─────────────────────────────────────────────────────
async function callGroq(text, systemPrompt) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw Object.assign(new Error('GROQ_API_KEY not configured.'), { status: 500 });

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 2048,   // reduced from 4096 — sections are short
      temperature: 0.75,
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
  const result = data.choices?.[0]?.message?.content?.trim();
  if (!result) throw Object.assign(new Error('Groq returned empty response.'), { status: 500 });
  return result;
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
      generationConfig: { temperature: 0.75, maxOutputTokens: 2048 },
    }),
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({}));
    const msg  = body?.error?.message || `Gemini error ${resp.status}`;
    throw Object.assign(new Error(msg), { status: resp.status });
  }

  const data = await resp.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!result) throw Object.assign(new Error('Gemini returned empty response.'), { status: 500 });
  return result;
}