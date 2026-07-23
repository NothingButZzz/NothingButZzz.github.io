import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const SKILLS = [
  "TypeScript",
  "React / Next.js",
  "Tailwind CSS",
  "Python",
  "C / C++",
  "Arduino",
  "Embedded Systems",
  "機電整合",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeading index="03" title="Skills" />

      <FadeIn delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="mono rounded-md border border-line bg-panel px-4 py-2 text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
