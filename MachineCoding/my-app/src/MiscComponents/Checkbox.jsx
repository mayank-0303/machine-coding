import React, { useEffect, useRef, useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ checkInfo, changeCh, ischeck }) => {
  return (
    checkInfo && (
      <div className="checkbox-container">
        {checkInfo.map((ch) => (
          <div key={ch.id}>
            <CheckInput id={ch.id} ischeck={ischeck} changeCh={changeCh} />
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

function CheckInput({ id, ischeck, changeCh }) {
  const checkBoxRef = useRef();

  useEffect(() => {
    if (ischeck[id] === "indeterminate")
      checkBoxRef.current.indeterminate = true;
    else checkBoxRef.current.indeterminate = false;
  }, [ischeck]);

  const checked = ischeck[id] === "checked" ? true : false;
  return (
    <input
      id={id}
      ref={checkBoxRef}
      type="checkbox"
      checked={checked}
      onChange={() => changeCh(id)}
    />
  );
}

export default Checkbox;
