import FadeIn from "./FadeIn";

const SKILLS = [
  "TypeScript",
  "React / Next.js",
  "Three.js",
  "Tailwind CSS",
  "Python",
  "Arduino / 機電整合",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <FadeIn>
        <h2 className="text-sm font-mono text-accent">01. About Me</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
          嗨，我是 <span className="text-gradient">Kenny</span>
        </h3>
      </FadeIn>
      <FadeIn delay={0.2} className="mt-6 max-w-2xl text-foreground/70 leading-relaxed">
        <p>
          我是一名對機電整合與軟體開發都有興趣的創作者，喜歡把工程邏輯和網頁技術結合，
          打造有互動感、有科技氛圍的作品。這裡放你的自我介紹文字，之後可以隨時修改。
        </p>
      </FadeIn>

      <FadeIn delay={0.3} className="mt-10 flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            className="glass glow-border rounded-full px-4 py-2 text-sm text-foreground/80"
          >
            {skill}
          </span>
        ))}
      </FadeIn>
    </section>
  );
}
