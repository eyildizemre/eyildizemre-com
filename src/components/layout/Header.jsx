import { NavLink, Link } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";
import { useUI } from "../../i18n/ui";

function PanelIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="5" height="14" rx="1" strokeWidth="1" className="stroke-current" opacity="0.7" />
            <rect x="8" y="1" width="7" height="6" rx="1" strokeWidth="1" className="stroke-current" opacity="0.7" />
            <rect x="8" y="9" width="7" height="6" rx="1" strokeWidth="1" className="stroke-current" opacity="0.7" />
        </svg>
    );
}

export function Header({ onToggleSidebar, isSidebarOpen }) {
    const { theme, setTheme } = usePreferences();
    const ui = useUI();

    const navLinkClass = ({ isActive }) =>
        `text-f-base tracking-[0.12em] uppercase transition-colors duration-[220ms] pb-1 border-b ${
            isActive
                ? "text-c-neon border-c-neon"
                : "text-c-muted border-transparent hover:text-c-neon"
        }`;

    return (
        <header className="relative flex items-center justify-between h-16 pl-10 pr-8 bg-c-surface border-b border-c-border">

            <Link to="/" className="text-f-lg tracking-[0.04em] text-c-text">
                e<span className="text-c-neon">y</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                <NavLink to="/works" className={navLinkClass}>{ui.nav.works}</NavLink>
                <NavLink to="/code" className={navLinkClass}>{ui.nav.code}</NavLink>
                <NavLink to="/about" className={navLinkClass}>{ui.nav.about}</NavLink>
            </nav>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setTheme(theme === "dark" ? "sepia" : "dark")}
                    className="hidden sm:block text-f-base tracking-[0.08em] text-c-muted border border-c-border rounded px-3 py-1.5 bg-transparent font-serif hover:text-c-neon hover:border-c-neon transition-colors duration-[220ms]"
                >
                    {theme === "dark" ? ui.theme.toSepia : ui.theme.toDark}
                </button>

                <button
                    onClick={onToggleSidebar}
                    className={`flex items-center justify-center border rounded p-[7px] bg-transparent transition-colors duration-[220ms] ${
                        isSidebarOpen
                            ? "border-c-neon text-c-neon"
                            : "border-c-border text-c-muted hover:border-c-neon hover:text-c-neon"
                    }`}
                >
                    <PanelIcon />
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-c-neon opacity-[0.12]" />
        </header>
    );
}
