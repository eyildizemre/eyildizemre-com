import { usePreferences } from "../context/PreferencesContext";

export const UI = {
    tr: {
        nav: { home: "ana sayfa", works: "projeler", code: "kod", about: "hakkımda" },
        theme: { toSepia: "◐ sepya", toDark: "◑ koyu" },
        sidebar: { menu: "menü" },
        home: {
            total: "proje",
            completed: "tamamlanmış",
            active: "yapılmakta",
            currentProjects: "güncel projeler",
        },
        heatmap: {
            title: "COMMIT ETKİNLİĞİ",
            days: ["", "Pzt", "", "Çar", "", "Cum", ""],
            less: "Az",
            more: "Çok",
            total: (n) => `Son bir yılda ${n} katkı`,
            tooltipNone: (date) => `${date} tarihinde katkı yok`,
            tooltipSome: (date, n) => `${date} tarihinde ${n} katkı`,
        },
        aria: {
            sidebar: "Kenar menüsü",
            mobileNav: "Mobil navigasyon",
            discoverMenu: "Keşif menüsü",
        },
        works: {
            viewMore: "devamını görüntüle",
        },
        code: {
            details: "Detaylar",
            fallback: "Güncel repo bilgileri çekilemedi, jeneratör devreye alınıyor...",
        },
        codedetail: {
            placeholder: "GitHub'dan veri çekilemiyor. Doğrudan GitHub'da görüntüleyebilirsiniz.",
        },
        about: {
            contact: {
                heading: "İletişim",
                name: "Ad",
                email: "E-posta",
                message: "Mesaj",
                send: "Gönder",
                success: "Teşekkürler — bu bir demo, mesaj aslında gönderilmedi.",
                required: "Bu alan zorunlu",
                invalidEmail: "Geçerli bir e-posta gir",
                demoNote: "Demo: form yalnızca doğrulama yapar, mesaj göndermez.",
            },
        },
    },
    en: {
        nav: { home: "home", works: "works", code: "code", about: "about" },
        theme: { toSepia: "◐ sepia", toDark: "◑ dark" },
        sidebar: { menu: "menu" },
        home: {
            total: "projects",
            completed: "completed",
            active: "in progress",
            currentProjects: "current projects",
        },
        heatmap: {
            title: "COMMIT ACTIVITY",
            days: ["", "Mon", "", "Wed", "", "Fri", ""],
            less: "Less",
            more: "More",
            total: (n) => `${n} contributions in the last year`,
            tooltipNone: (date) => `No contributions on ${date}`,
            tooltipSome: (date, n) => `${n} contribution${n !== 1 ? "s" : ""} on ${date}`,
        },
        aria: {
            sidebar: "Sidebar",
            mobileNav: "Mobile navigation",
            discoverMenu: "Discovery menu",
        },
        works: {
            viewMore: "view more",
        },
        code: {
            details: "Details",
            fallback: "Failed to fetch repo information, falling back to generator...",
        },
        codedetail: {
            placeholder: "Can't fetch data from GitHub. You can view it in GitHub.",
        },
        about: {
            contact: {
                heading: "Contact",
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send",
                success: "Thanks — this is a demo, the message wasn't actually sent.",
                required: "This field is required",
                invalidEmail: "Enter a valid email",
                demoNote: "Demo: the form only validates; it doesn't send.",
            },
        },
    },
};

export function useUI() {
    const { lang } = usePreferences();
    return UI[lang] ?? UI.en;
}