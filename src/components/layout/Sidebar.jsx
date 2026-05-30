import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";
import { useUI } from "../../i18n/ui";
import sidebarItems from "../../data/sidebarItems.json";

export function Sidebar({ isSidebarOpen, onClose }) {
    const [expanded, setExpanded] = useState(null);
    const { lang, setLang, fontSize, setFontSize } = usePreferences();
    const ui = useUI();

    useEffect(() => {
        if (!isSidebarOpen) return;
        const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isSidebarOpen, onClose]);

    const mobileNavClass = ({ isActive }) =>
        `text-f-sm tracking-[0.12em] uppercase py-2 pl-3 border-l-2 transition-colors duration-[220ms] ${
            isActive
                ? "text-c-neon border-c-neon"
                : "text-c-muted border-transparent hover:text-c-neon"
        }`;

    return (
        <aside
            aria-label={ui.aria.sidebar}
            aria-hidden={!isSidebarOpen}
            className={`fixed top-0 right-0 h-full w-[270px] bg-c-bg-secondary border-l border-c-border z-20 flex flex-col transition-transform duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between px-7 py-5 border-b border-c-border">
                <span className="text-f-lg tracking-[0.04em] text-c-text">
                    e<span className="text-c-neon">y</span>
                </span>
                <span className="text-f-xs tracking-[0.14em] uppercase text-c-muted">{ui.sidebar.menu}</span>
            </div>

            <nav aria-label={ui.aria.mobileNav} className="md:hidden border-b border-c-border px-7 py-3 flex flex-col">
                <NavLink to="/works" onClick={onClose} className={mobileNavClass}>{ui.nav.works}</NavLink>
                <NavLink to="/code"  onClick={onClose} className={mobileNavClass}>{ui.nav.code}</NavLink>
                <NavLink to="/about" onClick={onClose} className={mobileNavClass}>{ui.nav.about}</NavLink>
            </nav>

            <nav aria-label={ui.aria.discoverMenu} className="flex-1 py-4 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <div key={item.key}>
                        <button
                            onClick={() => setExpanded(expanded === item.key ? null : item.key)}
                            className={`w-full flex items-center justify-between px-7 py-[9px] text-f-sm tracking-[0.1em] transition-colors duration-[200ms] border-l-2 ${
                                expanded === item.key
                                    ? "text-c-neon border-c-neon"
                                    : "text-c-muted border-transparent hover:text-c-neon"
                            }`}
                        >
                            <span>{item[lang] ?? item.en}</span>
                            {item.children.length > 0 && (
                                <span className={`text-[9px] transition-transform duration-[200ms] inline-block ${
                                    expanded === item.key ? "rotate-90" : ""
                                }`}>▶</span>
                            )}
                        </button>

                        {item.children.length > 0 && expanded === item.key && (
                            <div className="pl-11 pb-1.5">
                                {item.children.map((child) => (
                                    <div key={child.tr} className="text-f-sm tracking-[0.04em] text-c-muted py-1 hover:text-c-text transition-colors duration-[200ms] cursor-pointer">
                                        {child[lang] ?? child.en}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="flex items-center justify-center gap-3 py-5 border-t border-c-border">
                <button
                    onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                    className="text-f-xs tracking-[0.12em] uppercase px-2 py-1 rounded border border-c-border text-c-muted hover:text-c-neon hover:border-c-neon transition-colors duration-[200ms]"
                >
                    {lang === "tr" ? "en" : "tr"}
                </button>

                <button
                    onClick={() => setFontSize(fontSize === "md" ? "lg" : "md")}
                    className="text-f-xs tracking-[0.06em] px-2 py-1 rounded border border-c-border text-c-muted hover:text-c-neon hover:border-c-neon transition-colors duration-[200ms]"
                >
                    {fontSize === "md" ? "A+" : "A"}
                </button>
            </div>
        </aside>
    );
}
