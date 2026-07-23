import FadeIn from "./FadeIn";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <FadeIn>
      <div className="flex items-baseline gap-4 border-b border-line pb-5">
        <span className="mono text-xs text-accent">{index}</span>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}
