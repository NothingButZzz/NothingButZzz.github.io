import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const SKILL_GROUPS = [
  { title: "機構設計與製造", en: "DESIGN & BUILD", skills: ["SolidWorks", "AutoCAD", "Mastercam", "CNC 銑床 / G-code", "3D 列印"], evidence: "TDK 競賽機器人 · CNC 加工實作" },
  { title: "嵌入式與系統整合", en: "INTEGRATE & CONTROL", skills: ["C / C++", "Arduino", "LoRa / IMU", "Matlab / Simulink", "機電整合"], evidence: "火箭酬載電路 · 差動輪控制模擬" },
  { title: "影像與軟體開發", en: "PROCESS & DEVELOP", skills: ["Python", "OpenCV", "TypeScript", "React / Next.js"], evidence: "黑板筆記影像處理 · 個人網站" },
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
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="rounded-xl border border-line bg-panel/50 p-6">
              <p className="eyebrow">{group.en}</p>
              <h3 className="mt-3 text-lg font-semibold">{group.title}</h3>
              <ul className="tech-tags">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-6 text-muted">{group.evidence}</p>
            </div>
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
