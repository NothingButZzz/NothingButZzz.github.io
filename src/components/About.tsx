import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const CURRENTLY = [
  "學習機電整合與軟體開發",
  "探索嵌入式系統與網頁技術",
];

const FOCUS = ["機電整合 / Mechatronics", "嵌入式系統 / Embedded", "網頁前端 / Frontend"];

export default function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading index="01" title="About" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <FadeIn delay={0.1} className="space-y-4 leading-relaxed text-muted">
          <p>
            我是 Kenny Lin，一名對機電整合與軟體開發都有興趣的創作者。
            我喜歡把演算法變成實際會動的東西——從機電控制、嵌入式韌體，
            到網頁前端，享受讓系統在真實世界運作的過程。
          </p>
          <p className="text-muted/80">
            這段是佔位文字，之後可以換成你的求學經歷、專長領域或正在做的事。
          </p>
        </FadeIn>

        <FadeIn delay={0.18} className="space-y-8">
          <div>
            <p className="eyebrow">Currently</p>
            <ul className="mt-3 space-y-2">
              {CURRENTLY.map((item) => (
                <li key={item} className="text-sm text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Focus</p>
            <ul className="mt-3 space-y-2">
              {FOCUS.map((item) => (
                <li key={item} className="mono text-sm text-accent">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
