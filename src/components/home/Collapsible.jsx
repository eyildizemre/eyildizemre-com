import { useState } from "react";

// Section that collapses on mobile (closed by default so it doesn't push the rest of
// the page down), and is always expanded on md+ where it sits as a grid column.
export default function Collapsible({ title, children }) {
    const [open, setOpen] = useState(false);

    const titleClass = "text-f-xs tracking-[0.14em] text-c-muted";

    return (
        <div>
            {/* mobile: toggle header */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className="md:hidden w-full flex items-center justify-between"
            >
                <span className={titleClass}>{title}</span>
                <span
                    className={`text-[10px] text-c-muted transition-transform duration-[200ms] ${
                        open ? "rotate-90" : ""
                    }`}
                >
                    ▶
                </span>
            </button>

            {/* desktop: plain label */}
            <p className={`hidden md:block ${titleClass}`}>{title}</p>

            {/* content: follows the toggle on mobile, always open on md+ */}
            <div className={`mt-6 ${open ? "block" : "hidden"} md:block`}>
                {children}
            </div>
        </div>
    );
}
