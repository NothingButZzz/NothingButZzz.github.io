import Navbar from "@/components/Navbar";
import RotatingText from "@/components/RotatingText";
import FadeIn from "@/components/FadeIn";
import About from "@/components/About";
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

          <FadeIn>
            <p className="eyebrow">機電整合 · 網頁開發 / MECHATRONICS · WEB DEV</p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
              Kenny
              <br />
              <span className="text-accent">Lin</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted">
              喜歡把工程邏輯和軟體結合，從機電整合、嵌入式到網頁開發，
              做出實際會動、有質感的系統。
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex items-center gap-2 text-sm">
              <span className="mono text-muted">{">"}</span>
              <RotatingText
                words={["mechatronics_engineer", "web_developer", "embedded_systems", "creative_coder"]}
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
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
