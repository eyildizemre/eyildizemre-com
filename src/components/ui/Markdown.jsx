import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Shared markdown renderer — feeds READMEs now and authored content later.
// Default export so it lazy-loads cleanly: React.lazy(() => import("../ui/Markdown")).
// `prose` = @tailwindcss/typography structure; `prose-ey` = our theme mapping (index.css).
// remarkGfm adds GitHub-flavored markdown (tables, task lists, strikethrough, autolinks).
export default function Markdown({ children }) {
    return (
        <div className="prose prose-ey">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
        </div>
    );
}
