//Import Translate
import i18next from "i18next";
import t from "i18next"

//Import Images
import britishFlag from '../../images/britishFlag.svg';
import italianFlag from '../../images/italianFlag.svg';

export const LanguageSelect = () => {
    // In these ternary operators 't' is checked to see what is the global language state.
    // If it's not english, then it's italian and vice versa.
    const lng = t.language === 'en'
    ? 'it' 
    : 'en'

    const img = t.language === 'en'
    ? italianFlag
    : britishFlag

    // This function imports changeLanguage from i18next and gives the code in string 
    // format via the lng parameter.
    const languageSwitch = (lng) => {
        i18next.changeLanguage(lng)
    }

    return (
        <>
            <span className="img-languages" onClick={() => languageSwitch(lng)}>
                <img src={img} alt={'Language Select'} />
            </span>
        </>
    )
}