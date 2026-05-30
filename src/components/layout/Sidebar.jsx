import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";

const SIDEBAR_ITEMS = [
    { key: "edebiyat",       tr: "EDEBİYAT",       en: "LITERATURE",   children: [{ tr: "öykü", en: "short story" }, { tr: "şiir", en: "poetry" }] },
    { key: "dinlediklerim",  tr: "DİNLEDİKLERİM",  en: "LISTENING",    children: [] },
    { key: "izlediklerim",   tr: "İZLEDİKLERİM",   en: "WATCHING",     children: [] },
    { key: "video oyunları", tr: "VİDEO OYUNLARI",  en: "VIDEO GAMES",  children: [] },
    { key: "teknik yazılar", tr: "TEKNİK YAZILAR",  en: "TECH WRITING", children: [] },
    { key: "blog",           tr: "BLOG",            en: "BLOG",         children: [] },
];

const NAV_LABELS = {
    tr: { works: "projeler", code: "kod", about: "hakkımda", menu: "menü" },
    en: { works: "works",    code: "code", about: "about",   menu: "menu" },
};

export function Sidebar({ isSidebarOpen, onClose }) {
    const [expanded, setExpanded] = useState(null);
    const { lang, setLang, fontSize, setFontSize } = usePreferences();
    const nav = NAV_LABELS[lang] ?? NAV_LABELS.en;

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
            aria-label="Kenar menüsü"
            aria-hidden={!isSidebarOpen}
            className={`fixed top-0 right-0 h-full w-[270px] bg-c-bg-secondary border-l border-c-border z-20 flex flex-col transition-transform duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between px-7 py-5 border-b border-c-border">
                <span className="text-f-lg tracking-[0.04em] text-c-text">
                    e<span className="text-c-neon">y</span>
                </span>
                <span className="text-f-xs tracking-[0.14em] uppercase text-c-muted opacity-60">{nav.menu}</span>
            </div>

            <nav aria-label="Mobil navigasyon" className="md:hidden border-b border-c-border px-7 py-3 flex flex-col">
                <NavLink to="/works" onClick={onClose} className={mobileNavClass}>{nav.works}</NavLink>
                <NavLink to="/code"  onClick={onClose} className={mobileNavClass}>{nav.code}</NavLink>
                <NavLink to="/about" onClick={onClose} className={mobileNavClass}>{nav.about}</NavLink>
            </nav>

            <nav aria-label="Keşif menüsü" className="flex-1 py-4 overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => (
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
                                <span className={`text-[9px] opacity-40 transition-transform duration-[200ms] inline-block ${
                                    expanded === item.key ? "rotate-90" : ""
                                }`}>▶</span>
                            )}
                        </button>

                        {item.children.length > 0 && expanded === item.key && (
                            <div className="pl-11 pb-1.5">
                                {item.children.map((child) => (
                                    <div key={child.tr} className="text-f-sm tracking-[0.04em] text-c-muted py-1 opacity-70 hover:opacity-100 transition-opacity duration-[200ms] cursor-pointer">
                                        {child[lang] ?? child.en}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className="flex items-center gap-1 px-7 py-5 border-t border-c-border">
                {["tr", "en"].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`text-f-xs tracking-[0.12em] uppercase px-2 py-1 rounded transition-colors duration-[200ms] ${
                            lang === l
                                ? "text-c-neon border border-c-neon"
                                : "text-c-muted border border-transparent hover:text-c-neon"
                        }`}
                    >
                        {l}
                    </button>
                ))}

                <div className="w-px h-4 bg-c-border mx-2" />

                {[["sm", "A−"], ["md", "A"], ["lg", "A+"]].map(([val, label]) => (
                    <button
                        key={val}
                        onClick={() => setFontSize(val)}
                        className={`text-f-xs tracking-[0.06em] px-2 py-1 rounded transition-colors duration-[200ms] ${
                            fontSize === val
                                ? "text-c-neon border border-c-neon"
                                : "text-c-muted border border-transparent hover:text-c-neon"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </aside>
    );
}
