-- Fundamentally True — initial schema
-- Run via: supabase db push  OR  paste into Supabase SQL editor

-- Enable pgvector for news embeddings
create extension if not exists vector;

-- ─── users ───────────────────────────────────────────────────────────────────
create table if not exists users (
  id                  uuid primary key default gen_random_uuid(),
  email               text unique not null,
  created_at          timestamptz default now(),
  push_token          text,
  timezone            text default 'Asia/Kolkata',
  onesignal_player_id text
);

alter table users enable row level security;

create policy "Users can read own row"
  on users for select using (auth.uid() = id);

create policy "Users can update own row"
  on users for update using (auth.uid() = id);

-- ─── stocks ──────────────────────────────────────────────────────────────────
create table if not exists stocks (
  ticker              text primary key,
  name                text not null,
  exchange            text,
  sector              text,
  shop_story_json     jsonb,
  revenue_streams_json jsonb,
  updated_at          timestamptz default now()
);

-- Public read — no auth needed for stock data
alter table stocks enable row level security;
create policy "Anyone can read stocks" on stocks for select using (true);
create policy "Service role can write stocks" on stocks for all using (auth.role() = 'service_role');

-- ─── theses ──────────────────────────────────────────────────────────────────
create table if not exists theses (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references users(id) on delete cascade,
  ticker       text references stocks(ticker),
  reasons_json jsonb not null default '[]',
  created_at   timestamptz default now()
);

alter table theses enable row level security;

create policy "Users own their theses"
  on theses for all using (auth.uid() = user_id);

-- ─── digests ─────────────────────────────────────────────────────────────────
create table if not exists digests (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references users(id) on delete cascade,
  date         date not null,
  payload      jsonb not null default '{}',
  generated_at timestamptz,
  sent_at      timestamptz,
  unique(user_id, date)
);

alter table digests enable row level security;

create policy "Users can read own digests"
  on digests for select using (auth.uid() = user_id);

-- ─── feedback ────────────────────────────────────────────────────────────────
create table if not exists feedback (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references users(id) on delete cascade,
  digest_id   uuid references digests(id) on delete cascade,
  story_index int not null,
  rating      text check (rating in ('useful', 'noise', 'knew')),
  note        text,
  created_at  timestamptz default now()
);

alter table feedback enable row level security;

create policy "Users own their feedback"
  on feedback for all using (auth.uid() = user_id);

-- ─── news_articles ───────────────────────────────────────────────────────────
create table if not exists news_articles (
  id          uuid primary key default gen_random_uuid(),
  source      text,
  headline    text,
  body        text,
  url         text unique,
  fetched_at  timestamptz default now(),
  embedding   vector(1536)
);

-- Service role only — users never read news directly
alter table news_articles enable row level security;
create policy "Service role can manage news" on news_articles for all using (auth.role() = 'service_role');

-- ─── seed launch stocks (NSE India) ──────────────────────────────────────────
insert into stocks (ticker, name, exchange, sector) values
  ('RELIANCE',    'Reliance Industries',         'NSE', 'Conglomerate'),
  ('HDFCBANK',    'HDFC Bank',                   'NSE', 'Banking'),
  ('TCS',         'Tata Consultancy Services',   'NSE', 'IT Services'),
  ('INFY',        'Infosys',                     'NSE', 'IT Services'),
  ('HINDUNILVR',  'Hindustan Unilever',          'NSE', 'FMCG'),
  ('ONGC',        'ONGC',                        'NSE', 'Energy'),
  ('SUNPHARMA',   'Sun Pharmaceutical',          'NSE', 'Pharma'),
  ('MARUTI',      'Maruti Suzuki',               'NSE', 'Auto'),
  ('BAJFINANCE',  'Bajaj Finance',               'NSE', 'NBFC'),
  ('WIPRO',       'Wipro',                       'NSE', 'IT Services')
on conflict (ticker) do nothing;
