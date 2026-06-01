import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useUI } from "../i18n/ui";

const Markdown = lazy(() => import("../components/ui/Markdown"));

const OWNER = "eyildizemre";

export default function CodeDetail() {
    const { slug } = useParams();
    const [readme, setReadme] = useState(null);
    const ui = useUI();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://raw.githubusercontent.com/${OWNER}/${slug}/HEAD/README.md`);
                if (!res.ok) throw new Error(`GitHub related error. Status: ${res.status}`);
                setReadme(await res.text());
            } catch {
                setReadme(ui.codedetail.placeholder);
            }
        }
        fetchData();
    }, [slug]);

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
                            <Markdown>{readme ?? ""}</Markdown>
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}