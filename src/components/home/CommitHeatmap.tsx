import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { usePreferences } from "../../context/PreferencesContext";
import { useUI } from "../../i18n/ui";
import type { Contributions } from "../../types";

// Each theme sets its own opacity ramp in index.css (--heat-0…3)
const SHADES = [
    "opacity-[var(--heat-0)]",
    "opacity-[var(--heat-1)]",
    "opacity-[var(--heat-2)]",
    "opacity-[var(--heat-3)]",
    "opacity-100",
];

export default function CommitHeatmap() {
    const [weeks, setWeeks]     = useState<Contributions["weeks"]>([]);
    const [total, setTotal]     = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { lang } = usePreferences();
    const ui = useUI();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/contributions");
                if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`);
                const { total, weeks }: Contributions = await res.json();
                setWeeks(weeks);
                setTotal(total);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        }
        fetchData();
    }, []);

    useLayoutEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; // scroll to end on load to show most recent activity
        }
    }, [weeks]); // scroll to end when weeks data changes

    if (error) {
        return (
            <section className="px-8 sm:px-16 py-14 border-t border-c-border">
                <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6">{ui.heatmap.title}</p>
                <p className="w-fit text-f-xs tracking-[0.04em] leading-relaxed text-c-muted border-l-2 border-c-neon bg-c-bg-secondary rounded-r px-4 py-3">
                    {ui.heatmap.fallback}
                </p>
            </section>
        );
    }

    const locale = lang === "tr" ? "tr-TR" : "en-US";
    const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

    function tooltip(count: number, date: string) {
        const formatted = new Date(date).toLocaleDateString(locale, dateOptions);
        return count === 0
            ? ui.heatmap.tooltipNone(formatted)
            : ui.heatmap.tooltipSome(formatted, count);
    }

    // Shades are relative to the busiest day of the year, not fixed counts
    const maxCount = Math.max(0, ...weeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount)));

    function dotOpacity(count: number) {
        if (count === 0) return SHADES[0];
        const ratio = count / maxCount;
        if (ratio <= 0.25) return SHADES[1];
        if (ratio <= 0.5)  return SHADES[2];
        if (ratio <= 0.75) return SHADES[3];
        return SHADES[4];
    }

    function monthLabel(wi: number) {
        // A label in the last column has no room and overflows the grid,
        // which adds a horizontal scrollbar even on wide screens.
        if (wi === 0 || wi === weeks.length - 1) return "";
        const firstDay = weeks[wi]?.contributionDays[0];
        if (!firstDay) return "";
        const curr = new Date(firstDay.date).getMonth();
        const prevFirstDay = weeks[wi - 1]?.contributionDays[0];
        if (!prevFirstDay || new Date(prevFirstDay.date).getMonth() !== curr) {
            return new Date(firstDay.date).toLocaleDateString(locale, { month: "short" });
        }
        return "";
    }

    return (
        <section className="px-8 sm:px-16 py-14 border-t border-c-border">
            <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6">{ui.heatmap.title}</p>
            <div className="w-fit max-w-full border border-c-border rounded-lg p-5 [--cell:10px] lg:[--cell:12px] xl:[--cell:16px]">
                <p className="text-f-sm tracking-[0.02em] text-c-muted mb-4">
                    {loading ? "..." : ui.heatmap.total(total)}
                </p>
            <div className="flex gap-[3px]">
                <div className="flex flex-col gap-[3px] mr-1 mt-[14px]">
                    {ui.heatmap.days.map((label, i) => (
                        <div key={i} className="h-[var(--cell)] flex items-center">
                            <span className="text-[8px] lg:text-[10px] xl:text-[11px] text-c-muted w-[18px] lg:w-[24px] leading-none">{label}</span>
                        </div>
                    ))}
                </div>
                <div ref={scrollRef} className="flex flex-col gap-[2px] min-w-0 overflow-x-auto">
                <div className="flex gap-[3px] mb-[2px]">
                    {loading
                        ? Array.from({ length: 53 }).map((_, i) => (
                            <div key={i} className="w-[var(--cell)] h-[var(--cell)]" />
                        ))
                        : weeks.map((_, wi) => (
                            <div key={wi} className="w-[var(--cell)] shrink-0">
                                <span className="text-[8px] lg:text-[10px] xl:text-[11px] text-c-muted leading-none whitespace-nowrap">
                                    {monthLabel(wi)}
                                </span>
                            </div>
                        ))
                    }
                </div>
            <div className="flex gap-[3px] py-[2px]">
                {loading
                    ? Array.from({ length: 53 }).map((_, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, di) => (
                                <div key={di} className="w-[var(--cell)] h-[var(--cell)] rounded-sm bg-c-border opacity-20" />
                            ))}
                        </div>
                    ))
                    : weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                            {week.contributionDays.map((day) => (
                                <div
                                    key={day.date}
                                    title={tooltip(day.contributionCount, day.date)}
                                    className={`w-[var(--cell)] h-[var(--cell)] rounded-sm bg-c-neon cursor-default transition-shadow duration-[150ms] hover:ring-1 hover:ring-white/60 ${dotOpacity(day.contributionCount)}`}
                                />
                            ))}
                        </div>
                    ))
                }
            </div>
                </div>
            </div>
                <div className="flex items-center justify-end gap-[6px] mt-3">
                    <span className="text-[8px] lg:text-[10px] xl:text-[11px] text-c-muted">{ui.heatmap.less}</span>
                    {SHADES.map((shade) => (
                        <div key={shade} className={`w-[var(--cell)] h-[var(--cell)] rounded-sm bg-c-neon ${shade}`} />
                    ))}
                    <span className="text-[8px] lg:text-[10px] xl:text-[11px] text-c-muted">{ui.heatmap.more}</span>
                </div>
            </div>
        </section>
    );
}
