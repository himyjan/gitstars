import { createI18n } from 'vue-i18n';
import zhHans from './zh-hans';
import zhHant from './zh-hant';
import en from './en';

export const createI18nByLocale = (locale = 'zh-hans') =>
  createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: {
      'zh-hans': zhHans,
      'zh-hant': zhHant,
      en,
    },
  });
