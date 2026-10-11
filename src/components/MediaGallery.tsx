"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type ProjectMedia = { src: string; caption: string };

export default function MediaGallery({ images, title }: { images: ProjectMedia[]; title: string }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = images[selected];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function show(index: number) {
    setSelected(index);
    setOpen(true);
    dialog.current?.showModal();
  }

  function move(direction: number) {
    setSelected((index) => (index + direction + images.length) % images.length);
  }

  return (
    <>
      <ul className="project-gallery">
        {images.map((image, index) => <li key={image.src}>
          <button type="button" className="gallery-thumbnail" onClick={() => show(index)} aria-label={"放大：" + image.caption}>
            <div className="relative aspect-[4/3]"><Image src={image.src} alt={image.caption} fill sizes="(max-width: 639px) 40vw, 25vw" className="object-cover" /></div>
            <span>{image.caption}<span aria-hidden="true">↗</span></span>
          </button>
        </li>)}
      </ul>
      <dialog ref={dialog} className="image-dialog" aria-label={title + "圖片檢視器"} onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
        {open && <div className="dialog-content">
          <div className="dialog-toolbar"><p>{title}</p><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="關閉圖片檢視器">關閉 ×</button></div>
          <div className="dialog-image"><Image src={current.src} alt={current.caption} fill sizes="90vw" className="object-contain" /></div>
          <div className="dialog-toolbar">
            <button type="button" onClick={() => move(-1)} aria-label="上一張圖片">←</button>
            <p aria-live="polite">{current.caption}<span className="mono ml-3 text-muted">{selected + 1} / {images.length}</span></p>
            <button type="button" onClick={() => move(1)} aria-label="下一張圖片">→</button>
          </div>
        </div>}
      </dialog>
    </>
  );
}

