import FadeIn from "./FadeIn";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
}) {
  return (
    <div>
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-accent">
            {index}. {label}
          </span>
          <span className="h-px w-24 bg-gradient-to-r from-accent/60 to-transparent sm:w-40" />
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h3>
      </FadeIn>
    </div>
  );
}
