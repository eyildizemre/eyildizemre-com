import { NavLink, Link } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";
import { useTranslation } from "react-i18next";

export function Header({ onToggleSidebar }) {
    const { theme, setTheme } = usePreferences();
    const { t } = useTranslation();

    return (
        <header>
            <Link to="/">ey</Link>
            <nav>
                <NavLink to="/works">{t("nav.works")}</NavLink>
                <NavLink to="/code">{t("nav.code")}</NavLink>
                <NavLink to="/about">{t("nav.about")}</NavLink>
            </nav>

            <div>
                <button onClick={() => setTheme(theme === "dark" ? "sepia" : "dark")}>
                    {theme === "dark" ? t("header.theme.toSepia") : t("header.theme.toDark")}
                </button>
                <button onClick={onToggleSidebar} >

                </button>
            </div>
        </header>
    );
}
