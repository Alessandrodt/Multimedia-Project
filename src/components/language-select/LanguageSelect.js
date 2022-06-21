//Import Translate
import i18next from "i18next";
import t from "i18next"

//Import Images

export const LanguageSelect = () => {
    // In these ternary operators 't' is checked to see what is the global language state.
    // If it's not english, then it's italian and vice versa.
    const lng = t.language === 'en'
    ? 'it' 
    : 'en'


    // This function imports changeLanguage from i18next and gives the code in string 
    // format via the lng parameter.
    const languageSwitch = (lng) => {
        i18next.changeLanguage(lng)
    }

    return (
        <>
            <label class="switch">
            <input type="checkbox"></input>
            <span class="slider round" onClick={() => languageSwitch(lng)}>
            <p className="lngtext">{t.language}</p>
            </span>
            </label>
        </>
    )
}