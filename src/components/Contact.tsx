import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-16 pt-32">
      {/* 背景光暈 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(34,211,238,0.08),transparent)]" />

      <div className="relative text-center">
        <FadeIn>
          <p className="font-mono text-sm text-accent">03. Contact</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            一起<span className="text-gradient">聊聊</span>吧
          </h3>
        </FadeIn>
        <FadeIn delay={0.2} className="mx-auto mt-6 max-w-xl text-foreground/60">
          <p>
            如果對合作、專案或任何想法有興趣，隨時歡迎聯絡我，
            我會盡快回覆。
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:kenny.lin.026@gmail.com"
            className="btn-glow rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-background"
          >
            寄封信給我
          </a>
          <a
            href="https://github.com/NothingButZzz"
            target="_blank"
            rel="noreferrer"
            className="glass glow-border rounded-full px-8 py-3.5 text-sm font-semibold text-foreground/90 transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </FadeIn>
      </div>

      <div className="relative mt-24 border-t border-white/5 pt-8 text-center">
        <p className="font-mono text-xs text-foreground/35">
          © {new Date().getFullYear()} Kenny Lin — Built with Next.js, Three.js & Tailwind CSS
        </p>
      </div>
    </section>
  );
}
