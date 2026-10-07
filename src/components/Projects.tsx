import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

type Media = { src: string; caption: string };

type Project = {
  title: string;
  meta: string;
  description: string;
  stack: string[];
  images?: Media[];
  video?: { src: string; poster: string; caption: string };
};

const PROJECTS: Project[] = [
  {
    title: "TASA 台灣盃火箭酬載電路板",
    meta: "2026 · 酬載組長 · 決賽",
    description:
      "酬載包含 IMU 姿態估測、LoRa 遙測與自動化降落傘回收；我主要負責把市售的感測與通訊模組整合成模組化 PCB，完成線路設計。團隊進入 2026 台灣盃火箭競賽決賽。",
    stack: ["PCB 線路設計", "模組化整合", "IMU", "LoRa"],
  },
  {
    title: "第 30 屆 TDK 盃遙控組機器人",
    meta: "2026 · 淨香團 B17 · 機構組 · 比賽進行中",
    description:
      "以雲林在地文化為主題的四個關卡：夾取扶正候鳥與裝置藝術、文蛤分級、稻草捲堆疊、北港迎媽祖（水果盤、擲筊、繞境、神轎）。整車採麥克納姆輪全向底盤，15×15 鋁擠型框架搭配 CNC 加工的玻璃纖維馬達板，並以升降、前後伸縮與 3D 列印夾爪共用於多個關卡，收納時須符合 45 × 45 cm 起始尺寸。我負責機構：SolidWorks 機械製圖、機構加工與組裝，並參與電路設計與報告書撰寫。",
    stack: ["SolidWorks", "CNC 加工", "3D 列印", "麥克納姆輪", "Teensy", "ODrive"],
    images: [
      { src: "/media/projects/tdk/cad-render.webp", caption: "整車 CAD（SolidWorks）" },
      { src: "/media/projects/tdk/robot.webp", caption: "整合後的實車" },
      { src: "/media/projects/tdk/chassis-v2.webp", caption: "底盤 V2 組裝" },
      { src: "/media/projects/tdk/motor-plate-3dp.webp", caption: "3D 列印步進馬達板試作" },
      { src: "/media/projects/tdk/gripper-cad.webp", caption: "水果盤夾爪 CAD" },
      { src: "/media/projects/tdk/wiring.webp", caption: "Teensy 與 ODrive 配線測試" },
    ],
    video: {
      src: "/media/tdk30-intro.mp4",
      poster: "/media/projects/tdk/robot.webp",
      caption: "第一階段機器人介紹影片：底盤全向移動、場地測試與夾爪原型",
    },
  },
  {
    title: "黑板筆記影像優化與內容提取",
    meta: "影像處理與實習 · 期末專題 · 與涂力文合作",
    description:
      "針對光線不均、反光與粉筆灰造成難以閱讀的黑板照片，串接灰階轉換、高斯濾波、Canny 邊緣偵測與膨脹，再以 HSV 顏色遮罩保留白、紅、黃、橘色筆跡，最後將邊緣遮罩與顏色遮罩做 AND 合併。實驗比較了高斯、雙邊、均值、中值四種濾波器，以及「只用顏色遮罩」與「顏色＋邊緣遮罩」的差異。",
    stack: ["Python", "OpenCV", "Canny", "HSV 色彩遮罩", "形態學"],
    images: [
      { src: "/media/projects/blackboard/before.webp", caption: "原始照片" },
      { src: "/media/projects/blackboard/color-only.webp", caption: "只用顏色遮罩：殘留黑板區塊" },
      { src: "/media/projects/blackboard/after.webp", caption: "顏色＋邊緣遮罩（最終方法）" },
      { src: "/media/projects/blackboard/before-2.webp", caption: "範例二：原始照片" },
      { src: "/media/projects/blackboard/after-2.webp", caption: "範例二：處理後" },
      { src: "/media/projects/blackboard/pipeline.webp", caption: "處理流程圖" },
    ],
  },
  {
    title: "差動輪行動機器人運動控制模擬",
    meta: "Matlab/Simulink 程式設計",
    description:
      "建構差動輪機器人的數學模型，以 PID 控制器調整路徑追蹤的精準度與行進穩定性。",
    stack: ["Matlab", "Simulink", "PID"],
  },
  {
    title: "CNC 銑床加工實作",
    meta: "數值控制工具機與實習 · 個人作品",
    description:
      "在 Mastercam 繪製 98 × 61 × 16 mm 壓克力工件：建立外框與文字、把圖片由點陣圖轉成向量並修整曲線，再設定刀具與銑削路徑。NC code 在老師與業師協助下產生，之後由我在永進 FV56A 三軸銑床上對刀、設定工件座標、匯入 G-code 加工，最後去除毛邊。",
    stack: ["Mastercam", "CAM 刀具路徑", "三軸銑床", "G-code"],
    images: [
      { src: "/media/projects/cnc/finished.webp", caption: "完成的壓克力工件" },
      { src: "/media/projects/cnc/design.webp", caption: "Mastercam 設計圖" },
      { src: "/media/projects/cnc/vectorize.webp", caption: "點陣圖轉向量" },
      { src: "/media/projects/cnc/controller.webp", caption: "FANUC 控制面板操作" },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <SectionHeading index="03" title="Projects" />

      <div className="mt-4">
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.06 * i}>
            <article className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-line py-8 sm:gap-8">
              <span className="mono pt-1 text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold sm:text-2xl">{project.title}</h3>
                <p className="mt-1 text-xs text-accent">{project.meta}</p>
                <p className="mono mt-2 text-[0.7rem] uppercase tracking-widest text-muted">
                  {project.stack.join(" · ")}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {project.images && (
                  <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.images.map((img) => (
                      <li key={img.src}>
                        <a
                          href={img.src}
                          target="_blank"
                          rel="noreferrer"
                          className="group block overflow-hidden rounded-lg border border-line bg-panel"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP */}
                          <img
                            src={img.src}
                            alt={img.caption}
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="mono block px-3 py-2 text-[0.7rem] leading-snug text-muted">
                            {img.caption}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {project.video && (
                  <figure className="mt-4">
                    <video
                      className="aspect-video w-full rounded-lg border border-line bg-background"
                      src={project.video.src}
                      poster={project.video.poster}
                      controls
                      playsInline
                      preload="none"
                    />
                    <figcaption className="mono mt-2 text-[0.7rem] text-muted">
                      {project.video.caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            </article>
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
