import { mockRequest, mockShared } from './mock/mockServer';

export const contentService = {
  async getHome(lang) {
    const [home, shared] = await Promise.all([mockRequest('home', lang), mockShared()]);
    return { ...home, clients: { ...home.clients, logos: shared.clients } };
  },

  async getLayout(lang) {
    const [layout, shared] = await Promise.all([mockRequest('layout', lang), mockShared()]);
    return { ...layout, contacts: shared.contacts, socials: shared.socials };
  },

  getProducts(lang) {
    return mockRequest('products', lang);
  },
};
