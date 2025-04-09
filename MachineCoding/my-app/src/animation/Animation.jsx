import React, { useEffect, useState } from "react";
import "./Animation.css";

const Animation = () => {
  const [t, setT] = useState(false);

  useEffect(() => {
    setT(true);
    const i = setInterval(() => {
      setT((old) => !old);
    }, 5000);
    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <>
      <div className="animation-container">
        <div className={`transform-block ${t && "shift"}`}></div>
        <div className="animate-block"></div>
      </div>
      <div className="display-grid">
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
        <div className="display-item"> </div>
      </div>
      <h2>Grid</h2>
    </>
  );
};

export default Animation;
