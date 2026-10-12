# Fido Biznes — web

React + Vite. Dizayn: `Fido  - design.fig`.

## Ishga tushirish

```bash
npm install
cp .env.example .env   # token va chat ID ni kiriting
npm run dev
```

## Tuzilma

- `src/pages` — Home, Placeholder (qolgan bo'limlar), 404
- `src/components/home` — bosh sahifa bo'limlari
- `src/services/mock` — local mock service (`data/{uz,ru,en}/*.json`)
- `src/services/contentService.js` — kontent API (mock ustida)
- `src/services/telegramService.js` — zayavkalarni Telegram'ga yuborish
- `src/i18n` — i18next, UI matnlari (`locales/*.json`)

Til `?lang=uz|ru|en` orqali ham tanlanadi, tanlov `localStorage` da saqlanadi.

> Diqqat: `VITE_*` o'zgaruvchilari build ichiga kiradi va brauzerda ko'rinadi.
> Production uchun Telegram so'rovini backend yoki serverless funksiya orqali yuboring.
