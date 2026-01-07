import React from "react";

const blurLevels = [
  {
    label: "backdrop-blur-sm",
    desc: "輕微柔化，適合做小幅半透明面板。",
    className: "backdrop-blur",
  },
  {
    label: "backdrop-blur",
    desc: "預設強度，讓底圖有明顯霧面玻璃感。",
    className: "backdrop-blur",
  },
  {
    label: "backdrop-blur-md",
    desc: "中等模糊，資訊仍清楚但背景被充分弱化。",
    className: "backdrop-blur-md",
  },
  {
    label: "backdrop-blur-lg",
    desc: "強烈模糊，常用於浮層或導覽列。",
    className: "backdrop-blur-lg",
  },
  {
    label: "backdrop-blur-2xl",
    desc: "更厚重的玻璃態，凸顯前景內容。",
    className: "backdrop-blur-2xl",
  },
  {
    label: "backdrop-blur-3xl",
    desc: "極致模糊，營造夢幻或焦點提示效果。",
    className: "backdrop-blur-3xl",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-indigo-200/80">Tailwind Utility</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">使用 backdrop-blur 打造霧面玻璃效果</h1>
          <p className="max-w-3xl text-slate-300">
            backdrop-blur 會對「元素背後」的內容套用 backdrop-filter，讓背景被柔化但仍透出色彩。搭配半透明背景 (例如
            bg-white/10) 就能快速做出玻璃態卡片、導覽列或浮層。
          </p>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-mono text-indigo-100 shadow-lg shadow-indigo-500/10">
            <span className="rounded-md bg-indigo-500/20 px-2 py-1 text-xs uppercase tracking-wide text-indigo-50">
              範例
            </span>
            <code>className="bg-white/10 backdrop-blur-md"</code>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blurLevels.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-indigo-900/40"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(129,140,248,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.25),transparent_35%),radial-gradient(circle_at_60%_90%,rgba(52,211,153,0.28),transparent_40%)]" />
              </div>
              <div className={`relative flex h-44 flex-col justify-between bg-white/20 p-5 ${item.className}`}>
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-indigo-50/80">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1">{item.label}</span>
                  <span className="text-[11px] text-slate-200/70">Filter</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-50">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-indigo-900/40">
          <div className="absolute inset-0">
            <div className="absolute -left-10 top-6 h-52 w-52 rounded-full bg-indigo-500/35 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-emerald-400/25 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.12),transparent_35%),radial-gradient(circle_at_40%_90%,rgba(45,212,191,0.12),transparent_45%)]" />
          </div>

          <div className="relative grid gap-8 p-8 lg:grid-cols-[1.1fr,0.9fr] lg:p-12">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.18em] text-indigo-200/90">使用步驟</p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">如何在專案中加上 backdrop-blur</h2>
              <ol className="space-y-3 text-slate-200">
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs font-semibold text-indigo-50">
                    1
                  </span>
                  <div>確認 Tailwind 已啟用預設的 backdrop filter（v3 以上預設啟用）。無需額外安裝。</div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs font-semibold text-indigo-50">
                    2
                  </span>
                  <div>
                    選擇強度：使用如{" "}
                    <code className="rounded bg-slate-900/70 px-1.5 py-0.5 text-[12px] font-semibold text-indigo-100">
                      backdrop-blur-sm / md / xl / 3xl
                    </code>{" "}
                    等類別。
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs font-semibold text-indigo-50">
                    3
                  </span>
                  <div>
                    元素本身需半透明（例如{" "}
                    <code className="rounded bg-slate-900/70 px-1.5 py-0.5 text-[12px] font-semibold text-indigo-100">
                      bg-white/10
                    </code>
                    ）才能透出並模糊後方內容。
                  </div>
                </li>
              </ol>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl shadow-indigo-900/30">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-100">實際配置</p>
              <p className="mt-3 text-slate-100">
                下方範例卡片在同一個區塊內放了彩色背景，前景則使用半透明 + backdrop-blur-lg 來做玻璃態。
              </p>
              <div className="mt-5 grid gap-3 text-xs text-slate-200 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[11px] uppercase tracking-wide text-indigo-200/80">JSX</div>
                  <pre className="mt-2 whitespace-pre-wrap font-mono">
                    <code>{`<div className="relative">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-emerald-400" />
  <div className="relative bg-white/10 backdrop-blur-lg p-6">
    玻璃態內容
  </div>
</div>`}</code>
                  </pre>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                  <div className="text-[11px] uppercase tracking-wide text-indigo-200/80">提示</div>
                  <ul className="mt-2 space-y-2">
                    <li>保持一些透明度，才能看到模糊效果。</li>
                    <li>搭配 border / shadow 讓卡片邊界更清晰。</li>
                    <li>背景可以是圖片、漸層或其他元件皆可。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Index;
