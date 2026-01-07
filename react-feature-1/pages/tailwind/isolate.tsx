import React from "react";

const tips = [
  "遇到 mix-blend-mode / backdrop-filter 時，避免影響父層或同層元素。",
  "建立新的 stacking context，讓 z-index、濾鏡、混色侷限在該卡片內。",
  "搭配半透明背景或玻璃態卡片時，很常會順手加上 isolate。",
];

const codeSample = `<div className="relative isolate rounded-2xl bg-white/10 backdrop-blur">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-emerald-400/40 mix-blend-screen blur-3xl" />
  <div className="relative p-6">
    內容...
  </div>
</div>`;

const IsolatePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/80">Tailwind Utility</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">isolate：為元素開一個獨立的混色 / 堆疊環境</h1>
          <p className="max-w-3xl text-slate-300">
            Tailwind 的 <code className="font-semibold text-emerald-200">isolate</code> 會將元素的 CSS isolation 設為
            isolate，強制產生新的 stacking context。這能避免 mix-blend-mode、filter 或 backdrop-filter 的效果
            蔓延到父層與同層，使特殊效果被關在自己的卡片裡。
          </p>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-mono text-emerald-100 shadow-lg shadow-emerald-500/10">
            <span className="rounded-md bg-emerald-500/20 px-2 py-1 text-xs uppercase tracking-wide text-emerald-50">
              class
            </span>
            <code>className="isolate ..."</code>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-900/40">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.2),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_40%_90%,rgba(236,72,153,0.2),transparent_40%)]" />
            </div>
            <div className="relative flex flex-col gap-4 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">用途</p>
              <ul className="space-y-2 text-slate-200">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-900/40">
            <div className="absolute inset-0">
              <div className="absolute -left-8 top-10 h-44 w-44 rounded-full bg-emerald-500/25 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-400/25 blur-3xl" />
            </div>
            <div className="relative p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">典型寫法</p>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-slate-900/60 p-4 font-mono text-sm text-emerald-50">
                <code>{codeSample}</code>
              </pre>
              <p className="mt-3 text-slate-200">
                關鍵在容器直接加上 isolate，並把混色、模糊、彩色光暈之類的效果
                放到容器內部。這樣效果就不會跑到父層或兄弟元素上。
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-900/40">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(52,211,153,0.15),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(45,212,191,0.18),transparent_35%),radial-gradient(circle_at_40%_90%,rgba(59,130,246,0.18),transparent_45%)]" />
          </div>
          <div className="relative grid gap-6 p-6 lg:grid-cols-2 lg:p-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/90">對比示例</p>
              <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">無 isolate vs isolate</h2>
              <p className="text-slate-200">
                父層使用格線背景以便觀察混色。左邊卡片的光暈會把外部格線整片提亮，代表混色影響到父層；右邊加上 isolate
                並保持卡片背景，光暈只在卡片內混色，外部格線顏色不變。
              </p>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-emerald-100">
                留意：關鍵在卡片透明並使用 mix-blend-mode 時，isolate 才有抑制外溢的效果。
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-emerald-900/30">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
                <div className="relative h-48 rounded-xl bg-transparent p-3 ">
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-100">未使用 isolate</div>
                  <div className="absolute inset-[-12%] rounded-2xl bg-gradient-to-br from-emerald-400/70 via-sky-400/60 to-indigo-400/70 mix-blend-screen blur-3xl" />
                  <p className="relative mt-24 text-sm text-slate-100 drop-shadow">外部格線被整片提亮</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-emerald-900/30">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
                <div className="relative isolate h-48 rounded-xl bg-slate-950/70 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-100">使用 isolate</div>
                  <div className="absolute inset-[-12%] rounded-2xl bg-gradient-to-br from-emerald-400/70 via-sky-400/60 to-indigo-400/70 mix-blend-screen blur-3xl" />
                  <p className="relative mt-24 text-sm text-slate-100 drop-shadow">混色鎖在卡片內，外部格線顏色維持</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default IsolatePage;
