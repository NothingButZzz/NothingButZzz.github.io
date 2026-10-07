import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const CURRENTLY = [
  "國立臺北科技大學 五專部 智慧自動化工程科",
  "TASA 2026 台灣盃火箭競賽 酬載組長（決賽）",
  "青年百億海外圓夢基金 — 荷蘭飛利浦、恩荷芬理工大學見習",
];

const FOCUS = ["機電整合 / Mechatronics", "嵌入式系統 / Embedded", "影像處理 / Computer Vision"];

export default function About() {
  return (
    <section id="about" className="py-24">
      <SectionHeading index="01" title="About" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <FadeIn delay={0.1} className="space-y-4 leading-relaxed text-muted">
          <p>
            我是林榆蓁（Kenny Lin），就讀國立臺北科技大學五專部智慧自動化工程科，
            各學期 GPA 維持在 3.83–4.0。我喜歡把演算法變成實際會動的東西——
            從機電控制、嵌入式韌體，到影像處理與網頁前端，享受讓系統在真實世界運作的過程。
          </p>
          <p>
            參與過 TDK 盃、CR 盃機器人競賽與 TASA 台灣盃火箭競賽，負責程式撰寫、電路整合、
            IMU 姿態估測與 LoRa 遙測；也取得 CSWP、丙級氣壓技術士與初級火箭發射執照。
            英文方面有多益 785 分，能以英文進行跨國專題合作與成果簡報。
          </p>
        </FadeIn>

        <FadeIn delay={0.18} className="space-y-8">
          <div>
            <p className="eyebrow">Currently</p>
            <ul className="mt-3 space-y-2">
              {CURRENTLY.map((item) => (
                <li key={item} className="text-sm text-foreground/90">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Focus</p>
            <ul className="mt-3 space-y-2">
              {FOCUS.map((item) => (
                <li key={item} className="mono text-sm text-accent">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
