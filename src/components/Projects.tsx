"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import MediaGallery from "./MediaGallery";
import ImageComparison from "./ImageComparison";
import ProjectArtwork from "./ProjectArtwork";

const CATEGORIES = ["全部作品", "機構與控制", "電路與嵌入式", "影像處理"] as const;
type Category = typeof CATEGORIES[number];

const PRESENTATION = [
  { source: 1, id: "tdk", category: "機構與控制", kicker: "01 / ROBOTICS", title: "讓機構，完成每一個任務。", summary: "為 TDK 盃打造全向移動機器人，在 45 × 45 cm 的起始尺寸內，整合升降、伸縮與夾爪機構。", role: "機械製圖、機構加工與組裝；參與電路設計與報告書撰寫。", outcome: "完成整車整合與第一階段展示，持續進行場地測試與競賽準備。", cover: "/media/projects/tdk/robot.webp" },
  { source: 0, id: "tasa", category: "電路與嵌入式", kicker: "02 / PAYLOAD ELECTRONICS", title: "把感測與通訊，整合上火箭。", summary: "將市售感測與通訊模組整合成模組化 PCB，支援團隊酬載系統的姿態估測、遙測與回收。", role: "酬載組長；主要負責電路板線路設計與模組整合。", outcome: "團隊進入 2026 TASA 台灣盃火箭競賽決賽。", cover: null },
  { source: 2, id: "vision", category: "影像處理", kicker: "03 / COMPUTER VISION", title: "讓黑板上的想法，重新清晰。", summary: "以顏色與邊緣遮罩提取粉筆筆跡，處理黑板照片中的反光、粉筆灰與背景干擾。", role: "與涂力文合作完成影像處理期末專題與方法比較。", outcome: "比較四種濾波器，並展示顏色遮罩與顏色＋邊緣遮罩的處理差異。", cover: null },
  { source: 4, id: "cnc", category: "機構與控制", kicker: "04 / DIGITAL FABRICATION", title: "從螢幕上的線條，到手上的作品。", summary: "從 Mastercam 設計、CAM 刀具路徑，到三軸銑床操作，完成壓克力工件加工。", role: "個人作品；負責設計、對刀、工件座標設定與實際加工。", outcome: "完成 98 × 61 × 16 mm 壓克力工件；NC code 由老師與業師協助產生。", cover: "/media/projects/cnc/finished.webp" },
  { source: 3, id: "control", category: "機構與控制", kicker: "05 / MOTION CONTROL", title: "用控制，讓路徑更精準。", summary: "建立差動輪機器人的數學模型，以 PID 控制器調整路徑追蹤與行進穩定性。", role: "Matlab / Simulink 程式設計課程中的運動控制模擬。", outcome: "建構數學模型與 PID 控制模擬。", cover: null },
];

export default function Projects() {
  const [category, setCategory] = useState<Category>("全部作品");
  useEffect(() => {
    let frame = 0;
    // A direct project link must still work after its category has been filtered out.
    const onProjectLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#project-"]') : null;
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id || document.getElementById(id)) return;
      setCategory("全部作品");
      frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    document.addEventListener("click", onProjectLink);
    return () => { document.removeEventListener("click", onProjectLink); cancelAnimationFrame(frame); };
  }, []);
  const shown = PRESENTATION.filter((item) => category === "全部作品" || item.category === category);
  return (
    <section id="projects" className="section-space">
      <SectionHeading index="01" title="Selected Work" />
      <div className="section-intro"><p>從設計、實作到整合。<br /><span className="text-muted">每件作品，都有一個真實的問題要解決。</span></p><span className="mono text-xs text-muted">2024 — 2026 / SELECTED PROJECTS</span></div>
      <div className="project-filters" role="group" aria-label="依專業領域篩選作品">
        {CATEGORIES.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span className="mono">{item === "全部作品" ? "05" : String(PRESENTATION.filter((project) => project.category === item).length).padStart(2, "0")}</span></button>)}
      </div>
      <p className="sr-only" role="status">顯示 {shown.length} 件{category === "全部作品" ? "" : category}作品</p>
      <div className="projects-grid">
        {shown.map((item) => {
          const project = PROJECTS[item.source];
          return (
            <article key={item.id} id={"project-" + item.id} className={"project-card " + (item.id === "tdk" ? "project-featured" : "")}>
              <div className="project-visual">
                {item.id === "vision" ? <ImageComparison /> : item.cover ? <div className="project-cover"><Image src={item.cover} alt={item.id === "tdk" ? "整合後的 TDK 遙控組機器人實車" : "CNC 加工完成的壓克力工件"} fill sizes="(max-width: 767px) 90vw, 45vw" className="object-cover" /><span className="cover-label mono">{item.id === "tdk" ? "TDK 30 / TEAM B17" : "MASTERCAM → CNC"}</span></div> : <><ProjectArtwork type={item.id === "tasa" ? "payload" : "control"} /><p className="art-caption">功能概念示意{item.id === "control" ? " · 非實測曲線" : " · 非 PCB 佈線圖"}</p></>}
              </div>
              <div className="project-content">
                <p className="eyebrow text-accent">{item.kicker}</p>
                <h3>{project.title}</h3>
                <p className="project-meta">{project.meta}</p>
                <p className="project-tagline">{item.title}</p>
                <p className="project-summary">{item.summary}</p>
                <dl className="project-evidence"><div><dt>我的角色</dt><dd>{item.role}</dd></div><div><dt>成果 / 進度</dt><dd>{item.outcome}</dd></div></dl>
                <ul className="tech-tags" aria-label="使用技術">{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
              </div>
              <details className="project-details">
                <summary><span>探索專案細節{project.images ? "與影像" : ""}</span><span className="details-icon" aria-hidden="true">＋</span></summary>
                <div className="details-body">
                  <p className="text-sm leading-8 text-muted">{project.description}</p>
                  {project.images && <MediaGallery images={project.images} title={project.title} />}
                  {project.video && <figure className="mt-6"><video className="aspect-video w-full rounded-xl border border-line bg-background" src={project.video.src} poster={project.video.poster} controls playsInline preload="none" aria-label={project.video.caption} /><figcaption className="mt-3 text-xs leading-6 text-muted">{project.video.caption}</figcaption></figure>}
                </div>
              </details>
            </article>
          );
        })}
      </div>
      <a href="https://github.com/NothingButZzz" target="_blank" rel="noreferrer" className="github-more mono">EXPLORE MORE ON GITHUB <span aria-hidden="true">↗</span></a>
    </section>
  );
}
