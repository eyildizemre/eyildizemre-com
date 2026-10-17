export type Lang = "tr" | "en";

export type Localized = Record<Lang, string>;

export interface Work {
    slug: string;
    title: string;
    description: Localized;
    type: "github" | "creative";
    status: "active" | "completed" | "planned";
    current: boolean;
    tags: string[];
    year: number;
    links: {
        github?: string;
        live?: string;
    };
}

// Response shapes of the Pages Functions, shared by the functions and the client

// GET /api/repos
export interface Repo {
    slug: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    pushedAt: string;
    htmlUrl: string;
}

// GET /api/contributions
export interface ContributionDay {
    contributionCount: number;
    date: string;
}

export interface Contributions {
    total: number;
    weeks: { contributionDays: ContributionDay[] }[];
}
