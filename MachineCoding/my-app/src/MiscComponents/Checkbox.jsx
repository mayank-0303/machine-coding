import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ checkInfo, changeCh, ischeck }) => {
  //   const [ischecked, setIschecked] = useState({});

  //   function handleChange(event, id) {
  //     setIschecked((old) => ({ ...old, [id]: !old[id] }));
  //   }

  return (
    checkInfo && (
      <div className="checkbox-container">
        {checkInfo.map((ch) => (
          <div key={ch.id}>
            <input
              id={ch.id}
              type="checkbox"
              checked={ischeck[ch.id] || false}
              onChange={() => changeCh(ch.id)}
            />
            <label htmlFor={ch.id} className="checkox-block">
              {ch.name}
            </label>
            <Checkbox
              checkInfo={ch.children}
              changeCh={changeCh}
              ischeck={ischeck}
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Checkbox;
