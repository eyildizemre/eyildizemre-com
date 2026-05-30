// Cloudflare Pages Function → endpoint: /api/repos
// It works on the server-side (Workers runtime); token does not pass to browser
// To test it locally: `npx wrangler pages dev` — npm run dev (Vite) won't work for this.

import { works } from "../../src/data/works.js";

const OWNER = "eyildizemre";

export async function onRequestGet(context) {
    const token = context.env.GITHUB_TOKEN;

    // Allowlist: only fetch the ones there are in works.js
    const slugs = works.filter((work) => work.type === "github").map((work) => work.slug);

    // Promise.all is used to run all the per-repo fetches in parallel and gather
    // their results into one array — a sequential for-await loop would work too, just slower.
    const repos = await Promise.all(
        slugs.map(async (slug) => {
            const res = await fetch(`https://api.github.com/repos/${OWNER}/${slug}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "User-Agent": "eyildizemre-com",
                    "Accept": "application/vnd.github+json",
                },
            });

            const json = await res.json(); 
            
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
    )

    // We had to return a Response because a Pages Function's handler must return one
    // (the runtime rejects anything else). The data rides in the body; Cache-Control
    // marks it cacheable for ~1h so it isn't refetched from GitHub on every request.
    return new Response(JSON.stringify(repos), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    })
}
