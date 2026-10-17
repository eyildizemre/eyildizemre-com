import { createContext, useContext } from "react";
import type { Lang } from "../types";

export type Theme = "sepia" | "dark";
export type FontSize = "md" | "lg";

export interface Preferences {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    lang: Lang;
    setLang: (lang: Lang) => void;
    fontSize: FontSize;
    setFontSize: (fontSize: FontSize) => void;
}

export const PreferencesContext = createContext<Preferences | null>(null);

export function usePreferences(): Preferences {
    const context = useContext(PreferencesContext);
    if (!context) throw new Error ("usePreferences must be used within PreferencesProvider");
    return context;
}
