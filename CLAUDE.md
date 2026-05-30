# LegalDraft — AI Legal Document Generator

**Live:** legal-docs-rho.vercel.app
**Payhip credits:** payhip.com/b/XmlgN ($19 / 5 docs)
**Vercel project:** dizzy-sai-projects1/legal-docs

---

## Status

| Item | Status |
|------|--------|
| App deployed | ✅ Live at legal-docs-rho.vercel.app |
| Payhip credit product | ✅ $19, description set |
| Guarantee block on landing page | ✅ Added |
| AI generation (Claude) | ⚠️ Template fallback — needs ANTHROPIC_API_KEY |
| Payment acceptance | 🔴 Blocked — Payhip PayPal/Stripe not connected |

---

## User Action Required

**Add API key to enable full Claude AI generation:**
```bash
cd /Users/dizzynetwork/legal-docs
vercel env add ANTHROPIC_API_KEY production
# Paste key when prompted
# Then promote from: vercel.com/dizzy-sai-projects1/legal-docs/deployments
```

---

## How It Works

1. User selects doc type (NDA, Freelance Contract, LLC Agreement, Offer Letter, SaaS ToS)
2. Fills in their details + jurisdiction
3. First doc free → buy Payhip pack → enter access code → 5 more docs
4. Access codes (pre-generated): `LGLD-DZY25-B1` through `LGLD-DZY25-B5`
5. Buyer flow: Payhip checkout → ZIP file → access code → paste in app

---

## Supported Doc Types

- NDA (Non-Disclosure Agreement)
- Freelance Contract
- LLC Operating Agreement
- Employment Offer Letter
- SaaS Terms of Service

---

## Key Files

| File | Purpose |
|------|---------|
| `app.js` | Main Express server, contains `PAYHIP_URL` |
| `public/index.html` | Frontend UI |
| `package.json` | Dependencies |
| `vercel.json` | Vercel config |

---

## Deploy

```bash
git add -A && git commit -m "update" && git push origin master
# Check vercel.com/dizzy-sai-projects1/legal-docs → Promote to Production
```

---

## Revenue Tracking

| Metric | Value |
|--------|-------|
| Price per pack | $19 / 5 docs |
| Payhip code | XmlgN |
| Sales to date | 0 |
| Revenue to date | $0 |
