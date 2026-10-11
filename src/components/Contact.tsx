import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import CopyEmail from "./CopyEmail";

const EMAIL = "kenny.lin.026@gmail.com";

const CHANNELS = [
  { label: "EMAIL", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "GITHUB", value: "NothingButZzz", href: "https://github.com/NothingButZzz" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <SectionHeading index="05" title="Contact" />

      <FadeIn delay={0.1}>
        <p className="eyebrow mt-10">LET’S BUILD SOMETHING REAL.</p>
        <h3 className="mt-4 text-3xl font-semibold leading-relaxed sm:text-5xl">讓下一個想法，<br /><span className="text-accent">一起成真。</span></h3>
        <p className="mt-5 max-w-xl text-sm leading-8 text-muted">歡迎交流機電整合、嵌入式系統，或聊聊專題合作、研究與實習機會。</p>
      </FadeIn>

      <FadeIn delay={0.18}>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="button-primary"
          >
            Email me →
          </a>
          <CopyEmail email={EMAIL} />
        </div>
      </FadeIn>

      <FadeIn delay={0.24}>
        <dl className="mt-14 divide-y divide-line border-t border-line">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between py-4"
            >
              <dt className="mono text-xs uppercase tracking-widest text-muted">{c.label}</dt>
              <dd className="text-sm text-foreground/90 transition-colors group-hover:text-accent">
                {c.value}
              </dd>
            </a>
          ))}
        </dl>
      </FadeIn>

      <footer className="mt-16 border-t border-line pt-8">
        <p className="mono text-[0.7rem] text-muted">
          © {new Date().getFullYear()} 林榆蓁 KENNY LIN — BUILT WITH NEXT.JS &amp; TAILWIND CSS
        </p>
      </footer>
    </section>
  );
}
