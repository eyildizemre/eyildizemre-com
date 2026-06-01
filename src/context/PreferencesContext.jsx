import { createContext, useContext, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const PreferencesContext = createContext();

function getDefaultLang() {
    if (!navigator.language.startsWith("tr"))
        return "en";
    else return "tr";
};

export function PreferencesProvider({ children }) {
    const [theme, setTheme] = useLocalStorage("theme", "sepia");
    const [lang, setLang] = useLocalStorage("lang", getDefaultLang());
    const [fontSize, setFontSize] = useLocalStorage("font-size", "md");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
    }, [lang]);

    useEffect(() => {
        document.documentElement.setAttribute("data-font-size", fontSize);
    }, [fontSize]);

    const value = { theme, setTheme, lang, setLang, fontSize, setFontSize};

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) throw new Error ("usePreferences must be used within PreferencesProvider");
    return context;
}
