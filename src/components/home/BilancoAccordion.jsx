import { useState } from "react";
import bilanco from "../../data/bilanco.json";

export function BilancoAccordion() {
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="w-11/12 divide-y divide-c-border border-t border-c-border">
            {bilanco.map((item) => (
                <div key={item.year}>
                    <button
                        onClick={() => setExpanded(expanded === item.year ? null : item.year)}
                        className="w-full flex items-center justify-between py-4 text-left group"
                    >
                        <span className="text-[13px] tracking-[0.06em] text-c-muted group-hover:text-c-text transition-colors duration-[220ms]">
                            {item.year}
                        </span>
                        <span className="text-[11px] tracking-[0.1em] text-c-muted opacity-50 group-hover:opacity-100 transition-opacity duration-[220ms]">
                            {expanded === item.year ? "−" : "+"}
                        </span>
                    </button>

                    {expanded === item.year && (
                        <div className="pb-6 space-y-4">
                            <p className="text-[12px] tracking-[0.03em] leading-relaxed text-c-muted">
                                {item.description}
                            </p>
                            <iframe
                                src={item.url.replace("/playlist/", "/embed/playlist/")}
                                height="152"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="w-11/12 rounded border-0 opacity-80"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}