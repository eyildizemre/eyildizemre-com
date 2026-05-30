import { Link } from "react-router-dom";
import { useUI } from "../../i18n/ui";

export function WorkCard({ title, description, tags, type, year, githubUrl, liveUrl, to }) {
    const ui = useUI();

    return (
        <article className="group flex flex-col gap-4 border border-c-border rounded-lg p-6 hover:border-c-neon transition-colors duration-[220ms]">
            <div className="flex items-center justify-between">
                {/* lang="en" is used to prevent uppercase "GİTHUB" when TR is selected */}
                <span lang="en" className="text-f-2xs tracking-[0.14em] uppercase text-c-muted">{type}</span>
                <span className="text-f-2xs tracking-[0.1em] text-c-muted tabular-nums">{year}</span>
            </div>

            <Link
                to={to}
                className="text-f-lg tracking-[0.02em] text-c-text group-hover:text-c-neon transition-colors duration-[220ms]"
            >
                {title}
            </Link>

            <p className="text-f-sm leading-relaxed text-c-muted">
                {description}
            </p>

            {tags?.length > 0 && (
                <p className="text-f-2xs tracking-[0.06em] text-c-muted">
                    {tags.join(" · ")}
                </p>
            )}

            {/* footer CTA — mt-auto pins this row to the bottom so cards stay aligned */}
            <div className="flex items-center justify-between pt-4 mt-auto border-t border-c-border">
                <div className="flex items-center gap-4">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-f-xs tracking-[0.08em] text-c-muted hover:text-c-neon transition-colors duration-[220ms]"
                        >
                            GitHub ↗
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-f-xs tracking-[0.08em] text-c-muted hover:text-c-neon transition-colors duration-[220ms]"
                        >
                            Live ↗
                        </a>
                    )}
                </div>
                <Link
                    to={to}
                    className="text-f-xs tracking-[0.08em] text-c-muted group-hover:text-c-neon transition-colors duration-[220ms]"
                >
                    {ui.works.viewMore} →
                </Link>
            </div>
        </article>
    );
}
