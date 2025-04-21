import React from "react";
import CustomComponent from "./useStateHook";

const CustomHook = CustomComponent(
  (useStateHook, useEffectHook, useMemoHook) => {
    const [count, setCount] = useStateHook(5);
    const [count2, setCount2] = useStateHook(10);

    useEffectHook(() => {
      console.log("Executing useEffect of count", count);
      return () => {
        console.log("clean up");
      };
    }, [count]);

    const memoizedValue = useMemoHook(() => {
      console.log("computed man");
      return count;
    }, [count]);
    console.log("memoizedValue", memoizedValue);
    return (
      <div>
        <b>useState custom hook </b>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount2(count2 - 1)}>-</button>
        <span>{count2}</span>
        <button onClick={() => setCount2(count2 + 1)}>+</button>
      </div>
    );
  }
);

export default CustomHook;
