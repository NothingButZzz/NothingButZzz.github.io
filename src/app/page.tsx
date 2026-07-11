import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import RotatingText from "@/components/RotatingText";
import FadeIn from "@/components/FadeIn";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="relative flex h-screen min-h-[680px] w-full items-center justify-center overflow-hidden">
        {/* 3D 場景 */}
        <Hero3D />

        {/* 網格 + 光暈 + 底部漸層 */}
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="block text-foreground/85">Hi, 我是</span>
              <span className="text-gradient mt-2 block pb-2">Kenny Lin</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-4 text-lg text-foreground/60 sm:text-xl">
              <RotatingText
                words={["Frontend Developer", "機電整合工程師", "Creative Coder", "3D Enthusiast"]}
              />
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="#projects"
                className="btn-glow group rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background"
              >
                查看作品
                <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href="#contact"
                className="glass glow-border rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
              >
                聯絡我
              </a>
            </div>
          </FadeIn>
        </div>

        <a
          href="#about"
          aria-label="Scroll to About"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="scroll-mouse" />
        </a>
      </section>

      <About />
      <Projects />
      <Contact />
    </>
  );
}
