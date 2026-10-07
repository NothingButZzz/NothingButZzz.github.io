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
          到台夫特與恩荷芬理工大學的校園。下面是我們團隊的成果影片。
        </p>

        <video
          className="mt-6 aspect-video w-full rounded-lg border border-line bg-background"
          src="/media/netherlands-2026.mp4"
          poster="/media/nl/tu-eindhoven.webp"
          controls
          playsInline
          preload="none"
        />

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
    </FadeIn>
  );
}
