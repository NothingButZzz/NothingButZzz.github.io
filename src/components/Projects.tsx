import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

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

function FolderIcon() {
  return (
    <svg
      className="h-9 w-9 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 text-foreground/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32">
      <SectionHeading index="02" label="Projects" title="作品集" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.12 * i}>
            <a
              href={project.link}
              className="glass glow-border group flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <FolderIcon />
                <ArrowIcon />
              </div>
              <h4 className="mt-5 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/60">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-accent-2">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} className="mt-14 text-center">
        <a
          href="https://github.com/NothingButZzz"
          target="_blank"
          rel="noreferrer"
          className="glass glow-border inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-foreground/80 transition-colors hover:text-accent"
        >
          在 GitHub 看更多
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </FadeIn>
    </section>
  );
}
