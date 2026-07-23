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
      <SectionHeading index="04" title="Contact" />

      <FadeIn delay={0.1}>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-foreground/90">
          想聊機電整合、嵌入式系統，或合作專案嗎？
        </p>
      </FadeIn>

      <FadeIn delay={0.18}>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="mono rounded-md bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-opacity hover:opacity-85"
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
          © {new Date().getFullYear()} KENNY LIN — BUILT WITH NEXT.JS &amp; TAILWIND CSS
        </p>
      </footer>
    </section>
  );
}
