import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from './en';
import sk from './sk';

i18n
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'sk',
    lng: 'sk',
    debug: true,
    resources: {
      en: {
        translation: en
      },
      sk: {
        translation: sk
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    },
    react: {
      wait: true
    }
  });


export default i18n;
