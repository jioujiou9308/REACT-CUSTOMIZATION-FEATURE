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
  // 改用安全清空：只清 event，不清整個 ecommerce
  window.dataLayer = window.dataLayer || [];

  dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`, // 隨機產生
      value: Math.floor(Math.random() * 100) + 1, // 1~100 隨機
      tax: 5.0,
      shipping: 2,
      currency: "TWD", // ✅ OK
      coupon: "oxxo_sale",
      items: [
        // ✅ 格式完美
        {
          item_id: "oxxo12345",
          item_name: "OXXO 公仔",
          affiliation: "OXXO Store",
          coupon: "oxxo_sale", // items 內 coupon 可選
          discount: 2,
          index: 0,
          item_brand: "OXXO",
          item_category: "toy",
          item_category2: "cute",
          item_category3: "kids",
          item_category4: "robot",
          item_category5: "big",
          item_list_id: "oxxo_products",
          item_list_name: "OXXO Products",
          item_variant: "XOOX",
          location_id: "Taiwan1234567",
          price: 9.99, // ✅ 數字
          quantity: 1,
        },
      ],
    },
  });
};
