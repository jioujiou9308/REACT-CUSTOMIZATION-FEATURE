import { useState } from "react";
import Pattern1NoDebounce from "./pattern1-no-debounce";
import Pattern2WithDebounce from "./pattern2-with-debounce";

export default function HookDebounceComparison() {
  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <h1 className="text-center mb-3 text-3xl font-bold">🎯 Hook Debounce 模式比較</h1>
      <p className="text-center text-gray-600 text-lg mb-8">為什麼模式 1 無法實現 debounce，而模式 2 可以？</p>

      {/* 核心概念說明 */}
      <div className="mb-8 p-5 bg-gray-50 rounded-lg border-2 border-gray-300">
        <h2 className="mt-0 text-2xl font-bold">💡 核心概念</h2>

        <div className="grid grid-cols-2 gap-5">
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-400">
            <h3 className="mt-0 text-red-700 text-xl font-bold">❌ 模式 1: 直接傳入資料</h3>
            <div className="font-mono text-sm bg-white p-3 rounded mb-3">
              <div>const hook = useHook(data);</div>
              <div className="text-gray-400">// data 改變 → 立即觸發</div>
            </div>
            <ul className="text-sm leading-relaxed my-3 pl-5 list-disc">
              <li>
                Hook <strong>被動接收</strong>資料
              </li>
              <li>無法控制執行時機</li>
              <li>每次資料改變都會觸發 useEffect</li>
              <li>
                <strong>無法實現 debounce</strong>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-400">
            <h3 className="mt-0 text-green-700 text-xl font-bold">✅ 模式 2: 回傳函數</h3>
            <div className="font-mono text-sm bg-white p-3 rounded mb-3">
              <div>const &#123;fn&#125; = useHook();</div>
              <div>fn(data, delay);</div>
              <div className="text-gray-400">// 可以延遲、取消執行</div>
            </div>
            <ul className="text-sm leading-relaxed my-3 pl-5 list-disc">
              <li>
                Hook <strong>主動控制</strong>執行
              </li>
              <li>可以延遲或取消執行</li>
              <li>內部管理 timer 和狀態</li>
              <li>
                <strong>可以實現 debounce</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 p-4 bg-yellow-50 rounded-lg border border-yellow-400">
          <h4 className="mt-0 text-lg font-bold">🔑 關鍵差異</h4>
          <p className="my-1 text-base">
            <strong>Debounce 需要「取消上一次的執行」</strong>，但模式 1 中，每次資料改變都會觸發新的
            useEffect，你無法在 Hook 內部阻止外部的資料傳入。而模式 2 中，函數內部完全控制何時真正執行 API 呼叫。
          </p>
        </div>
      </div>

      {/* 實際範例對比 */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <Pattern1NoDebounce />
        <Pattern2WithDebounce />
      </div>

      {/* 使用時機建議 */}
      <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-600">
        <h2 className="mt-0 text-2xl font-bold">📋 使用時機建議</h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="text-red-700 text-xl font-bold">❌ 何時避免模式 1</h3>
            <ul className="leading-loose list-disc pl-5">
              <li>需要 debounce 或 throttle</li>
              <li>需要控制執行時機</li>
              <li>需要取消進行中的操作</li>
              <li>高頻率的資料更新（如輸入框）</li>
            </ul>
          </div>

          <div>
            <h3 className="text-green-700 text-xl font-bold">✅ 何時使用模式 2</h3>
            <ul className="leading-loose list-disc pl-5">
              <li>搜尋框、自動完成</li>
              <li>表單驗證（需要延遲）</li>
              <li>API 呼叫優化</li>
              <li>需要精確控制執行時機的場景</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 程式碼對比 */}
      <div className="mt-8 p-5 bg-gray-50 rounded-lg">
        <h2 className="mt-0 text-2xl font-bold">📝 程式碼實作對比</h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="text-red-700 text-xl font-bold">❌ 模式 1 實作</h3>
            <pre className="bg-white p-4 rounded-lg overflow-auto text-xs leading-normal">
              {`function useValidation(data) {
  const [result, setResult] = useState(null);
  
  useEffect(() => {
    // ❌ 每次 data 改變立即執行
    // 無法延遲或取消
    validateAPI(data).then(setResult);
  }, [data]);
  
  return result;
}

// 使用
const data = watch("field");
const result = useValidation(data);
// 每次 data 改變都觸發 API`}
            </pre>
          </div>

          <div>
            <h3 className="text-green-700 text-xl font-bold">✅ 模式 2 實作</h3>
            <pre className="bg-white p-4 rounded-lg overflow-auto text-xs leading-normal">
              {`function useValidation() {
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);
  
  const validate = (data, delay = 500) => {
    // ✅ 清除上次的 timer
    clearTimeout(timerRef.current);
    
    // ✅ 設定新的延遲執行
    timerRef.current = setTimeout(() => {
      validateAPI(data).then(setResult);
    }, delay);
  };
  
  return { validate, result };
}

// 使用
const { validate } = useValidation();
useEffect(() => {
  validate(data, 800); // 可控制延遲
}, [data]);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
