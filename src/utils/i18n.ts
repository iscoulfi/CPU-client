import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../languages/en/translation.json';
import translationRU from '../languages/ru/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
});

export default i18next;
