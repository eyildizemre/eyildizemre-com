import { works } from "../data/works";
import { WorkCard } from "../components/works/WorkCard";

export default function Works() {
    return (
        <section className="px-8 sm:px-16 pt-16 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {works.map((work) => (
                    <WorkCard
                        key={work.slug}
                        title={work.title}
                        description={work.description}
                        tags={work.tags}
                        type={work.type}
                        year={work.year}
                        githubUrl={work.links.github}
                        liveUrl={work.links.live}
                        to={work.type === "github" ? `/code/${work.slug}` : `/works/${work.slug}`}
                    />
                ))}
            </div>
        </section>
    )
}