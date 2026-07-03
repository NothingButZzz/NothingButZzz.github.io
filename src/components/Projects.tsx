import FadeIn from "./FadeIn";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    title: "專案一：放你的作品名稱",
    description: "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    tags: ["Next.js", "TypeScript"],
    link: "#",
  },
  {
    title: "專案二：放你的作品名稱",
    description: "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    tags: ["Arduino", "C++"],
    link: "#",
  },
  {
    title: "專案三：放你的作品名稱",
    description: "簡短描述這個專案解決了什麼問題、用了什麼技術，之後可以換成你的真實作品。",
    tags: ["Python", "Data"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <FadeIn>
        <h2 className="text-sm font-mono text-accent">02. Projects</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 className="mt-3 text-3xl font-bold sm:text-4xl">作品集</h3>
      </FadeIn>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.15 * i}>
            <a
              href={project.link}
              className="glass glow-border group block h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h4>
              <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-accent-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
