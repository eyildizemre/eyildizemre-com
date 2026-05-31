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
            } catch (err) {
                console.log(`Something is wrong. ${err}`);
                setReadme(ui.codedetail.placeholder);
            }
        }
        fetchData();
    }, [slug]);

    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            <Suspense fallback={<p className="text-c-muted">...</p>}>
                <Markdown>{readme ?? ""}</Markdown>
            </Suspense>
        </section>
    );
}