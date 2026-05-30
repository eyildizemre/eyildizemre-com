import { useState, useEffect } from "react";
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

    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            {isFallback && (
                <p className="mb-6 text-f-xs tracking-[0.04em] leading-relaxed text-c-muted border-l-2 border-c-neon bg-c-bg-secondary rounded-r px-4 py-3">
                    {ui.code.fallback}
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {repos.map((repo) => (
                    <CodeCard key={repo.slug} {...repo} />
                ))}
            </div>
        </section>
    );
}