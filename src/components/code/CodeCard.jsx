import { Link } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";
import { useUI } from "../../i18n/ui";

// GitHub octicons (star, repo-forked) — small, inherit text color
function StarIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
                className="fill-current"
            />
        </svg>
    );
}

function ForkIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
                className="fill-current"
            />
        </svg>
    );
}

export function CodeCard({ slug, description, language, stars, forks, pushedAt, htmlUrl }) {
    const ui = useUI();
    const { lang } = usePreferences();

    const to = `/code/${slug}`;
    const locale = lang === "tr" ? "tr-TR" : "en-US";
    const updated = pushedAt
        ? new Date(pushedAt).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })
        : null;

    return (
        <article className="group flex flex-col gap-4 border border-c-border rounded-lg p-6 hover:border-c-neon transition-colors duration-[220ms]">
            {/* repo name + language */}
            <div className="flex items-baseline justify-between gap-4">
                <Link
                    to={to}
                    className="text-f-lg tracking-[0.02em] text-c-text group-hover:text-c-neon transition-colors duration-[220ms]"
                >
                    {slug}
                </Link>
                {language && (
                    <span className="shrink-0 text-f-2xs tracking-[0.08em] text-c-muted">{language}</span>
                )}
            </div>

            {description && (
                <p className="text-f-sm leading-relaxed text-c-muted">{description}</p>
            )}

            {/* live stats — what marks this as the "developer view" */}
            <div className="flex items-center gap-5 text-f-xs text-c-muted mt-auto">
                <span className="flex items-center gap-1.5">
                    <StarIcon />
                    <span className="tabular-nums text-c-text">{stars ?? "—"}</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <ForkIcon />
                    <span className="tabular-nums text-c-text">{forks ?? "—"}</span>
                </span>
                {updated && (
                    <span className="ml-auto text-f-2xs tracking-[0.04em]">↻ {updated}</span>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-c-border">
                <a
                    href={htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-f-xs tracking-[0.08em] text-c-muted hover:text-c-neon transition-colors duration-[220ms]"
                >
                    GitHub ↗
                </a>
                <Link
                    to={to}
                    className="text-f-xs tracking-[0.08em] text-c-muted group-hover:text-c-neon transition-colors duration-[220ms]"
                >
                    {ui.code.details} →
                </Link>
            </div>
        </article>
    );
}
