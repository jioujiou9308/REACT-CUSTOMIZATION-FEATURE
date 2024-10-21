import React, { useState, useEffect } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        #content {
          display: grid;
          grid-template-rows: 0fr;
          transition: 1s ease-in-out;
          overflow: hidden;
        }
        #content .inside {
          min-height: 0;
        }
        #content.expanded {
          background: yellow;
          grid-template-rows: 1fr;
        }
        //  --------------------------------------
        .wrapper {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 2.5s ;
        }

        .wrapper.is-open {
          grid-template-rows: 1fr;
        }

        .inner {
          overflow: hidden;
        }
      `}</style>
      <div className="">asdf</div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      <div id="content" className={`${open ? "expanded" : ""}`} style={{ width: "400px" }}>
        <div className="inside">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla necessitatibus iusto
          laborum autem placeat aspernatur inventore eius deleniti reprehenderit? Numquam commodi
          totam mollitia quod iure quibusdam corrupti eos quos perspiciatis?Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Nulla necessitatibus iusto laborum autem placeat
          aspernatur inventore eius deleniti reprehenderit? Numquam commodi totam mollitia quod iure
          quibusdam corrupti eos quos perspiciatis?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla necessitatibus iusto laborum autem placeat aspernatur inventore
          eius deleniti reprehenderit? Numquam commodi totam mollitia quod iure quibusdam corrupti
          eos quos perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          necessitatibus iusto laborum autem placeat aspernatur inventore eius deleniti
          reprehenderit? Numquam commodi totam mollitia quod iure quibusdam corrupti eos quos
          perspiciatis?
        </div>
      </div>
      <br />
      <div className={`wrapper ${open ? "is-open" : ""}`} style={{ width: "400px" }}>
        <div className="inner">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla necessitatibus iusto
          laborum autem placeat aspernatur inventore eius deleniti reprehenderit? Numquam commodi
          totam mollitia quod iure quibusdam corrupti eos quos perspiciatis?Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Nulla necessitatibus iusto laborum autem placeat
          aspernatur inventore eius deleniti reprehenderit? Numquam commodi totam mollitia quod iure
          quibusdam corrupti eos quos perspiciatis?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla necessitatibus iusto laborum autem placeat aspernatur inventore
          eius deleniti reprehenderit? Numquam commodi totam mollitia quod iure quibusdam corrupti
          eos quos perspiciatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          necessitatibus iusto laborum autem placeat aspernatur inventore eius deleniti
          reprehenderit? Numquam commodi totam mollitia quod iure quibusdam corrupti eos quos
          perspiciatis?
        </div>
      </div>
    </>
  );
};

export default Index;

// const Loading = () => {
//   return <div style={{ height: "500px", backgroundColor: "green" }}>Loading...</div>;
// };

// const Component = ({ setLoading }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     // 清除定时器，以防止内存泄漏
//     return () => clearTimeout(timer);
//   }, [setLoading]);

//   return (
//     <div>
//       <div>Index</div>
//     </div>
//   );
// };
