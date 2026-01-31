// GTM 事件追蹤
export const gtmEvent = ({ event, ...data }) => {
  if (typeof window !== "undefined") {
    // 確保 dataLayer 存在
    window.dataLayer = window.dataLayer || [];

    console.log("GTM Event:", { event, ...data }); // 除錯用

    window.dataLayer.push({
      event,
      ...data,
    });
  }
};

// 頁面瀏覽追蹤
export const gtmPageview = (url) => {
  gtmEvent({
    event: "page_view222222",
    page_path: url,
  });
};

// 按鈕點擊追蹤
export const gtmButtonClick = ({ button_name, section }) => {
  gtmEvent({
    event: "button_click111111",
    button_name,
    section,
  });
};

// 表單提交追蹤
export const gtmBuyProductButton = () => {
  gtmEvent({
    event: "purchase",
    ecommerce: {
      transaction_id: "ORDER_12345",
      value: 299.99,
      currency: "USD",
      items: [
        {
          item_id: "SKU_001",
          item_name: "Y70 Case",
          price: 299.99,
          quantity: 1,
        },
      ],
    },
  });
};
