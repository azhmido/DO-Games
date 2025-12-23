import en from './locales/en.json';
import id from './locales/id.json';

// Dictionary data bahasa
export const translations = {
  en,
  id
};

/**
   @param {string} lang 
   @param {string} path
   @returns {string}
 */
export const getTranslation = (lang, path) => {
  const keys = path.split('.');
  
  let result = translations[lang] || translations['en'];
  
  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      console.warn(`Translation path not found: ${path} for language: ${lang}`);
      return path; 
    }
  }
  
  return result;
};