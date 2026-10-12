import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uz from './locales/uz.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

export const LANGUAGES = ['uz', 'ru', 'en'];
export const DEFAULT_LANGUAGE = 'ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    supportedLngs: LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'fido-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

const syncDocument = (lng) => {
  document.documentElement.lang = lng;
  document.title = i18n.t('meta.title');
};

i18n.on('languageChanged', syncDocument);
if (i18n.isInitialized) syncDocument(i18n.resolvedLanguage);

export default i18n;
