import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
};

const PROJECTS: Project[] = [
  {
    title: "TASA 台灣盃火箭酬載電路板",
    description:
      "擔任酬載組長。酬載包含 IMU 姿態估測、LoRa 遙測與自動化降落傘回收；我主要負責把市售的感測與通訊模組整合成模組化 PCB，完成線路設計。團隊進入 2026 台灣盃火箭競賽決賽。",
    stack: ["PCB 線路設計", "模組化整合", "IMU", "LoRa"],
  },
  {
    title: "TDK 盃競賽機器人",
    description:
      "負責程式撰寫與電路整合，解析遙控訊號並設計即時控制邏輯，獲第 29 屆 TDK 盃創思設計與製作競賽入選獎。",
    stack: ["Embedded C", "電路整合", "馬達控制"],
  },
  {
    title: "黑板筆記影像優化與內容提取",
    description:
      "利用 OpenCV 進行影像前處理與邊緣偵測，提升黑板筆記照片的可讀性與文字辨識率。",
    stack: ["Python", "OpenCV"],
  },
  {
    title: "差動輪行動機器人運動控制模擬",
    description:
      "建構差動輪機器人的數學模型，以 PID 控制器調整路徑追蹤的精準度與行進穩定性。",
    stack: ["Matlab", "Simulink", "PID"],
  },
  {
    title: "CNC 銑床加工實作",
    description: "從工件設計、G-code 編寫到實際上機加工，完成整套 CNC 銑削流程。",
    stack: ["CNC", "G-code"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeading index="03" title="Projects" />

      <div className="mt-4">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.06 * i}>
            <a
              href={project.link}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-line py-8 transition-colors hover:bg-panel/60 sm:gap-8"
            >
              <span className="mono pt-1 text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mono mt-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  {project.stack.join(" · ")}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
              <span className="pt-1 text-lg text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                ↗
              </span>
            </a>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <a
          href="https://github.com/NothingButZzz"
          target="_blank"
          rel="noreferrer"
          className="mono mt-8 inline-block text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          {"// MORE ON GITHUB →"}
        </a>
      </FadeIn>
    </section>
  );
}
