import { useState, useEffect } from "react";

// ❌ 模式 1: 直接傳入資料 - 無法實現 debounce
function useAddressValidationPattern1(addressData: string) {
  const [result, setResult] = useState<string | null>(null);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!addressData) {
      setResult(null);
      return;
    }

    // 每次 addressData 改變就立即執行
    setLoading(true);
    setApiCallCount((prev) => prev + 1);

    // 模擬 API 呼叫
    const simulateAPI = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const isPOBox = addressData.toLowerCase().includes("po box");
      setResult(isPOBox ? "⚠️ 這是 PO Box 地址" : "✅ 有效地址");
      setLoading(false);
    };

    simulateAPI();
  }, [addressData]); // 每次 addressData 改變都會觸發

  return { result, apiCallCount, loading };
}

export default function Pattern1NoDebounce() {
  const [address, setAddress] = useState("");
  const { result, apiCallCount, loading } = useAddressValidationPattern1(address);

  return (
    <div className="p-5 border-2 border-red-400 rounded-lg bg-red-50">
      <h2 className="text-xl font-bold">❌ 模式 1: 直接傳入資料（無法 debounce）</h2>

      <div className="mt-4">
        <label className="block mb-1 font-bold">輸入地址：</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="試著輸入 '123 Main St' 或 'PO Box 456'"
          className="w-full p-2.5 text-base border-2 border-gray-300 rounded"
        />
      </div>

      <div className="mt-4 p-4 bg-white rounded border border-gray-300">
        <div className="mb-2.5">
          <strong>API 呼叫次數：</strong>
          <span className="text-2xl text-red-400 ml-2.5 font-bold">{apiCallCount}</span>
        </div>

        <div className="mb-2.5">
          <strong>狀態：</strong>
          <span className="ml-2.5">{loading ? "⏳ 驗證中..." : "✓ 完成"}</span>
        </div>

        {result && (
          <div className={`mt-2.5 p-2.5 rounded ${result.includes("⚠️") ? "bg-yellow-100" : "bg-green-100"}`}>
            <strong>驗證結果：</strong> {result}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-red-100 rounded">
        <h3 className="mt-0 text-red-700 text-lg font-bold">❌ 問題：</h3>
        <ul className="leading-loose my-2.5 list-disc pl-5">
          <li>每打一個字就觸發一次 API 呼叫</li>
          <li>
            輸入 "123 Main St" 會呼叫 <strong>12 次</strong> API
          </li>
          <li>Hook 內部無法控制「何時」執行驗證</li>
          <li>
            <code>useEffect</code> 依賴 <code>addressData</code>，無法延遲或取消
          </li>
        </ul>

        <div className="mt-2.5 p-2.5 bg-white rounded font-mono text-sm">
          <div className="text-gray-600 mb-1">// Hook 內部的 useEffect</div>
          <div>useEffect(() =&gt; &#123;</div>
          <div className="pl-5">validateAPI(addressData); // 立即執行</div>
          <div>&#125;, [addressData]); // 每次改變都觸發</div>
        </div>
      </div>
    </div>
  );
}
