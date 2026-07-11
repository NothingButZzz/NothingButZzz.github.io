import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import RotatingText from "@/components/RotatingText";
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
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="pointer-events-none absolute right-[12%] top-[22%] h-[260px] w-[260px] rounded-full bg-accent-2/10 blur-[110px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-foreground/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Welcome to my portfolio
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="block text-foreground/85">Hi, 我是</span>
            <span className="text-gradient mt-2 block">Kenny Lin</span>
          </h1>

          <p className="mt-6 text-lg text-foreground/60 sm:text-xl">
            <RotatingText
              words={["Frontend Developer", "機電整合工程師", "Creative Coder", "3D Enthusiast"]}
            />
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#projects"
              className="btn-glow rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background"
            >
              查看作品
            </a>
            <a
              href="#contact"
              className="glass glow-border rounded-full px-7 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              聯絡我
            </a>
          </div>
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
