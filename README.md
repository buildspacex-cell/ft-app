# Fundamentally True — ft-app

> We don't say buy. We don't say sell. We tell you whether the reasons you trusted are still true.

**One codebase → Web (Vercel) + iOS (Capacitor) + Android (Capacitor)**

## Quick start

```bash
git clone https://github.com/buildspacex-cell/ft-app.git
cd ft-app && npm install
cp .env.example .env.local   # fill in keys
npm run dev                  # http://localhost:3000
```

## Deploy web
Connect to Vercel. Add env vars. Push to main → auto-deploys.
Cron fires at 6am IST (Mon-Fri) automatically.

## Build native apps
```bash
npm run cap:ios      # opens Xcode
npm run cap:android  # opens Android Studio
```

## Database setup
Paste `supabase/migrations/001_initial_schema.sql` into your Supabase SQL editor.

## 10 NSE launch stocks
RELIANCE · HDFCBANK · TCS · INFY · HINDUNILVR · ONGC · SUNPHARMA · MARUTI · BAJFINANCE · WIPRO

## Compliance
Never say buy/sell — enforced in LLM prompt + regex filter. Disclaimer on every page.
Book SEBI lawyer call before public launch.
