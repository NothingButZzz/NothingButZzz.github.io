"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#projects", label: "作品", en: "WORK" },
  { href: "#about", label: "關於", en: "ABOUT" },
  { href: "#experience", label: "經歷", en: "EXPERIENCE" },
  { href: "#skills", label: "技能", en: "SKILLS" },
  { href: "#contact", label: "聯絡", en: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const sections = LINKS.map((link) => document.querySelector(link.href)).filter((node): node is Element => !!node);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 180).at(-1);
      setActive(current ? "#" + current.id : "");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const closeOnDesktop = () => { if (window.innerWidth >= 768) setOpen(false); onScroll(); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", closeOnDesktop);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", closeOnDesktop); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={"site-header " + (scrolled || open ? "is-scrolled" : "")}>
      <nav className="site-container nav-inner" aria-label="主要導覽">
        <a href="#home" className="site-logo" onClick={() => setOpen(false)}>K<span className="text-accent">.</span><span className="mono">KENNY LIN</span></a>
        <ul className="desktop-nav">{LINKS.map((link) => <li key={link.href}><a href={link.href} aria-current={active === link.href ? "location" : undefined}><span>{link.label}</span><span className="mono">{link.en}</span></a></li>)}</ul>
        <div className="nav-actions"><a href={process.env.NODE_ENV === "development" ? "http://localhost:3001/" : "https://nothingbutzzz.github.io/engineering-portfolio/"} lang="en" className="language-link" aria-label="English portfolio">EN <span aria-hidden="true">↗</span></a><button ref={menuButton} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "關閉選單" : "開啟選單"}>{open ? "關閉 ×" : "選單 ☰"}</button></div>
      </nav>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="手機導覽" hidden={!open}>
        {LINKS.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => setOpen(false)}><span>{link.label}</span><span className="mono">{link.en} ↗</span></a>)}
      </nav>
    </header>
  );
}
