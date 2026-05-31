const OWNER = "eyildizemre";

export async function onRequestGet(context) {
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

    const json = await res.json();
    const calendar = json.data.user.contributionsCollection.contributionCalendar;

    return new Response(
        JSON.stringify({ total: calendar.totalContributions, weeks: calendar.weeks }),
        {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=3600",
            },
        },
    );
}
