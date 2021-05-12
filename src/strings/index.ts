import i18n from 'wix-react-native-i18n';

const stringsByLocale = {
  en: () => require('./messages_en.json'),
};

module.exports = i18n(stringsByLocale);
