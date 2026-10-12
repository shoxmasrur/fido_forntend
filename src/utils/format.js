const LOCALES = { uz: 'uz-Latn-UZ', ru: 'ru-RU', en: 'en-US' };

export function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(LOCALES[lang] ?? lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

// +998 XX XXX XX XX
export function formatPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (!digits.startsWith('998')) digits = `998${digits}`;
  digits = digits.slice(0, 12);

  const parts = [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5, 8), digits.slice(8, 10), digits.slice(10, 12)];
  return `+${parts.filter(Boolean).join(' ')}`;
}

export const isPhoneComplete = (value) => value.replace(/\D/g, '').length === 12;
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
