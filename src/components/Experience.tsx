import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

type Entry = {
  period: string;
  title: string;
  role: string;
  description: string;
};

const EXPERIENCE: Entry[] = [
  {
    period: "2026.02 — 至今",
    title: "115 年青年百億海外圓夢基金計畫（海外翱翔組）",
    role: "錄取學員",
    description: "計畫 GJ-9-1「智造機動力」，前往荷蘭飛利浦公司及恩荷芬理工大學見習。",
  },
  {
    period: "2025.12 — 至今",
    title: "TASA 2026 台灣盃火箭競賽（國家太空中心）",
    role: "酬載組長",
    description: "進入決賽。負責 IMU 姿態估測、LoRa 遙測系統建置與自動化降落傘回收機制設計。",
  },
  {
    period: "2024.08",
    title: "2024 PBL 國際競賽工作坊（臺北科技大學）",
    role: "團隊成員",
    description: "跨國機器人設計與系統整合（影像辨識、自走車），並以英文進行成果簡報。",
  },
  {
    period: "2024.01 — 2024.10",
    title: "第 29 屆 TDK 盃全國大專校院創思設計與製作競賽",
    role: "團隊成員 · 入選獎",
    description: "程式撰寫與電路整合，負責遙控訊號解析與即時控制邏輯設計。",
  },
  {
    period: "2023.09 — 至今",
    title: "臺北科技大學五專部 科學會",
    role: "公關部文宣長",
    description: "活動文案撰寫與推廣；擔任 Arduino 新生營隊輔、自走車創客營指導員。",
  },
];

const AWARDS = [
  { year: "2026", name: "TASA 台灣盃火箭競賽", result: "進入決賽" },
  { year: "2025", name: "僑務探索營（僑務委員會）", result: "小組第三名" },
  { year: "2024", name: "第 14 屆 CR 盃北科大機電學院機器人創思設計競賽", result: "第三名" },
  { year: "2024", name: "第 29 屆 TDK 盃創思設計與製作競賽", result: "入選獎" },
  { year: "2024", name: "AI Junior Award 2024（人工智慧科技基金會）", result: "入圍初賽" },
  { year: "2022", name: "新竹縣創新思考金頭腦數學競賽", result: "甲組優勝" },
  { year: "2020", name: "KIDE 高雄國際發明暨設計展", result: "銅牌獎" },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <SectionHeading index="02" title="Experience" />

      <div className="mt-4">
        {EXPERIENCE.map((item, i) => (
          <FadeIn key={item.title} delay={0.06 * i}>
            <div className="grid gap-2 border-b border-line py-7 sm:grid-cols-[180px_1fr] sm:gap-8">
              <span className="mono pt-1 text-xs tracking-widest text-muted">{item.period}</span>
              <div>
                <h3 className="font-display text-lg font-semibold sm:text-xl">{item.title}</h3>
                <p className="mono mt-1 text-[0.7rem] uppercase tracking-widest text-accent">
                  {item.role}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <p className="eyebrow mt-14">Awards</p>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {AWARDS.map((award) => (
            <li
              key={award.name}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-3 text-sm"
            >
              <span className="mono text-xs text-muted">{award.year}</span>
              <span className="text-foreground/90">{award.name}</span>
              <span className="mono text-xs text-accent">{award.result}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
