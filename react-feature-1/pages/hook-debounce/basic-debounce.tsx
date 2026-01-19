import { useState, useEffect, useRef } from "react";

// 基本的 useDebounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 設定延遲執行的 timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函數：當 value 或 delay 改變時，清除上一個 timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const BasicDebounce = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  // 使用 debounce hook，延遲 500ms
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // 當 debouncedSearchTerm 改變時才執行搜尋
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount((prev) => prev + 1);
      console.log("執行搜尋:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎯 基本 Debounce Hook 用法</h1>

      <div className="mb-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
        <h2 className="text-xl font-bold mb-4">什麼是 Debounce？</h2>
        <p className="mb-3 leading-relaxed">
          Debounce 是一種延遲執行的技術，只有在使用者停止輸入一段時間後才會執行函數。
          這可以避免在使用者快速輸入時觸發過多的 API 呼叫或計算。
        </p>
        <div className="bg-white p-4 rounded">
          <div className="font-mono text-sm">
            <div className="text-gray-600">// 使用方式</div>
            <div>const debouncedValue = useDebounce(value, 500);</div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-6 bg-white rounded-lg border-2 border-gray-300">
        <h2 className="text-xl font-bold mb-4">互動範例</h2>

        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">輸入搜尋關鍵字：</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="試著快速輸入文字..."
            className="w-full p-3 text-base border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <p className="text-sm text-gray-500 mt-2">⏱️ 延遲 500ms 後才會觸發搜尋</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-sm text-gray-600 mb-1">即時輸入值</div>
            <div className="text-lg font-mono break-all">
              {inputValue || <span className="text-gray-400">（空）</span>}
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded">
            <div className="text-sm text-gray-600 mb-1">Debounced 值</div>
            <div className="text-lg font-mono break-all">
              {debouncedSearchTerm || <span className="text-gray-400">（空）</span>}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
          <div className="flex items-center justify-between">
            <span className="font-bold">搜尋執行次數：</span>
            <span className="text-2xl font-bold text-yellow-700">{searchCount}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">💡 如果沒有 debounce，每打一個字就會執行一次搜尋</p>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold mb-4">📝 Hook 實作程式碼</h2>
        <pre className="bg-white p-4 rounded border border-gray-300 overflow-auto text-sm leading-relaxed">
          {`function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 設定延遲執行的 timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清理函數：當 value 改變時，清除上一個 timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`}
        </pre>

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-bold mb-2">🔑 運作原理</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
            <li>
              當 <code className="bg-white px-1 rounded">value</code> 改變時，設定一個新的 timer
            </li>
            <li>
              如果在 <code className="bg-white px-1 rounded">delay</code> 時間內{" "}
              <code className="bg-white px-1 rounded">value</code> 又改變了，清除舊的 timer
            </li>
            <li>
              只有當使用者停止改變 <code className="bg-white px-1 rounded">value</code> 超過{" "}
              <code className="bg-white px-1 rounded">delay</code> 時間，才會更新{" "}
              <code className="bg-white px-1 rounded">debouncedValue</code>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-300">
        <h2 className="text-xl font-bold mb-3 text-green-800">✅ 常見使用場景</h2>
        <ul className="list-disc pl-5 space-y-2 leading-relaxed">
          <li>
            <strong>搜尋框</strong>：等使用者輸入完成後才發送搜尋請求
          </li>
          <li>
            <strong>自動儲存</strong>：編輯器內容改變後延遲儲存
          </li>
          <li>
            <strong>視窗大小調整</strong>：resize 事件的處理
          </li>
          <li>
            <strong>表單驗證</strong>：輸入完成後才驗證
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicDebounce;
