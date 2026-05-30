import { useState, useEffect } from "react";
import { usePreferences } from "../../context/PreferencesContext";

export default function CommitHeatmap() {
    const [weeks, setWeeks]     = useState([]);
    const [total, setTotal]     = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);
    const { lang } = usePreferences();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Authorization": `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                            query($username: String!) {
                                user(login: $username) {
                                    contributionsCollection {
                                        contributionCalendar {
                                            totalContributions
                                            weeks {
                                                contributionDays {
                                                    contributionCount
                                                    date
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        `,
                        variables: { username: "eyildizemre" },
                    }),
                });

                const json = await res.json();
                const calendar = json.data.user.contributionsCollection.contributionCalendar;
                setWeeks(calendar.weeks);
                setTotal(calendar.totalContributions);
                setLoading(false);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    if (error) return null;

    const locale = lang === "tr" ? "tr-TR" : "en-US";
    const dateOptions = { day: "numeric", month: "long" };

    function tooltip(count, date) {
        const formatted = new Date(date).toLocaleDateString(locale, dateOptions);
        if (lang === "tr") {
            return count === 0
                ? `${formatted} tarihinde katkı yok`
                : `${formatted} tarihinde ${count} katkı`;
        }
        return count === 0
            ? `No contributions on ${formatted}`
            : `${count} contribution${count !== 1 ? "s" : ""} on ${formatted}`;
    }

    function dotOpacity(count) {
        if (count === 0)  return "opacity-10";
        if (count <= 2)   return "opacity-30";
        if (count <= 5)   return "opacity-60";
        if (count <= 9)   return "opacity-80";
        return "opacity-100";
    }

    function monthLabel(wi) {
        if (wi === 0) return "";
        const firstDay = weeks[wi]?.contributionDays[0];
        if (!firstDay) return "";
        const curr = new Date(firstDay.date).getMonth();
        const prevFirstDay = weeks[wi - 1]?.contributionDays[0];
        if (!prevFirstDay || new Date(prevFirstDay.date).getMonth() !== curr) {
            return new Date(firstDay.date).toLocaleDateString(locale, { month: "short" });
        }
        return "";
    }

    const contributionLabel = lang === "tr"
        ? `Son bir yılda ${total} katkı`
        : `${total} contributions in the last year`;

    return (
        <section className="px-8 sm:px-16 py-14 border-t border-c-border">
            <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6 opacity-60">COMMIT ACTIVITY</p>
            <div className="w-fit border border-c-border rounded-lg p-5">
                <p className="text-f-sm tracking-[0.02em] text-c-muted mb-4">
                    {loading ? "..." : contributionLabel}
                </p>
            <div className="flex gap-[3px]">
                <div className="flex flex-col gap-[3px] mr-1 mt-[14px]">
                    {(lang === "tr"
                        ? ["", "Pzt", "", "Çar", "", "Cum", ""]
                        : ["", "Mon", "", "Wed", "", "Fri", ""]
                    ).map((label, i) => (
                        <div key={i} className="h-[10px] flex items-center">
                            <span className="text-[8px] text-c-muted opacity-50 w-[18px] leading-none">{label}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-[2px]">
                <div className="flex gap-[3px] mb-[2px]">
                    {loading
                        ? Array.from({ length: 53 }).map((_, i) => (
                            <div key={i} className="w-[10px] h-[10px]" />
                        ))
                        : weeks.map((_, wi) => (
                            <div key={wi} className="w-[10px]">
                                <span className="text-[8px] text-c-muted opacity-50 leading-none whitespace-nowrap">
                                    {monthLabel(wi)}
                                </span>
                            </div>
                        ))
                    }
                </div>
            <div className="flex gap-[3px] overflow-x-auto py-[2px]">
                {loading
                    ? Array.from({ length: 53 }).map((_, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, di) => (
                                <div key={di} className="w-[10px] h-[10px] rounded-sm bg-c-border opacity-20" />
                            ))}
                        </div>
                    ))
                    : weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                            {week.contributionDays.map((day) => (
                                <div
                                    key={day.date}
                                    title={tooltip(day.contributionCount, day.date)}
                                    className={`w-[10px] h-[10px] rounded-sm bg-c-neon cursor-default transition-shadow duration-[150ms] hover:ring-1 hover:ring-white/60 ${dotOpacity(day.contributionCount)}`}
                                />
                            ))}
                        </div>
                    ))
                }
            </div>
                </div>
            </div>
                <div className="flex items-center justify-end gap-[6px] mt-3">
                    <span className="text-[8px] text-c-muted opacity-50">{lang === "tr" ? "Az" : "Less"}</span>
                    {[0.1, 0.3, 0.6, 0.8, 1].map((op) => (
                        <div key={op} className="w-[10px] h-[10px] rounded-sm bg-c-neon" style={{ opacity: op }} />
                    ))}
                    <span className="text-[8px] text-c-muted opacity-50">{lang === "tr" ? "Çok" : "More"}</span>
                </div>
            </div>
        </section>
    );
}