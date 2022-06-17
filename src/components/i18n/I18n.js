import i18n from 'i18next'; 
import Backend from 'i18next-xhr-backend'; 
import LanguageDetector from 'i18next-browser-languagedetector'; 


i18n .use(Backend) 
    .use(LanguageDetector) 
    .init({ fallbackLng: 'en', 
            debug: true, 
            react: { bindI18n: 'languageChanged', 
                    bindI18nStore: '', 
                    transEmptyNodeValue: '', 
                    transSupportBasicHtmlNodes: true, 
                    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'], 
                    useSuspense: false } });
                    
export default i18n;