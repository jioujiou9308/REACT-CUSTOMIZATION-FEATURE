type BackendNotesProps = {
  exampleKey?: string;
  amount?: number;
};

export function BackendNotes({ exampleKey = "charge-001", amount = 120 }: BackendNotesProps) {
  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-cyan-900/30">
        <h3 className="text-xl font-semibold text-slate-50">後端如何實作 Idempotency-Key？</h3>
        <p className="mt-3 text-sm text-slate-300">
          後端常用「請求唯一鍵」去除重複：收到請求時先檢查 key 是否處理過，有則回傳之前結果；沒有則執行一次、緩存結果並標記 key。
          這讓客戶端可以安全重試，不怕超時或連線中斷。
        </p>
        <pre className="mt-4 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm leading-relaxed text-slate-100">
{`POST /api/charge
Idempotency-Key: ${exampleKey}
Body: { "orderId": "o-789", "amount": ${amount} }

// 伺服器邏輯 (示意)
if (cache.has(Idempotency-Key)) {
  return cache.get(Idempotency-Key);     // 直接回傳之前的結果
}
const result = createCharge(body);       // 只扣一次款
cache.set(Idempotency-Key, result);      // 緩存結果
return result;`}
        </pre>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-cyan-900/30">
        <h3 className="text-xl font-semibold text-slate-50">什麼時候需要等冪保護？</h3>
        <ul className="mt-3 space-y-3 text-sm text-slate-200">
          <li>
            <span className="font-semibold text-emerald-200">支付 / 轉帳：</span> 防止網路重試造成重複扣款或重複下單。
          </li>
          <li>
            <span className="font-semibold text-emerald-200">佇列 / webhook：</span> 接收到重複事件時只執行一次。
          </li>
          <li>
            <span className="font-semibold text-emerald-200">檔案上傳：</span> 以檔案雜湊或 key 確保重傳不會建立多份副本。
          </li>
          <li>
            <span className="font-semibold text-emerald-200">資料修正腳本：</span> 重複跑也不會越改越多或產生重複資料列。
          </li>
        </ul>
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">重點</div>
          <p className="mt-1">
            等冪不代表「沒有副作用」，而是「副作用的最終狀態可重複」。對非等冪操作，加上 Idempotency-Key 或唯一序號是最簡單、最安全的防禦。
          </p>
        </div>
      </div>
    </section>
  );
}
