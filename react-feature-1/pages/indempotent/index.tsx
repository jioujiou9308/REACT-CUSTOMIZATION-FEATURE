import { Space_Grotesk } from "@next/font/google";
import { BackendNotes } from "./components/BackendNotes";
import { InfoCards } from "./components/InfoCards";
import { Simulator } from "./components/Simulator";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function IdempotentDemo() {
  return (
    <div className={`${spaceGrotesk.className} relative min-h-screen overflow-hidden bg-slate-950 text-slate-50`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(59,130,246,0.15), transparent 35%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.18), transparent 30%), radial-gradient(circle at 50% 80%, rgba(94,234,212,0.15), transparent 35%)",
        }}
      />

      <main className="relative mx-auto max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">Idempotent (等冪) 概念</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-50 md:text-5xl">
          重複執行也不會改變結果：什麼是 idempotent？
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          「同一個操作被執行一次或 N 次，對系統的最終狀態都應相同」就是 idempotent。GET / PUT / DELETE 天生等冪；
          POST 等副作用操作則常需要「Idempotency-Key」來保護重試不會重複扣款或重複建立資料。
        </p>

        <InfoCards />
        <Simulator />
        <BackendNotes />
      </main>
    </div>
  );
}
