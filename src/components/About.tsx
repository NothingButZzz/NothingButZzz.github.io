import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const SKILLS = [
  "TypeScript",
  "React / Next.js",
  "Three.js",
  "Tailwind CSS",
  "Python",
  "Arduino / 機電整合",
];

const FACTS = [
  { label: "所在地", value: "Taipei, Taiwan" },
  { label: "領域", value: "機電整合 × 網頁開發" },
  { label: "目前狀態", value: "學習中，歡迎交流" },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        index="01"
        label="About Me"
        title={
          <>
            嗨，我是 <span className="text-gradient">Kenny</span>
          </>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <FadeIn delay={0.15} className="space-y-4 leading-relaxed text-foreground/70">
            <p>
              我是一名對機電整合與軟體開發都有興趣的創作者，喜歡把工程邏輯和網頁技術結合，
              打造有互動感、有科技氛圍的作品。
            </p>
            <p>
              這裡放你的自我介紹文字，可以聊聊你正在學什麼、做過什麼專題、
              或是你對哪個領域特別有熱情，之後隨時可以修改。
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-10 font-mono text-xs uppercase tracking-widest text-foreground/40">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="glass glow-border flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/80"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="glass glow-border rounded-2xl p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40">
              Quick Facts
            </p>
            <dl className="mt-5 space-y-5">
              {FACTS.map((fact) => (
                <div key={fact.label} className="border-l-2 border-accent/40 pl-4">
                  <dt className="text-xs text-foreground/50">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground/90">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
