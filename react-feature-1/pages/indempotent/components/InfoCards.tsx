export function InfoCards() {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-cyan-900/30">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">特性</div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>· 對同一資源重複操作 → 狀態不變</li>
          <li>· 可安全重試，避免重複扣款 / 建檔</li>
          <li>· 常用在 API、Message Queue、支付請求</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-cyan-900/30">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">常見等冪</div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-100">GET</span> 讀取，不改狀態
          </li>
          <li>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-100">PUT</span> 覆蓋資源，多次相同更新結果一致
          </li>
          <li>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-100">DELETE</span> 已刪除再刪也不變
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-cyan-900/30">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">非等冪 & 風險</div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>
            <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-rose-100">POST</span> 建立 / 扣款：重試可能重複新增
          </li>
          <li>重複扣款、重複寄送、重複下單</li>
          <li>需要「Idempotency-Key」或「唯一序號」保護</li>
        </ul>
      </div>
    </section>
  );
}
