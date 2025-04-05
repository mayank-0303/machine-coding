import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ progress }) => {
  const [progrstate, setthiss] = useState(0);

  useEffect(() => {
    // setTimeout(() => setthiss(progress), 100);
    setthiss(progress);
  }, [progress]);
  return (
    <div className="container">
      <div
        className="bar"
        style={{
          transform: `translateX(${progrstate - 100}%)`,
        }}
      >
        {progress}
      </div>
    </div>
  );
};

export default ProgressBar;
