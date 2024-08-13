import React, { useEffect, useState } from "react";

const useDelayRender = () => {
  const [showEventBanner, setShowEventBanner] = useState({ isLoading: true, result: null });
  const startDate = "2024/01/12 00:00";
  const endDate = "2024/08/12 11:24";
  useEffect(() => {
    const createIntervalForRendering = setInterval(() => {
      let currentDate = Date.now();
      if (currentDate >= new Date(startDate).getTime()) {
        setShowEventBanner({ isLoading: false, result: true });
      }
      if (currentDate >= new Date(endDate).getTime()) {
        setShowEventBanner({ isLoading: false, result: false });
        clearInterval(createIntervalForRendering);
      }
    }, 1000);
    return () => {
      clearInterval(createIntervalForRendering);
    };
  });
  return showEventBanner;
};
export default useDelayRender;
