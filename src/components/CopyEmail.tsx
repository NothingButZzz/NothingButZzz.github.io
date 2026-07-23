"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard 不可用時忽略 */
    }
  };

  return (
    <button
      onClick={copy}
      className="mono rounded-md border border-line px-4 py-2 text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? "COPIED ✓" : "COPY EMAIL ⧉"}
    </button>
  );
}
