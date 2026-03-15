# Your Humanizer — Vercel Deployment Guide

## Project Structure
```
your-humanizer/
├── index.html          ← Main frontend (your website)
├── api/
│   └── humanize.js     ← Serverless function (hides your API key)
└── vercel.json         ← Vercel configuration
```

---

## Step 1: Get a Free API Key

### Option A: Groq (RECOMMENDED — Free, Fast, Powerful)
Groq runs **Llama 3.3 70B** — a 70-billion parameter model that produces significantly better, more natural humanization than smaller free models.

1. Go to https://console.groq.com/
2. Sign up for a free account
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)

### Option B: Google Gemini (Also Free)
1. Go to https://aistudio.google.com/
2. Sign in with a Google account
3. Click **Get API key** → **Create API key**
4. Copy the key

---

## Step 2: Deploy to Vercel

### Method A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from this folder
vercel

# Follow the prompts — select "No framework"
```

### Method B: Vercel Dashboard (Drag & Drop)
1. Go to https://vercel.com/
2. Click **Add New → Project**
3. Drag and drop this folder, OR connect your GitHub repo

---

## Step 3: Add Environment Variables

In your Vercel dashboard → your project → **Settings** → **Environment Variables**:

### For Groq (Recommended):
| Variable Name  | Value                    |
|---------------|--------------------------|
| `GROQ_API_KEY` | `gsk_your_key_here`      |
| `AI_PROVIDER`  | `groq`                   |

### For Gemini:
| Variable Name    | Value                  |
|-----------------|------------------------|
| `GEMINI_API_KEY` | `your_gemini_key_here` |
| `AI_PROVIDER`    | `gemini`               |

> ⚠️ **Important**: After adding environment variables, click **Redeploy** in the Deployments tab.

---

## Step 4: Custom Domain (Optional)

In Vercel dashboard → your project → **Settings** → **Domains**:
- Add your domain (e.g., `yourhumanizer.com`)
- Update your domain's DNS to point to Vercel

---

## SEO Setup

Update these in `index.html` before deploying:

```html
<!-- Line ~18: Update canonical URL -->
<link rel="canonical" href="https://YOUR-ACTUAL-DOMAIN.com/" />

<!-- Lines ~21-44: Update og: and twitter: URLs/images -->
<meta property="og:url" content="https://YOUR-ACTUAL-DOMAIN.com/" />
```

Also add an `og-image.png` (1200×630px) to your project root for social sharing previews.

---

## Why Groq + Llama 3.3 70B?

| Model | Quality | Speed | Cost |
|-------|---------|-------|------|
| Llama 3.3 70B (Groq) | ⭐⭐⭐⭐⭐ | Very Fast | Free |
| Gemini 1.5 Flash | ⭐⭐⭐⭐ | Fast | Free |
| Gemini 1.0 Pro | ⭐⭐⭐ | Medium | Free |

Groq's infrastructure is purpose-built for fast inference, and Llama 3.3 70B is one of Meta's best models for writing tasks. The free tier is generous enough for a public tool.

---

## Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally (simulates the serverless function)
vercel dev
```

Then open http://localhost:3000

---

## Troubleshooting

**"API key error"** → Check your environment variable names match exactly (case-sensitive)

**"Rate limit reached"** → Groq free tier has generous limits. If exceeded, wait 60 seconds.

**API not calling** → Make sure you redeployed after adding environment variables.

**CORS error** → This shouldn't happen since the API call goes to your own `/api/humanize` endpoint.