import FadeIn from "./FadeIn";

const LINKS = [
  { label: "GitHub", href: "https://github.com/NothingButZzz" },
  { label: "Email", href: "mailto:kenny.lin.026@gmail.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 text-center">
      <FadeIn>
        <h2 className="text-sm font-mono text-accent">03. Contact</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
          一起<span className="text-gradient">聊聊</span>吧
        </h3>
      </FadeIn>
      <FadeIn delay={0.2} className="mx-auto mt-4 max-w-xl text-foreground/70">
        <p>如果對合作、專案或任何想法有興趣，歡迎透過以下方式聯絡我。</p>
      </FadeIn>

      <FadeIn delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="glass glow-border rounded-full px-6 py-3 text-sm font-medium text-foreground/90 transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      <p className="mt-20 text-xs text-foreground/40">
        © {new Date().getFullYear()} Kenny. Built with Next.js & Three.js.
      </p>
    </section>
  );
}
