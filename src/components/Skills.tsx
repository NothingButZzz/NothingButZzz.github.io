import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const SKILLS = [
  "C / C++",
  "Python",
  "Arduino",
  "OpenCV",
  "Matlab / Simulink",
  "SolidWorks",
  "Mastercam",
  "3D 列印",
  "AutoCAD",
  "CNC 銑床 / G-code",
  "LoRa / IMU",
  "TypeScript",
  "React / Next.js",
  "機電整合",
];

const CERTS = [
  { name: "初級火箭發射執照", issuer: "國家太空中心 TASA", date: "2026.05" },
  { name: "丙級氣壓技術士", issuer: "勞動部勞動力發展署", date: "2025.07" },
  { name: "CSWP — Certified SOLIDWORKS Professional", issuer: "Dassault Systèmes", date: "2024.11" },
  { name: "CSWA — Certified SOLIDWORKS Associate", issuer: "Dassault Systèmes", date: "2024.06" },
  { name: "Google Cybersecurity Certificate", issuer: "Google", date: "2025" },
];

const LANGUAGES = ["英文 — 多益 TOEIC 785 ／ 全民英檢中高級初試通過", "德文 — 基礎（課程選修）"];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <SectionHeading index="04" title="Skills" />

      <FadeIn delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="mono rounded-md border border-line bg-panel px-4 py-2 text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </FadeIn>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <FadeIn delay={0.14}>
          <p className="eyebrow">Certifications</p>
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {CERTS.map((cert) => (
              <li key={cert.name} className="flex items-baseline justify-between gap-4 py-3">
                <div>
                  <p className="text-sm text-foreground/90">{cert.name}</p>
                  <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                </div>
                <span className="mono shrink-0 text-xs text-muted">{cert.date}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="eyebrow">Languages</p>
          <ul className="mt-4 space-y-2">
            {LANGUAGES.map((lang) => (
              <li key={lang} className="text-sm text-foreground/90">
                {lang}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
