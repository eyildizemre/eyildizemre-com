import { useEffect, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { PreferencesContext, type FontSize, type Preferences, type Theme } from "./PreferencesContext";
import type { Lang } from "../types";

function getDefaultLang(): Lang {
    if (!navigator.language.startsWith("tr"))
        return "en";
    else return "tr";
};

export function PreferencesProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useLocalStorage<Theme>("theme", "sepia");
    const [lang, setLang] = useLocalStorage<Lang>("lang", getDefaultLang());
    const [fontSize, setFontSize] = useLocalStorage<FontSize>("font-size", "md");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", lang);
    }, [lang]);

    useEffect(() => {
        document.documentElement.setAttribute("data-font-size", fontSize);
    }, [fontSize]);

    const value: Preferences = { theme, setTheme, lang, setLang, fontSize, setFontSize};

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}
