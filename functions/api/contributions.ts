import type { Contributions } from "../../src/types";

interface Env {
    GITHUB_TOKEN: string;
}

// Only the part of GitHub's GraphQL response this function reads
interface GraphQLResponse {
    data?: {
        user?: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: Contributions["weeks"];
                };
            };
        } | null;
    };
}

const OWNER = "eyildizemre";

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const token = context.env.GITHUB_TOKEN;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "eyildizemre-com",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query($username: String!) {
                    user(login: $username) {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            variables: { username: OWNER },
        }),
    });

    // GitHub fails either with a non-2xx status (e.g. an expired token) or with a 200
    // whose body carries `errors` instead of `data`; both leave `calendar` undefined.
    const json = res.ok ? await res.json<GraphQLResponse>() : null;
    const calendar = json?.data?.user?.contributionsCollection.contributionCalendar;

    if (!calendar) {
        return new Response(JSON.stringify({ error: "GitHub request failed" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
        });
    }

    const body: Contributions = { total: calendar.totalContributions, weeks: calendar.weeks };

    return new Response(
        JSON.stringify(body),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=3600",
            },
        },
    );
};
