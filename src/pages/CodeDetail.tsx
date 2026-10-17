import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useUI } from "../i18n/ui";
import { works } from "../data/works";
import NotFound from "./NotFound";

const Markdown = lazy(() => import("../components/ui/Markdown"));

const OWNER = "eyildizemre";

export default function CodeDetail() {
    const { slug } = useParams();
    const [readme, setReadme] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);
    const ui = useUI();

    // Same allowlist as the Code page: only repos listed in works.js have a detail page
    const isListed = works.some((work) => work.type === "github" && work.slug === slug);

    useEffect(() => {
        if (!isListed) return;

        // Set by the cleanup when the slug changes, so a late response for the
        // previous repo can't overwrite the current one.
        let ignore = false;

        async function fetchData() {
            try {
                const res = await fetch(`https://raw.githubusercontent.com/${OWNER}/${slug}/HEAD/README.md`);
                if (!res.ok) throw new Error(`GitHub related error. Status: ${res.status}`);
                const text = await res.text();
                if (ignore) return;
                setReadme(text);
                setFailed(false);
            } catch {
                if (!ignore) setFailed(true);
            }
        }
        fetchData();

        return () => { ignore = true; };
    }, [slug, isListed]);

    if (!isListed) return <NotFound />;

    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            <div className="max-w-2xl mx-auto">
                {/* başlık: repo adı + GitHub linki */}
                <div className="flex items-baseline justify-between gap-4 mb-8">
                    <h1 className="text-[40px] sm:text-[48px] leading-none tracking-[-0.02em] text-c-text font-serif">
                        {slug}
                    </h1>
                    <a
                        href={`https://github.com/${OWNER}/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-f-xs tracking-[0.08em] text-c-muted hover:text-c-neon transition-colors duration-[220ms]"
                    >
                        GitHub ↗
                    </a>
                </div>

                {/* etiketli çerçeve — editör dosya-paneli gibi */}
                <div className="border border-c-border rounded-lg overflow-hidden">
                    <div className="flex items-center border-b border-c-border bg-c-bg-secondary px-5 py-2.5">
                        <span className="font-mono text-f-2xs tracking-[0.06em] text-c-muted">README.md</span>
                    </div>
                    <div className="px-6 py-7 sm:px-8">
                        <Suspense fallback={<p className="text-c-muted">...</p>}>
                            <Markdown>{failed ? ui.codedetail.placeholder : readme ?? ""}</Markdown>
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}