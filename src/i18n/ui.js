export const UI = {
    tr: {
        nav: { works: "projeler", code: "kod", about: "hakkımda" },
        theme: { toSepia: "◐ sepya", toDark: "◑ koyu" },
        sidebar: { menu: "menü" },
        home: {
            total: "proje",
            completed: "tamamlanmış",
            active: "yapılmakta",
            currentProjects: "güncel projeler",
        },
        heatmap: {
            days: ["", "Pzt", "", "Çar", "", "Cum", ""],
            less: "Az",
            more: "Çok",
            total: (n) => `Son bir yılda ${n} katkı`,
            tooltipNone: (date) => `${date} tarihinde katkı yok`,
            tooltipSome: (date, n) => `${date} tarihinde ${n} katkı`,
        },
    },
    en: {
        nav: { works: "works", code: "code", about: "about" },
        theme: { toSepia: "◐ sepia", toDark: "◑ dark" },
        sidebar: { menu: "menu" },
        home: {
            total: "projects",
            completed: "completed",
            active: "in progress",
            currentProjects: "current projects",
        },
        heatmap: {
            days: ["", "Mon", "", "Wed", "", "Fri", ""],
            less: "Less",
            more: "More",
            total: (n) => `${n} contributions in the last year`,
            tooltipNone: (date) => `No contributions on ${date}`,
            tooltipSome: (date, n) => `${n} contribution${n !== 1 ? "s" : ""} on ${date}`,
        },
    },
};
