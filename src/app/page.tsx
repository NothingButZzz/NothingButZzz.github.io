import Navbar from "@/components/Navbar";
import RotatingText from "@/components/RotatingText";
import FadeIn from "@/components/FadeIn";
import HeroSceneMount from "@/components/HeroSceneMount";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6">
        {/* HERO */}
        <section className="relative flex min-h-screen flex-col justify-center py-32">
          <div className="bg-dots pointer-events-none absolute inset-0 -z-10" />
          {/* 呼應原畫的氛圍光暈：青綠 + 紫，非常淡 */}
          <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />
          <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[380px] w-[380px] rounded-full bg-accent-2/10 blur-[130px]" />

          {/* 首屏粒子球體：右側大範圍 canvas，看向滑鼠、捲動時粒子向外飛散（桌機限定，不擋點擊） */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[64%] lg:block">
            <HeroSceneMount />
          </div>

          <FadeIn>
            <p className="eyebrow">智慧自動化 · 機電整合 / AUTOMATION · MECHATRONICS</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
              Kenny
              <br />
              <span className="text-gradient">Lin</span>
            </h1>
            <p className="mono mt-5 text-sm tracking-widest text-muted">林榆蓁 · YU-JEN LIN</p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted">
              北科大五專部智慧自動化工程科學生。從競賽機器人、火箭酬載電路板到影像處理，
              喜歡做出實際會動、在真實世界運作的系統。
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="mono text-muted">{">"}</span>
              <RotatingText
                words={["intelligent_automation", "mechatronics", "pcb_hardware", "computer_vision"]}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="mono rounded-md bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-opacity hover:opacity-85"
              >
                查看作品
              </a>
              <a
                href="#contact"
                className="mono rounded-md border border-line px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                聯絡我
              </a>
            </div>
          </FadeIn>

          <div className="scroll-hint mono absolute bottom-8 left-6 text-[0.65rem] tracking-widest text-muted">
            SCROLL ↓
          </div>
        </section>

        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
