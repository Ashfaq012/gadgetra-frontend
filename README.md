# Gadgetra.lk — Frontend

React + Vite + TypeScript + Tailwind storefront. Fetches the product catalog
from the [backend](../backend) API, keeps the cart in `localStorage`, and
posts checkout to the backend — which recomputes prices and shipping from the
database and hands back a pre-filled WhatsApp link.

See the [root README](../README.md) for the overall project layout.

## 1. Run the backend first

This app needs the API running to load products or check out. Follow
[../backend/README.md](../backend/README.md) to get it running locally (or
point at your deployed Render URL), then come back here.

## 2. Run the frontend

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` to wherever the backend is running —
`http://localhost:4000` for local dev, or your Render URL once deployed.

## 3. Coming-soon mode

Set `VITE_COMING_SOON=true` in `.env` (and redeploy) to show a simple holding
page at every route instead of the store — handy while you're still setting
things up. Set it back to `false` to bring the real site back; no other code
changes needed.

## 4. Deploying

[Vercel](https://vercel.com) or [Netlify](https://netlify.com):

- **Root Directory**: `frontend` (important in a monorepo — the host needs to
  know the app doesn't live at the repo root)
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_BASE_URL` (pointing at your deployed backend) and
  `VITE_COMING_SOON` as environment variables in the host's dashboard

Then point your `gadgetra.lk` domain's DNS at your frontend host.

## 5. Managing products and orders

No admin UI yet — use the backend API directly with your `ADMIN_API_KEY`. See
[../backend/README.md](../backend/README.md) for the full endpoint list and
example requests.
