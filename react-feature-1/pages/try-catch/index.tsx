import React, { useState } from "react";

const TryCatchExample = () => {
  const [result, setResult] = useState<string>("");
  const [errorInfo, setErrorInfo] = useState<any>(null);

  // 範例 1: 基本 try-catch
  const basicTryCatch = () => {
    try {
      setResult("執行中...");
      setErrorInfo(null);

      // 故意製造錯誤
      const data: any = null;
      console.log(data.property); // 會拋出 TypeError

      setResult("成功執行");
    } catch (error) {
      // error 是捕獲到的錯誤物件
      setResult("捕獲到錯誤!");
      setErrorInfo({
        type: "基本錯誤捕獲",
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack : undefined,
        原始錯誤物件: error,
      });
    }
  };

  // 範例 2: throw new Error vs error 的差異
  const throwErrorExample = () => {
    try {
      setResult("執行中...");
      setErrorInfo(null);

      const shouldFail = true;

      if (shouldFail) {
        // throw new Error: 創建並拋出一個新的 Error 物件
        // 可以自訂錯誤訊息,會包含 stack trace
        throw new Error("這是使用 throw new Error 拋出的自訂錯誤訊息");
      }

      setResult("成功執行");
    } catch (error) {
      // 這裡的 error 是被拋出的 Error 物件
      setResult("捕獲到自訂錯誤!");
      setErrorInfo({
        type: "throw new Error 範例",
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : "Unknown",
        stack: error instanceof Error ? error.stack?.split("\n").slice(0, 3).join("\n") : undefined,
        說明: "throw new Error 會創建包含 message, name, stack 的完整錯誤物件",
      });
    }
  };

  // 範例 3: 直接 throw 其他值
  const throwValueExample = () => {
    try {
      setResult("執行中...");
      setErrorInfo(null);

      // 可以 throw 任何值,不一定要是 Error 物件
      throw "這只是一個字串錯誤"; // 不推薦這樣做
    } catch (error) {
      // error 可能不是 Error 物件,所以需要檢查
      setResult("捕獲到非標準錯誤!");
      setErrorInfo({
        type: "throw 字串值",
        message: String(error),
        isErrorObject: error instanceof Error,
        說明: "直接 throw 字串不會有 stack trace,不推薦使用",
      });
    }
  };

  // 範例 4: API 呼叫錯誤處理
  const apiCallExample = async () => {
    try {
      setResult("API 呼叫中...");
      setErrorInfo(null);

      // 模擬 API 呼叫
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/999999");

      // 檢查 HTTP 狀態碼
      if (!response.ok) {
        // 拋出包含狀態碼的錯誤
        throw new Error(`HTTP Error~~~: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult("API 呼叫成功!");
      setErrorInfo({
        type: "API 成功回應",
        data: data,
      });
    } catch (error) {
      console.log("error in api❤️❤️", error);

      setResult("API 呼叫失敗!");

      // 判斷錯誤類型
      if (error instanceof TypeError) {
        // 網路錯誤或 CORS 問題
        setErrorInfo({
          type: "網路錯誤",
          message: "無法連接到伺服器,可能是網路問題或 CORS 設定錯誤",
          原始訊息: error.message,
          錯誤名稱: error.name,
        });
      } else if (error instanceof Error) {
        // 其他 Error 物件
        setErrorInfo({
          type: "API 錯誤",
          message: error.message,
          錯誤名稱: error.name,
          stack: error.stack?.split("\n").slice(0, 3).join("\n"),
        });
      } else {
        // 未知錯誤
        setErrorInfo({
          type: "未知錯誤",
          message: String(error),
        });
      }
    }
  };

  // 範例 5: 完整的 API 錯誤處理(包含後端錯誤訊息)
  const completeApiExample = async () => {
    try {
      setResult("完整 API 呼叫中...");
      setErrorInfo(null);

      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

      if (!response.ok) {
        // 嘗試解析後端回傳的錯誤訊息
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // 如果無法解析 JSON,使用預設訊息
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setResult("API 呼叫成功!");
      setErrorInfo({
        type: "成功回應",
        data: data,
      });
    } catch (error) {
      setResult("API 呼叫失敗!");

      setErrorInfo({
        type: "完整錯誤處理",
        錯誤類型: error instanceof Error ? error.constructor.name : typeof error,
        錯誤訊息: error instanceof Error ? error.message : String(error),
        是否為Error物件: error instanceof Error,
        建議處理方式: "根據錯誤類型顯示對應的使用者友善訊息",
      });
    }
  };

  // 範例 6: finally 的使用
  const finallyExample = async () => {
    let isLoading = true;

    try {
      setResult("執行中...");
      setErrorInfo(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      throw new Error("模擬錯誤");
    } catch (error) {
      setResult("發生錯誤!");
      setErrorInfo({
        type: "finally 範例",
        message: error instanceof Error ? error.message : String(error),
        說明: "finally 區塊無論成功或失敗都會執行",
      });
    } finally {
      // 無論成功或失敗都會執行
      isLoading = false;
      console.log("finally 區塊執行了,isLoading:", isLoading);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Try-Catch 錯誤處理範例</h1>

      <div style={{ marginBottom: "30px" }}>
        <h2>🔍 重要概念說明</h2>
        <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "5px" }}>
          <h3>throw new Error vs error 的差異:</h3>
          <ul>
            <li>
              <strong>throw new Error("訊息")</strong>: 創建並拋出一個新的 Error 物件
              <ul>
                <li>包含 message (錯誤訊息)</li>
                <li>包含 name (錯誤類型,預設是 "Error")</li>
                <li>包含 stack (堆疊追蹤,用於除錯)</li>
                <li>可以被 instanceof Error 檢測</li>
              </ul>
            </li>
            <li>
              <strong>error</strong>: catch 區塊中捕獲到的錯誤物件
              <ul>
                <li>可能是 Error 物件</li>
                <li>可能是任何被 throw 的值(字串、數字、物件等)</li>
                <li>需要用 instanceof Error 檢查類型</li>
              </ul>
            </li>
          </ul>

          <h3>常見錯誤類型:</h3>
          <ul>
            <li>
              <strong>Error</strong>: 通用錯誤
            </li>
            <li>
              <strong>TypeError</strong>: 類型錯誤(如存取 null 的屬性)
            </li>
            <li>
              <strong>ReferenceError</strong>: 引用錯誤(如使用未定義的變數)
            </li>
            <li>
              <strong>SyntaxError</strong>: 語法錯誤
            </li>
            <li>
              <strong>RangeError</strong>: 範圍錯誤
            </li>
          </ul>

          <h3>API 錯誤訊息格式建議:</h3>
          <pre style={{ backgroundColor: "#fff", padding: "10px", overflow: "auto" }}>
            {`// 後端應回傳的錯誤格式
{
  "error": "錯誤類型",
  "message": "使用者友善的錯誤訊息",
  "statusCode": 400,
  "details": { /* 詳細資訊 */ }
}

// 前端錯誤處理範例
try {
  const res = await fetch('/api/endpoint');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || '請求失敗');
  }
  const data = await res.json();
} catch (error) {
  if (error instanceof Error) {
    console.error('錯誤:', error.message);
    // 顯示給使用者
  }
}`}
          </pre>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={basicTryCatch} style={buttonStyle}>
          1. 基本 Try-Catch
        </button>
        <button onClick={throwErrorExample} style={buttonStyle}>
          2. Throw New Error
        </button>
        <button onClick={throwValueExample} style={buttonStyle}>
          3. Throw 字串值
        </button>
        <button onClick={apiCallExample} style={buttonStyle}>
          4. API 呼叫錯誤
        </button>
        <button onClick={completeApiExample} style={buttonStyle}>
          5. 完整 API 處理
        </button>
        <button onClick={finallyExample} style={buttonStyle}>
          6. Finally 範例
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>執行結果:</h3>
        <div
          style={{
            padding: "15px",
            backgroundColor: result.includes("失敗") || result.includes("錯誤") ? "#ffebee" : "#e8f5e9",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {result || "尚未執行"}
        </div>

        {errorInfo && (
          <>
            <h3>錯誤詳細資訊:</h3>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "5px",
                overflow: "auto",
                fontSize: "14px",
              }}
            >
              {JSON.stringify(errorInfo, null, 2)}
            </pre>
          </>
        )}
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

export default TryCatchExample;
