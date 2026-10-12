// Local mock server: JSON fayllarni "backend" kabi qaytaradi (kechikish bilan)
import shared from './data/shared.json';

const loaders = import.meta.glob('./data/*/*.json');
const DELAY = Number(import.meta.env.VITE_MOCK_DELAY ?? 300);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = (value) => JSON.parse(JSON.stringify(value));

export class MockNotFoundError extends Error {
  constructor(resource, lang) {
    super(`Mock resource not found: ${lang}/${resource}`);
    this.name = 'MockNotFoundError';
    this.status = 404;
  }
}

export async function mockRequest(resource, lang) {
  const load = loaders[`./data/${lang}/${resource}.json`];
  if (!load) throw new MockNotFoundError(resource, lang);

  const [module] = await Promise.all([load(), wait(DELAY)]);
  return clone(module.default);
}

export async function mockShared() {
  await wait(DELAY / 2);
  return clone(shared);
}
