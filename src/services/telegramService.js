const API_URL = 'https://api.telegram.org';
const BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

export class TelegramConfigError extends Error {
  constructor() {
    super('Telegram bot token or chat id is not configured');
    this.name = 'TelegramConfigError';
  }
}

export const isTelegramConfigured = () => Boolean(BOT_TOKEN && CHAT_ID);

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const row = (label, value) => (value ? `<b>${label}:</b> ${escapeHtml(value)}` : null);

function formatLead(lead) {
  return [
    '🆕 <b>Yangi zayavka — Demo so‘rovi</b>',
    '',
    row('F.I.Sh.', lead.fullName),
    row('Lavozim', lead.position),
    row('Kompaniya', lead.company),
    row('Telefon', lead.phone),
    row('Email', lead.email),
    row('Mahsulot', lead.product),
    row('Xabar', lead.message),
    '',
    row('Til', lead.lang?.toUpperCase()),
    row('Sahifa', lead.page),
    row('Vaqt', new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })),
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export async function sendLead(lead) {
  if (!isTelegramConfigured()) throw new TelegramConfigError();

  // URLSearchParams — "simple request", brauzer CORS preflight yubormaydi
  const body = new URLSearchParams({
    chat_id: CHAT_ID,
    text: formatLead(lead),
    parse_mode: 'HTML',
    disable_web_page_preview: 'true',
  });

  const response = await fetch(`${API_URL}/bot${BOT_TOKEN}/sendMessage`, { method: 'POST', body });
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.description || `Telegram API error: ${response.status}`);
  }
  return data.result;
}
