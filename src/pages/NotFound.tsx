import { Link } from "react-router-dom";
import { useUI } from "../i18n/ui";

export default function NotFound() {
    const ui = useUI();

    return (
        <section className="px-8 sm:px-16 pt-24 pb-20">
            <p className="text-f-xs tracking-[0.2em] text-c-muted mb-5">404</p>
            <h1 className="text-[32px] sm:text-[44px] leading-tight tracking-[-0.01em] text-c-text font-serif whitespace-pre-line">
                {ui.notFound.message}
            </h1>
            <Link
                to="/"
                className="inline-block mt-10 text-f-sm sm:text-f-base tracking-[0.08em] text-c-muted hover:text-c-neon transition-colors duration-[220ms]"
            >
                {ui.notFound.home}
            </Link>
        </section>
    );
}
