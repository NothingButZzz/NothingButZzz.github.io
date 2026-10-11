"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch { setStatus("error"); }
  }

  return (
    <div>
      <button type="button" onClick={copy} className="button-secondary mono text-xs">
        {status === "copied" ? "已複製 ✓" : "複製 Email ⧉"}
      </button>
      <p role="status" className={status === "error" ? "mt-2 text-xs text-muted" : "sr-only"}>
        {status === "error" ? "無法自動複製，請選取下方 Email 地址複製。" : status === "copied" ? "Email 地址已複製。" : ""}
      </p>
    </div>
  );
}
