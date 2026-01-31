import React, { useEffect } from "react";
import { gtmEvent, gtmBuyProductButton } from "../../services/gtm";

const Index = () => {
  const handleClick = () => {
    gtmEvent({
      event: "button_click (test)",
      button_name: "demo_button",
      section: "ga4_events_page",
      value: 1,
    });
    alert("GTM 事件已發送！");
  };
  useEffect(() => {
    gtmEvent({
      event: "page_view (test)",
      page_path: "/ga4-events",
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">GTM 事件測試</h1>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        點擊發送 GTM 事件!!
      </button>
      <button
        onClick={() => gtmBuyProductButton()}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        點擊發送 購買產品 事件!!
      </button>
    </div>
  );
};

export default Index;
