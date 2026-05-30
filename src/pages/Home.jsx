import { works } from "../data/works";
import { useUI } from "../i18n/ui";
import { BilancoAccordion } from "../components/home/BilancoAccordion";
import SuSiralar from "../components/home/SuSiralar";
import CommitHeatmap from "../components/home/CommitHeatmap";

export default function Home() {
    const ui = useUI();

    const total     = works.length;
    const completed = works.filter(w => w.status === "completed").length;
    const active    = works.filter(w => w.status === "active").length;
    const current   = works.filter(w => w.current);

    return (
        <>
            {/* şu sıralar · Bilanço · Current Projects */}
            <section className="px-8 sm:px-16 py-10 border-t border-c-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

                    {/* şu sıralar */}
                    <div>
                        <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6 opacity-60">şu sıralar...</p>
                        <SuSiralar />
                    </div>

                    {/* Bilanço */}
                    <div>
                        <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6 opacity-60">BILANÇO</p>
                        <BilancoAccordion />
                    </div>

                    {/* Current Projects */}
                    <div>
                        <p className="text-f-xs tracking-[0.14em] text-c-muted mb-6 opacity-60 uppercase">{ui.home.currentProjects}</p>
                        <div className="divide-y divide-c-border border-t border-c-border">
                            {current.map((work) => (
                                <div key={work.slug} className="flex items-start justify-between gap-4 py-4">
                                    <div>
                                        <p className="text-f-base tracking-[0.04em] text-c-text">{work.title}</p>
                                        <p className="text-f-xs tracking-[0.02em] text-c-muted mt-1 leading-relaxed">{work.description}</p>
                                        <p className="text-f-2xs tracking-[0.06em] text-c-muted mt-2 opacity-50">
                                            {work.tags.join(" · ")}
                                        </p>
                                    </div>
                                    <a
                                        href={work.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 text-f-xs tracking-[0.1em] text-c-muted border border-c-border rounded px-2.5 py-1 hover:text-c-neon hover:border-c-neon transition-colors duration-[220ms]"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Hero */}
            <section className="px-8 sm:px-16 pt-24 pb-20">
                <p className="text-f-xs tracking-[0.2em] text-c-muted mb-5">
                    SOFTWARE ENGINEER
                </p>
                <h1 className="text-[52px] sm:text-[72px] leading-none tracking-[-0.02em] text-c-text font-serif">
                    Emre Yıldız
                </h1>
            </section>

            {/* Stats */}
            <section className="px-8 sm:px-16 py-14 border-t border-c-border">
                <div className="flex gap-14 sm:gap-20">
                    <div>
                        <p className="text-[40px] sm:text-[48px] leading-none tracking-[-0.02em] text-c-neon tabular-nums">
                            {total}
                        </p>
                        <p className="text-f-xs tracking-[0.1em] uppercase text-c-muted mt-2">
                            {ui.home.total}
                        </p>
                    </div>
                    <div>
                        <p className="text-[40px] sm:text-[48px] leading-none tracking-[-0.02em] text-c-neon tabular-nums">
                            {completed}
                        </p>
                        <p className="text-f-xs tracking-[0.1em] uppercase text-c-muted mt-2">
                            {ui.home.completed}
                        </p>
                    </div>
                    <div>
                        <p className="text-[40px] sm:text-[48px] leading-none tracking-[-0.02em] text-c-neon tabular-nums">
                            {active}
                        </p>
                        <p className="text-f-xs tracking-[0.1em] uppercase text-c-muted mt-2">
                            {ui.home.active}
                        </p>
                    </div>
                </div>
            </section>

            {/* Commit Heatmap */}
            <CommitHeatmap />
        </>
    );
}
