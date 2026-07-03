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

      <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-sm text-accent">Hi, 我是</p>
          <h1 className="mt-4 text-5xl font-bold sm:text-7xl">
            <span className="text-gradient">Kenny Lin</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 sm:text-xl">
            <RotatingText
              words={["Frontend Developer", "機電整合工程師", "Creative Coder", "3D Enthusiast"]}
            />
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              查看作品
            </a>
            <a
              href="#contact"
              className="glass glow-border rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-105"
            >
              聯絡我
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-foreground/40">
          ↓
        </div>
      </section>

      <About />
      <Projects />
      <Contact />
    </>
  );
}
