import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

const Index = () => {
  const [timeout, setTimeout] = useState(false);

  // const date = new Date("2024-05-28T08:33:00Z");
  const losTime = "2024-10-10 02:00:00";
  const losTime2 = moment.tz(losTime, "America/Los_Angeles");

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('userTimeZone', userTimeZone)
  const mytime = losTime2.clone().tz(userTimeZone).format("YYYY-MM-DD HH:mm");
  console.log("mytime", mytime);
  // console.log("losAngelesTime", losAngelesTime);

  // const baseLosUTC = new
  const date = new Date("2024-05-28T08:33:00Z");
  const localeTimestamp = date.getTime();

  useEffect(() => {
    const countDownTime = setInterval(() => {
      const nowTime = Date.now();

      if (nowTime >= localeTimestamp) {
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
