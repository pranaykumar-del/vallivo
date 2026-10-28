# Vallivo — Premium Cacao Brand Website

A full-stack, premium single-page application for the Vallivo drinking cacao brand.
Built with React + Vite + Tailwind CSS + Supabase.

---

## 🗂 Folder Structure

```
vallivo/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky nav with mobile menu
│   │   ├── Hero.jsx           # Full-screen hero with floating jar
│   │   ├── MarqueeBanner.jsx  # Scrolling ticker strip
│   │   ├── Product.jsx        # Cacao No.01 product section
│   │   ├── Experience.jsx     # Before/After split layout
│   │   ├── Story.jsx          # Brand story on dark background
│   │   ├── OrderForm.jsx      # Order form → Supabase + WhatsApp
│   │   ├── WhatsAppButton.jsx # Floating WhatsApp CTA
│   │   └── Footer.jsx
│   ├── lib/
│   │   ├── supabase.js        # Supabase client + placeOrder()
│   │   └── useScrollReveal.js # Intersection Observer hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Tailwind + custom design tokens
├── supabase_schema.sql        # Run this in Supabase SQL editor
├── .env.example               # Copy to .env and fill in your keys
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ⚙️ Local Setup

### 1. Install dependencies

```bash
cd vallivo
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_WHATSAPP_NUMBER=919876543210   # Indian number without +
```

### 3. Set up Supabase

1. Go to [supabase.com](https://supabase.com) → create a new project
2. Open **SQL Editor** and paste the contents of `supabase_schema.sql`
3. Click **Run** — this creates the `orders` table with RLS policies
4. Copy your **Project URL** and **anon public key** from:
   - Project Settings → API → Project URL
   - Project Settings → API → Project API Keys → `anon public`

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🚀 Build & Deploy

```bash
npm run build      # Creates dist/ folder
npm run preview    # Preview the production build locally
```

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add your environment variables in Vercel dashboard under:
Project → Settings → Environment Variables

### Deploy to Netlify

```bash
npm run build
# Drag & drop the dist/ folder to netlify.com/drop
```

Add environment variables in:
Site Settings → Environment Variables

---

## 🎨 Design System

| Token | Value |
|---|---|
| Navy | `#1E3A5F` |
| Navy Light | `#2A4F7F` |
| Navy Dark | `#14273F` |
| Cream | `#F5F1EA` |
| Gold | `#C9A84C` |
| Gold Light | `#E2C46E` |
| Gold Dark | `#A8872E` |
| Display font | Cormorant Garamond |
| Body font | DM Sans |

---

## 🗃 Supabase Orders Table

| Column | Type | Notes |
|---|---|---|
| id | uuid | Auto-generated primary key |
| name | text | Customer name |
| phone | text | Customer phone |
| address | text | Delivery address |
| quantity | integer | Number of jars (min 1) |
| product | text | Defaults to "Cacao No.01" |
| created_at | timestamptz | Auto-set timestamp |

View orders in **Supabase → Table Editor → orders**.

---

## 📱 WhatsApp Integration

Set `VITE_WHATSAPP_NUMBER` to your business number (no `+`, no spaces):
```
919876543210  # for +91 98765 43210
```

Both the order form fallback and the floating button use this number.

---

## ✅ Checklist Before Launch

- [ ] Fill in `.env` with real Supabase keys
- [ ] Run `supabase_schema.sql` in your Supabase project
- [ ] Set `VITE_WHATSAPP_NUMBER` to your real WhatsApp Business number
- [x] Website domain set to `www.vallivo.com`
- [ ] Update Instagram handle in Footer.jsx
- [ ] Test order form end-to-end (check Supabase Table Editor)
- [ ] Build and deploy to Vercel / Netlify
