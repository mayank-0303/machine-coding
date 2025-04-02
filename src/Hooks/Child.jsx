import React, {
  forwardRef,
  memo,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { ThemeContext } from "./Hooks";

//forwardRef is no more necessary we can simply pass ref as prop

const Child = memo(
  forwardRef((props, ref) => {
    const childRef = useRef();

    useImperativeHandle(ref, () => {
      return {
        changeHeight: (height) => {
          childRef.current.style.height = `${height * 2}px`;
        },
      };
    });

    const { stateCounter, setStateCounter } = useContext(ThemeContext);

    // console.log("is child rerendered");
    return (
      <div>
        children component
        <div ref={childRef} className="bg-black"></div>
        <button onClick={() => setStateCounter((old) => old - 1)}>
          Decrease count
        </button>
      </div>
    );
  })
);

export default Child;
