import now from "../../data/now.json"

export default function SuSiralar() {
    return (
        <div className="space-y-4">
            <p className="text-f-sm leading-relaxed text-c-muted font-serif italic">
                {now.description}
            </p>
            <iframe
                src={now.url.replace("/playlist/", "/embed/playlist/")}
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-11/12 rounded border-0 opacity-80"
            />
        </div>
    )
}