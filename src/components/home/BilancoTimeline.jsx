import { useState, useRef, useLayoutEffect } from "react";
import bilanco from "../../data/bilanco.json";

export function BilancoTimeline() {
    const latestYear = Math.max(...bilanco.map((item) => item.year));
    const [selectedYear, setSelectedYear] = useState(latestYear);
    const stripRef = useRef(null);

    // scroll the year strip to the most recent year on mount (like the commit heatmap)
    useLayoutEffect(() => {
        if (stripRef.current) {
            stripRef.current.scrollLeft = stripRef.current.scrollWidth;
        }
    }, []);

    const selected = bilanco.find((item) => item.year === selectedYear);

    return (
        <div>
            {/* year strip — horizontal, scrolls to the latest year */}
            <div ref={stripRef} className="flex gap-6 overflow-x-auto mb-6">
                {bilanco.map((item) => (
                    <button
                        key={item.year}
                        onClick={() => setSelectedYear(item.year)}
                        className={`shrink-0 text-f-sm tracking-[0.06em] pb-2 border-b-2 transition-colors duration-[200ms] ${
                            selectedYear === item.year
                                ? "text-c-neon border-c-neon"
                                : "text-c-muted border-transparent hover:text-c-text"
                        }`}
                    >
                        {item.year}
                    </button>
                ))}
            </div>

            {/* selected year — description + playlist (one iframe at a time) */}
            {selected && (
                <div className="space-y-4">
                    <p className="text-f-sm tracking-[0.03em] leading-relaxed text-c-muted">
                        {selected.description}
                    </p>
                    <iframe
                        key={selected.year}
                        src={selected.url.replace("/playlist/", "/embed/playlist/")}
                        height="152"
                        title={`Bilanço ${selected.year}`}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-11/12 rounded border-0 opacity-80"
                    />
                </div>
            )}
        </div>
    );
}
