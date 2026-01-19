import React, { useState } from "react";
import { useShallow } from "zustand/shallow";
import useZustandStore from "../../stores/zustandStore";

const containerStyle = {
  padding: "24px",
  fontFamily: "Arial, sans-serif",
  lineHeight: 1.6,
  maxWidth: "900px",
  margin: "0 auto",
};

const cardStyle = {
  border: "1px solid #e2e2e2",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
  backgroundColor: "#fafafa",
};

const buttonStyle = {
  padding: "6px 12px",
  marginRight: "8px",
  marginBottom: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const CounterPanel = () => {
  const { count, increment, decrement, resetCount, incrementByItems } = useZustandStore(
    useShallow((state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
      resetCount: state.resetCount,
      incrementByItems: state.incrementByItems,
    }))
  );
  const doubleCount = count * 2;

  return (
    <div style={cardStyle}>
      <h2>計數器</h2>
      <p>Count: {count}</p>
      <p>Double (selector 派生): {doubleCount}</p>
      <button style={buttonStyle} onClick={increment}>
        +1
      </button>
      <button style={buttonStyle} onClick={decrement}>
        -1
      </button>
      <button style={buttonStyle} onClick={incrementByItems}>
        依 items 數量加總
      </button>
      <button style={buttonStyle} onClick={resetCount}>
        Reset
      </button>
    </div>
  );
};

const TextPanel = () => {
  // 用 useShallow 包住 selector，避免 object selector 每次都造成重渲染
  const { text, setText } = useZustandStore(
    useShallow((state) => ({
      text: state.text,
      setText: state.setText,
    }))
  );

  return (
    <div style={cardStyle}>
      <h2>同步文字</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入文字會同步到 store"
        style={{ padding: "6px 10px", width: "100%", maxWidth: "400px" }}
      />
      <p>Preview: {text || "(尚未輸入)"}</p>
    </div>
  );
};

const ListPanel = () => {
  const { items, addItem, removeItem } = useZustandStore(
    useShallow((state) => ({
      items: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
    }))
  );
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addItem(trimmed);
    setInput("");
  };

  return (
    <div style={cardStyle}>
      <h2>清單</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新增一筆 item"
          style={{ padding: "6px 10px", width: "100%", maxWidth: "400px" }}
        />
        <div style={{ marginTop: "8px" }}>
          <button style={buttonStyle} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <p>目前共 {items.length} 筆</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "6px" }}>
            {item.label}
            <button style={{ ...buttonStyle, marginLeft: "8px" }} onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const StoreSnapshot = () => {
  const { count, text, items } = useZustandStore(
    useShallow((state) => ({
      count: state.count,
      text: state.text,
      items: state.items,
    }))
  );

  return (
    <div style={cardStyle}>
      <h2>Store 快照</h2>
      <pre style={{ background: "#fff", padding: "12px", borderRadius: "6px" }}>
        {JSON.stringify({ count, text, items }, null, 2)}
      </pre>
    </div>
  );
};

const Index = () => {
  const resetAll = useZustandStore((state) => state.resetAll);

  return (
    <div style={containerStyle}>
      <h1>Zustand 使用範例</h1>
      <p>
        這個頁面示範了 Zustand 的基本用法：建立 store、使用 selector 訂閱部分狀態、以及在多個元件間共用狀態。
      </p>
      <ul>
        <li>create 會建立一個 store，裡面放 state 與 actions，不需要 Provider。</li>
        <li>set 會更新 state，get 可以讀取當前 state。</li>
        <li>selector 只訂閱你需要的欄位，可降低重渲染。</li>
      </ul>
      <button style={buttonStyle} onClick={resetAll}>
        Reset All
      </button>
      <CounterPanel />
      <TextPanel />
      <ListPanel />
      <StoreSnapshot />
    </div>
  );
};

export default Index;
