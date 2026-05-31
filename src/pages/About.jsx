import { lazy, Suspense } from "react";
import { usePreferences } from "../context/PreferencesContext";
import aboutTR from "../content/tr/about.md?raw";
import aboutEN from "../content/en/about.md?raw";
import ContactForm from "../components/about/ContactForm";

const Markdown = lazy(() => import("../components/ui/Markdown"));

export default function About() {
    const { lang } = usePreferences();

    const content = lang === "tr" ? aboutTR : aboutEN;

    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            <div className="max-w-2xl mx-auto">
                {/* labeled frame — same editor file-panel motif as CodeDetail */}
                <div className="border border-c-border rounded-lg overflow-hidden">
                    <div className="flex items-center border-b border-c-border bg-c-bg-secondary px-5 py-2.5">
                        <span className="font-mono text-f-2xs tracking-[0.06em] text-c-muted">about.md</span>
                    </div>
                    <div className="px-6 py-7 sm:px-8">
                        <Suspense fallback={<p className="text-c-muted">...</p>}>
                            <Markdown>{content}</Markdown>
                        </Suspense>
                    </div>
                </div>

                <ContactForm />
            </div>
        </section>
    );
}
