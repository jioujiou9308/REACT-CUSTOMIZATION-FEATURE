import { useState, useCallback, useRef } from "react";

// ✅ 模式 2: 回傳函數 - 可以實現 debounce
function useAddressValidationPattern2() {
  const [result, setResult] = useState<string | null>(null);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const validateAddress = useCallback((addressData: string, debounceMs = 500) => {
    if (!addressData) {
      setResult(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 清除之前的 timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 設定新的 timer，延遲執行
    debounceTimerRef.current = setTimeout(async () => {
      // 只有在 debounceMs 後才真正呼叫 API
      setApiCallCount((prev) => prev + 1);

      // 模擬 API 呼叫
      await new Promise((resolve) => setTimeout(resolve, 300));
      const isPOBox = addressData.toLowerCase().includes("po box");
      setResult(isPOBox ? "⚠️ 這是 PO Box 地址" : "✅ 有效地址");
      setLoading(false);
    }, debounceMs);
  }, []);

  return { validateAddress, result, apiCallCount, loading };
}

export default function Pattern2WithDebounce() {
  const [address, setAddress] = useState("");
  const { validateAddress, result, apiCallCount, loading } = useAddressValidationPattern2();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    validateAddress(value, 800); // 每次呼叫都會重設 timer
  };

  return (
    <div className="p-5 border-2 border-green-400 rounded-lg bg-green-50">
      <h2 className="text-xl font-bold">✅ 模式 2: 回傳函數（可以 debounce）</h2>

      <div className="mt-4">
        <label className="block mb-1 font-bold">輸入地址：</label>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="試著輸入 '123 Main St' 或 'PO Box 456'"
          className="w-full p-2.5 text-base border-2 border-gray-300 rounded"
        />
        <div className="text-xs text-gray-600 mt-1">⏱️ Debounce 延遲: 800ms</div>
      </div>

      <div className="mt-4 p-4 bg-white rounded border border-gray-300">
        <div className="mb-2.5">
          <strong>API 呼叫次數：</strong>
          <span className="text-2xl text-green-600 ml-2.5 font-bold">{apiCallCount}</span>
        </div>

        <div className="mb-2.5">
          <strong>狀態：</strong>
          <span className="ml-2.5">{loading ? "⏳ 等待輸入完成..." : "✓ 完成"}</span>
        </div>

        {result && (
          <div className={`mt-2.5 p-2.5 rounded ${result.includes("⚠️") ? "bg-yellow-100" : "bg-green-100"}`}>
            <strong>驗證結果：</strong> {result}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-green-100 rounded">
        <h3 className="mt-0 text-green-700 text-lg font-bold">✅ 優點：</h3>
        <ul className="leading-loose my-2.5 list-disc pl-5">
          <li>使用者停止輸入 800ms 後才呼叫 API</li>
          <li>
            輸入 "123 Main St" 只會呼叫 <strong>1 次</strong> API
          </li>
          <li>Hook 內部完全控制執行時機</li>
          <li>可以清除上一次的 timer，避免不必要的呼叫</li>
        </ul>

        <div className="mt-2.5 p-2.5 bg-white rounded font-mono text-sm">
          <div className="text-gray-600 mb-1">// Hook 內部的實作</div>
          <div>const validateAddress = (data, delay) =&gt; &#123;</div>
          <div className="pl-5">clearTimeout(timer); // 清除上次</div>
          <div className="pl-5">timer = setTimeout(() =&gt; &#123;</div>
          <div className="pl-10">validateAPI(data); // 延遲執行</div>
          <div className="pl-5">&#125;, delay);</div>
          <div>&#125;;</div>
        </div>
      </div>
    </div>
  );
}
