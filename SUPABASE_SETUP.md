# Supabase SQL Setup — Aicha Wellness Store

Paste this into **Supabase Dashboard → SQL Editor → New Query** and click **Run**.

```sql
-- =========================================
-- PRODUCTS TABLE
-- =========================================
create table if not exists products (
  id           text primary key,
  name         text not null,
  name_ar      text,
  price        numeric not null,
  description  text,
  description_ar text,
  category     text,
  category_ar  text,
  image_url    text,
  is_bestseller boolean default false,
  created_at   timestamptz default now()
);

-- =========================================
-- ORDERS TABLE
-- =========================================
create table if not exists orders (
  id               text primary key,
  customer_name    text not null,
  whatsapp_number  text,
  address          text,
  items            jsonb not null default '[]',
  total            numeric not null,
  status           text not null default 'pending',
  date             text not null
);

-- =========================================
-- MESSAGES TABLE
-- =========================================
create table if not exists messages (
  id               text primary key,
  customer_name    text not null,
  whatsapp_number  text,
  message          text,
  type             text,
  date             text not null,
  is_read          boolean default false
);
```

> **Storage bucket** `product-images` should already be created as **Public** (you did this ✅).

---

## Policies (optional but recommended for production)

By default, the tables are accessible with your publishable key and no RLS.
For a production setup you can add RLS policies later.
