
import en_UK from './en_UK.json';

const DEFAULT_LANG = 'en_UK';
const translations = {
    en_UK,
};

const translate = (key, lang) => {
    const translationsInLanguage = translations[lang];

    return translationsInLanguage[key] || key;
};

export { translate, DEFAULT_LANG };