import React, { useEffect, useState } from "react";

const Index = () => {
  const [timeout, setTimeout] = useState(false);

  // 上架時間 ， 以洛杉磯時間得到的utc時間 換算台灣時間應該是
  // 這裡要得到以洛杉磯間為主的utc時間最難，要想辦法得到，之後就很簡單，可以實現全球同步
  // 洛杉磯現在時間 2024-05-28 07:14:00 => utc : 2024-05-28T14:14:00Z
  // const launchUTC = new Date("2024-10-10T09:00:00Z")
  const launchUTC = new Date("2024-05-28T14:18:00Z")
  const launchTimestamp = launchUTC.getTime()

  useEffect(() => {
    const countDownTime = setInterval(() => {
      const nowTime = Date.now();

      if (nowTime >= launchTimestamp) {
        setTimeout(true);
      }
    }, 1000);

    return () => {
      clearInterval(countDownTime);
    };
  }, []);


  return <div>{timeout ? "商品發售" : "00000"}</div>;
};

export default Index;

// 台灣時間 2024-10-10 17:00:00
// UTC 2024-10-10 09:00:00
// 洛杉磯時間 2024-10-10 02:00:00
