export const GtmBody = () => {
  const gtmContainerID = "MDHFFQHT";

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=GTM-${gtmContainerID}' height='0' width='0' style='display:none; visibility:hidden'></iframe>`,
      }}
    ></noscript>
  );
};
