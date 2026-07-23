import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    title: "專案一：放你的作品名稱",
    description:
      "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    stack: ["Next.js", "TypeScript"],
    link: "#",
  },
  {
    title: "專案二：放你的作品名稱",
    description:
      "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    stack: ["Arduino", "C++"],
    link: "#",
  },
  {
    title: "專案三：放你的作品名稱",
    description:
      "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    stack: ["Python", "Machine Learning"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeading index="02" title="Projects" />

      <div className="mt-4">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.06 * i}>
            <a
              href={project.link}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-line py-8 transition-colors hover:bg-panel/60 sm:gap-8"
            >
              <span className="mono pt-1 text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mono mt-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  {project.stack.join(" · ")}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
              <span className="pt-1 text-lg text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                ↗
              </span>
            </a>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <a
          href="https://github.com/NothingButZzz"
          target="_blank"
          rel="noreferrer"
          className="mono mt-8 inline-block text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          {"// MORE ON GITHUB →"}
        </a>
      </FadeIn>
    </section>
  );
}
