import { useState, useEffect, useMemo } from "react";
import { works } from "../data/works";
import { useUI } from "../i18n/ui";
import { CodeCard } from "../components/code/CodeCard";

const staticRepos = works.filter((w) => w.type === "github").map((w) => ({
    slug: w.slug,
    description: w.description,
    htmlUrl: w.links.github,
}));

export default function Code() {
    const ui = useUI();
    const [repos, setRepos] = useState(staticRepos);
    const [isFallback, setIsFallback] = useState(false);
    const [activeLang, setActiveLang] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/repos");
                if (!res.ok) throw new Error(`HTTP error. status: ${res.status}`);
                else setRepos(await res.json());
            } catch {
                setRepos(staticRepos);
                setIsFallback(true);
            }
        }
        fetchData();
    }, []);

    // unique languages in the repo set (memoized — recompute only when repos change)
    const languages = useMemo(
        () => [...new Set(repos.map((r) => r.language).filter(Boolean))],
        [repos]
    );

    // repos filtered by the active language (memoized derived list)
    const filteredRepos = useMemo(
        () => (activeLang ? repos.filter((r) => r.language === activeLang) : repos),
        [repos, activeLang]
    );

    const chip = (active) =>
        `text-f-xs tracking-[0.08em] px-3 py-1 rounded-full border transition-colors duration-[200ms] ${
            active
                ? "text-c-neon border-c-neon"
                : "text-c-muted border-c-border hover:text-c-neon hover:border-c-neon"
        }`;

    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            {isFallback && (
                <p className="mb-6 text-f-xs tracking-[0.04em] leading-relaxed text-c-muted border-l-2 border-c-neon bg-c-bg-secondary rounded-r px-4 py-3">
                    {ui.code.fallback}
                </p>
            )}

            {languages.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(activeLang === lang ? null : lang)}
                            className={chip(activeLang === lang)}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredRepos.map((repo) => (
                    <CodeCard key={repo.slug} {...repo} />
                ))}
            </div>
        </section>
    );
}
