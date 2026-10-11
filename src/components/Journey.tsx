import FadeIn from "./FadeIn";

const PHOTOS = [
  { src: "/media/nl/cobot.webp", caption: "行前研習 · 協作機器人" },
  { src: "/media/nl/philips.webp", caption: "Philips Museum" },
  { src: "/media/nl/high-tech-campus.webp", caption: "High Tech Campus Eindhoven" },
  { src: "/media/nl/pcb-wall.webp", caption: "Apple Museum · 早期電路板" },
  { src: "/media/nl/tu-delft.webp", caption: "TU Delft" },
  { src: "/media/nl/tu-eindhoven.webp", caption: "TU Eindhoven" },
];

/* 荷蘭見習成果：影片 + 照片牆（影片 preload="none"，按下播放才下載） */
export default function Journey() {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-14 rounded-xl border border-line bg-panel/60 p-5 sm:p-8">
        <p className="eyebrow">Featured · Netherlands 2026</p>
        <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          青年百億海外圓夢 · 智造機動力
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          2026 年夏天的荷蘭見習：從飛利浦博物館的百年研發史、High Tech Campus 的科技園區，
          到台夫特與恩荷芬理工大學的校園。展開即可觀看我們團隊的成果影片與照片。
        </p>

        <details className="project-details journey-details mt-6">
          <summary><span>觀看成果影片與 {PHOTOS.length} 張照片</span><span className="details-icon" aria-hidden="true">＋</span></summary>
          <div className="details-body">
            <video
              className="aspect-video w-full rounded-lg border border-line bg-background"
              src="/media/netherlands-2026.mp4"
              poster="/media/nl/tu-eindhoven.webp"
              controls
              playsInline
              preload="none"
            />
    
            <p
              id="journey-questions"
              className="mt-6 scroll-mt-24 rounded-r-lg border-l-2 border-accent/50 bg-accent/5 px-4 py-3 text-sm leading-relaxed text-muted"
            >
              如果你對青年百億海外圓夢基金計畫有任何問題，歡迎到這個 IG 帳號{" "}
              <a
                href="https://www.instagram.com/gj.kl.journey_9.1/"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap rounded-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                @gj.kl.journey_9.1
              </a>{" "}
              來詢問。
            </p>
    
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PHOTOS.map((photo) => (
                <li key={photo.src}>
                  <figure className="overflow-hidden rounded-lg border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP */}
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <figcaption className="mono px-3 py-2 text-[0.7rem] tracking-wide text-muted">
                      {photo.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </FadeIn>
  );
}
