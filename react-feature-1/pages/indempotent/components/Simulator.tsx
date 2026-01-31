import { useMemo, useState } from "react";

type RequestLog = {
  id: string;
  attempt: number;
  amount: number;
  key?: string;
  applied: boolean;
  note: string;
  scenario: "non" | "idempotent";
};

type NonIdempotentState = {
  balance: number;
  appliedCount: number;
  logs: RequestLog[];
};

type IdempotentState = NonIdempotentState & {
  processedKeys: Record<string, { amount: number; appliedAt: string }>;
};

const RETRIES = 3;
const INITIAL_BALANCE = 1000;

export function Simulator() {
  const [amount, setAmount] = useState<number>(120);
  const [idempotencyKey, setIdempotencyKey] = useState("charge-001");

  const [withoutIdempotent, setWithoutIdempotent] = useState<NonIdempotentState>({
    balance: INITIAL_BALANCE,
    appliedCount: 0,
    logs: [],
  });

  const [withIdempotent, setWithIdempotent] = useState<IdempotentState>({
    balance: INITIAL_BALANCE,
    appliedCount: 0,
    processedKeys: {},
    logs: [],
  });

  const formattedAmount = useMemo(() => Math.max(0, Math.round(amount)), [amount]);
  const processedKeyCount = useMemo(
    () => Object.keys(withIdempotent.processedKeys).length,
    [withIdempotent.processedKeys],
  );

  const simulateNonIdempotent = () => {
    const attempts: RequestLog[] = Array.from({ length: RETRIES }, (_, idx) => ({
      id: `${Date.now()}-non-${idx}`,
      attempt: idx + 1,
      amount: formattedAmount,
      applied: true,
      note: "沒有 idempotency → 每次重試都重新扣款。",
      scenario: "non",
    }));

    setWithoutIdempotent((prev) => ({
      balance: prev.balance - formattedAmount * RETRIES,
      appliedCount: prev.appliedCount + RETRIES,
      logs: [...attempts, ...prev.logs].slice(0, 18),
    }));
  };

  const simulateIdempotent = () => {
    setWithIdempotent((prev) => {
      const hasProcessed = Boolean(prev.processedKeys[idempotencyKey]);
      const newLogs: RequestLog[] = Array.from({ length: RETRIES }, (_, idx) => {
        const applied = !hasProcessed && idx === 0;
        return {
          id: `${Date.now()}-id-${idx}`,
          attempt: idx + 1,
          amount: formattedAmount,
          key: idempotencyKey,
          applied,
          note: applied
            ? "第一次看到這個 key → 正常扣款並緩存結果。"
            : "相同 key 的重試 → 直接回傳第一次結果，不再扣款。",
          scenario: "idempotent",
        };
      });

      const nextProcessed = hasProcessed
        ? prev.processedKeys
        : {
            ...prev.processedKeys,
            [idempotencyKey]: { amount: formattedAmount, appliedAt: new Date().toLocaleTimeString() },
          };

      return {
        balance: prev.balance - (!hasProcessed ? formattedAmount : 0),
        appliedCount: prev.appliedCount + (!hasProcessed ? 1 : 0),
        processedKeys: nextProcessed,
        logs: [...newLogs, ...prev.logs].slice(0, 18),
      };
    });
  };

  const resetAll = () => {
    setWithoutIdempotent({ balance: INITIAL_BALANCE, appliedCount: 0, logs: [] });
    setWithIdempotent({ balance: INITIAL_BALANCE, appliedCount: 0, processedKeys: {}, logs: [] });
  };

  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-900/40 backdrop-blur">
      {/* //* 重製實驗 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-50">互動示範：重試 {RETRIES} 次</h2>
          <p className="text-sm text-slate-300">
            模擬「扣款」這種非等冪操作：沒有 key 時每次重試都扣款；有 Idempotency-Key 時，同一 key
            只會扣一次，其餘重試回傳快取結果。
          </p>
        </div>
        <button
          onClick={resetAll}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-100"
          type="button"
        >
          重置實驗
        </button>
      </div>
      {/* //*金額and key欄位 */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <span className="text-sm font-semibold text-slate-200">扣款金額</span>
          <input
            type="number"
            min={0}
            step={10}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-cyan-500/40 focus:border-cyan-400 focus:ring"
          />
          <span className="text-xs text-slate-400">
            重試 {RETRIES} 次時，無等冪會扣 {formattedAmount * RETRIES}，有等冪只扣 {formattedAmount}。
          </span>
        </label>

        <label className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 md:col-span-2">
          <span className="text-sm font-semibold text-slate-200">Idempotency-Key（相同 key 才能抵擋重試）</span>
          <input
            type="text"
            value={idempotencyKey}
            onChange={(e) => setIdempotencyKey(e.target.value.trim())}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-emerald-500/40 focus:border-emerald-400 focus:ring"
            placeholder="例如：charge-001"
          />
          <span className="text-xs text-slate-400">換一個 key（例如 charge-002）會視為全新請求，依然只扣一次。</span>
        </label>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* //*無等冪 */}
        <div className="group relative overflow-hidden rounded-3xl border border-rose-600/50 bg-gradient-to-br from-rose-900/60 via-slate-900 to-slate-950 p-5 shadow-xl shadow-rose-900/40">
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-rose-100">
              無等冪（沒 key）
            </div>
            <div className="text-xs text-rose-100/80">每次重試都會扣款</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-100">
            <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3">
              <div className="text-xs uppercase text-rose-100/70">餘額</div>
              <div className="text-2xl font-semibold">NT$ {withoutIdempotent.balance}</div>
            </div>
            <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-4 py-3">
              <div className="text-xs uppercase text-rose-100/70">成功扣款次數</div>
              <div className="text-2xl font-semibold">{withoutIdempotent.appliedCount}</div>
            </div>
            <button
              onClick={simulateNonIdempotent}
              className="ml-auto inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-900/40"
              type="button"
            >
              模擬重試 {RETRIES} 次
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-100">
            {withoutIdempotent.logs.length === 0 && (
              <div className="rounded-xl border border-rose-500/30 bg-slate-900/60 p-3 text-rose-100/80">
                尚無紀錄，試著點「模擬重試」看看。
              </div>
            )}
            {withoutIdempotent.logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-slate-950/70 p-3 transition duration-150 hover:border-rose-400/60 hover:bg-rose-900/20"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow shadow-rose-900/60" />
                <div className="space-y-0.5">
                  <div className="text-xs uppercase text-rose-100/70">重試 #{log.attempt}</div>
                  <div className="font-semibold">扣款 NT$ {log.amount}</div>
                  <div className="text-xs text-rose-100/80">{log.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* //*有等冪 */}
        <div className="group relative overflow-hidden rounded-3xl border border-emerald-500/50 bg-gradient-to-br from-emerald-900/60 via-slate-900 to-slate-950 p-5 shadow-xl shadow-emerald-900/40">
          <div className="mb-3 flex items-center gap-2">
            <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-50">
              有等冪（Idempotency-Key）
            </div>
            <div className="text-xs text-emerald-100/80">相同 key 重試只扣一次</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-100">
            <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
              <div className="text-xs uppercase text-emerald-100/70">餘額</div>
              <div className="text-2xl font-semibold">NT$ {withIdempotent.balance}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
              <div className="text-xs uppercase text-emerald-100/70">成功扣款次數</div>
              <div className="text-2xl font-semibold">{withIdempotent.appliedCount}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
              <div className="text-xs uppercase text-emerald-100/70">已處理的 key</div>
              <div className="text-2xl font-semibold">{processedKeyCount}</div>
            </div>
            <button
              onClick={simulateIdempotent}
              className="ml-auto inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/40"
              type="button"
            >
              模擬重試 {RETRIES} 次
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-100">
            {withIdempotent.logs.length === 0 && (
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900/60 p-3 text-emerald-100/80">
                尚無紀錄，點按「模擬重試」觀察等冪效果。
              </div>
            )}
            {withIdempotent.logs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 rounded-2xl border bg-slate-950/70 p-3 transition duration-150 hover:-translate-y-0.5 ${
                  log.applied
                    ? "border-emerald-400/70 hover:border-emerald-300/80 hover:bg-emerald-900/25"
                    : "border-emerald-500/30 hover:border-emerald-300/50 hover:bg-emerald-900/20"
                }`}
              >
                <div
                  className={`mt-0.5 h-2 w-2 shrink-0 rounded-full shadow ${log.applied ? "bg-emerald-300 shadow-emerald-900/60" : "bg-emerald-500/60 shadow-emerald-900/60"}`}
                />
                <div className="space-y-0.5">
                  <div className="text-xs uppercase text-emerald-100/70">重試 #{log.attempt}</div>
                  <div className="font-semibold">
                    {log.applied ? "扣款" : "重複請求"} NT$ {log.amount}{" "}
                    <span className="text-xs text-emerald-200">key: {log.key}</span>
                  </div>
                  <div className="text-xs text-emerald-100/80">{log.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
