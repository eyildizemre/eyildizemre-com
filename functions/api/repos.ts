// Cloudflare Pages Function → endpoint: /api/repos
// It works on the server-side (Workers runtime); token does not pass to browser
// To test it locally: `npx wrangler pages dev` — npm run dev (Vite) won't work for this.

import { works } from "../../src/data/works";
import type { Repo } from "../../src/types";

interface Env {
    GITHUB_TOKEN: string;
}

// Only the fields this function reads from GitHub's repo response
interface GitHubRepo {
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
    html_url: string;
}

const OWNER = "eyildizemre";

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const token = context.env.GITHUB_TOKEN;

    // Allowlist: only fetch the ones there are in works.js
    const slugs = works.filter((work) => work.type === "github").map((work) => work.slug);

    // Promise.all is used to run all the per-repo fetches in parallel and gather
    // their results into one array — a sequential for-await loop would work too, just slower.
    // One failed repo fails the whole response: the client then falls back to works.js
    // for every card instead of rendering some of them with empty fields.
    let repos: Repo[];
    try {
        repos = await Promise.all(
            slugs.map(async (slug): Promise<Repo> => {
                const res = await fetch(`https://api.github.com/repos/${OWNER}/${slug}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "User-Agent": "eyildizemre-com",
                        "Accept": "application/vnd.github+json",
                    },
                });
                if (!res.ok) throw new Error(`GitHub responded ${res.status} for ${slug}`);

                const json = await res.json<GitHubRepo>();

                return {
                    slug,
                    description: json.description,
                    language: json.language,
                    stars: json.stargazers_count,
                    forks: json.forks_count,
                    pushedAt: json.pushed_at,
                    htmlUrl: json.html_url,
                };
            })
        );
    } catch {
        return new Response(JSON.stringify({ error: "GitHub request failed" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
        });
    }

    // We had to return a Response because a Pages Function's handler must return one
    // (the runtime rejects anything else). The data rides in the body; Cache-Control
    // marks it cacheable for ~1h so it isn't refetched from GitHub on every request.
    return new Response(JSON.stringify(repos), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    })
};
