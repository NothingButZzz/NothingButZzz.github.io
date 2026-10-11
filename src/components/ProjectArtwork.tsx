export default function ProjectArtwork({ type }: { type: "payload" | "control" }) {
  if (type === "control") return (
    <div className="technical-art" aria-label="PID 路徑追蹤概念示意，非實測數據" role="img">
      <svg viewBox="0 0 600 330" aria-hidden="true"><defs><pattern id="control-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity=".13" /></pattern></defs><rect width="600" height="330" fill="url(#control-grid)" /><path d="M60 245 C130 245 130 90 230 90 S330 240 430 160 S490 80 550 85" fill="none" stroke="#69748b" strokeDasharray="7 9" strokeWidth="2" /><path className="signal-path" d="M60 265 C145 265 130 75 230 99 S330 227 430 157 S490 78 550 87" fill="none" stroke="#2dd4bf" strokeWidth="3" /><circle cx="230" cy="99" r="10" fill="#2dd4bf" /><circle cx="230" cy="99" r="24" fill="none" stroke="#2dd4bf" strokeOpacity=".4" /><text x="55" y="42" fill="#a9b3c5" fontSize="12" fontFamily="monospace">REFERENCE / RESPONSE</text><text x="360" y="295" fill="#a9b3c5" fontSize="12" fontFamily="monospace">CONCEPT DIAGRAM</text></svg>
    </div>
  );
  return (
    <div className="technical-art" role="img" aria-label="酬載功能概念示意：IMU 姿態、LoRa 遙測與降落傘回收，非 PCB 實際佈線">
      <svg viewBox="0 0 600 330" aria-hidden="true"><defs><pattern id="payload-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#2dd4bf" opacity=".17" /></pattern></defs><rect width="600" height="330" fill="url(#payload-grid)" /><g stroke="#2dd4bf" fill="none"><path className="signal-path" d="M170 108 H235 V165 H265 M170 242 H235 V185 H265 M335 175 H395 V108 H440" strokeWidth="2" /><rect x="265" y="137" width="70" height="76" rx="8" fill="#132b31" /><rect x="70" y="77" width="100" height="62" rx="4" /><rect x="70" y="211" width="100" height="62" rx="4" /><rect x="440" y="77" width="108" height="62" rx="4" /><circle cx="300" cy="175" r="15" /><path d="M285 175 H315 M300 160 V190" /></g><g fill="#e7edf6" fontFamily="monospace" fontSize="15" textAnchor="middle"><text x="120" y="114">IMU</text><text x="120" y="248">LoRa</text><text x="494" y="114">RECOVERY</text></g><g fill="#9aa9bb" fontFamily="monospace" fontSize="11"><text x="35" y="35">MODULAR PAYLOAD / SYSTEM CONCEPT</text><text x="252" y="241">INTEGRATION</text></g></svg>
    </div>
  );
}
