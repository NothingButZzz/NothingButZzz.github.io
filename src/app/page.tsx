import Navbar from "@/components/Navbar";
import HeroShowcase from "@/components/HeroShowcase";
import Aurora from "@/components/Aurora";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="site-container">
        <section id="home" className="hero-section" aria-labelledby="hero-title">
          <Aurora />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-intro">
            <p className="eyebrow flex items-center gap-3"><span className="status-dot" /> ENGINEERING PORTFOLIO / 2026</p>
            <h1 id="hero-title" className="hero-name">KENNY<span className="text-gradient">LIN<span className="text-accent">.</span></span></h1>
            <p className="mono mt-5 text-sm tracking-[0.18em] text-muted">林榆蓁 · YU-JEN LIN</p>
            <h2 className="mt-8 text-2xl font-semibold leading-relaxed sm:text-3xl">把想法，做成<span className="text-accent">會動的系統。</span></h2>
            <p className="mt-4 max-w-lg text-sm leading-8 text-muted sm:text-base">從機構設計、火箭酬載電路，到影像處理。<br className="hidden sm:block" />我是北科大智慧自動化工程科的 Kenny，<br className="hidden sm:block" />喜歡讓設計走出螢幕，在真實世界運作。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="button-primary">探索我的作品 <span aria-hidden="true">↗</span></a>
              <a href="#about" className="button-secondary">認識我 <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-disciplines mono"><span>MECHANICAL</span><i /><span>EMBEDDED</span><i /><span>VISION</span></div>
          </div>
          <HeroShowcase />
          <div className="hero-bottom mono"><span>TAIPEI, TAIWAN · NTUT</span><a href="#projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
        </section>
        <div className="credentials-strip" aria-label="能力與經歷摘要">
          <div><strong>3.83–4.0</strong><span>各學期 GPA</span></div>
          <div><strong>CSWP</strong><span>SOLIDWORKS 專業認證</span></div>
          <div><strong>TASA 2026</strong><span>火箭競賽決賽 · 酬載組長</span></div>
          <div><strong>Netherlands</strong><span>青年百億海外圓夢 · 2026</span></div>
        </div>
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
