// Import React
import { useState } from "react";

//Import Translate
import i18next from "i18next";

//Import Images
import britishFlag from '../../images/britishFlag.svg';
import italianFlag from '../../images/italianFlag.svg';

export const LanguageSelect = () => {
    // Setting a Boolean state for the ternary operators.
    // TO CHECK: Maybe moving this state to the App.js file could be a solution in case language doesn't persist.
    const [language, setLanguage] = useState('Boolean')

    // These ternary operators check the language state and sets the opposite.
    const lng = language
    ? 'it' 
    : 'en'

    const img = language
    ? italianFlag
    : britishFlag

    // This function imports changeLanguage from i18next and gives the code in string 
    // format via the lng parameter. setLanguage changes the state to the opposite boolean value,
    // enabling the ternary operators.

    const languageSwitch = (lng) => {
        setLanguage(!language)
        i18next.changeLanguage(lng)
    }

    return (
        <>
            <span onClick={() => languageSwitch(lng)}>
                <img src={img} alt={'Language Select'} />
            </span>
        </>
    )
}