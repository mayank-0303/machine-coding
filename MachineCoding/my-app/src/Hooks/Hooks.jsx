import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  createContext,
  useId,
} from "react";
import { useParams } from "react-router";
import Child from "./Child";
import HighComputation from "./HighComputation";

const ThemeContext = createContext({});

const reducer = (state, action) => {
  switch (action) {
    case "Shift":
      return {
        firstName: "Mr",
        lastName: "Coder",
      };
  }
};

const Hooks = () => {
  const randomId = useId();
  const [stateCounter, setStateCounter] = useState(0);

  const [reducerInfo, dispatch] = useReducer(reducer, {
    firstName: "Mayank",
    lastName: "Singh",
  });

  const [effectCounter, setEffectCounter] = useState(0);

  useEffect(() => {
    setEffectCounter(stateCounter);
  }, [stateCounter]);

  useLayoutEffect(() => {
    // console.log("🔄 2. useLayoutEffect Runs (Before Paint)");
    containerRef.current.style.height = `${stateCounter}px`;
    refTof.current.changeHeight(stateCounter);
  }, [stateCounter]);

  const containerRef = useRef();

  const refTof = useRef();

  const memoizedResult = useMemo(() => {
    //heavy compuatation
    // console.log("is useMemo computed");
    return (
      stateCounter +
      stateCounter +
      stateCounter +
      stateCounter +
      stateCounter +
      stateCounter +
      stateCounter
    );
  }, [stateCounter]);
  // if stateCounter stays same it will return the cached value

  const callBackFn = useCallback(() => {
    // console.log("does something ");
  }, [stateCounter]);

  const params = useParams();

  return (
    <div id={randomId}>
      <div>
        <b>All are state based hooks for state management</b>
        <br />
        State Counter : {stateCounter} - - -
        <button onClick={() => setStateCounter((old) => old + 1)}>
          Increase count
        </button>
        <button onClick={() => setStateCounter((old) => old - 1)}>
          Decrease count
        </button>
      </div>
      <div>
        Reducer info : {reducerInfo.firstName} {reducerInfo.lastName} - - -
        <button onClick={() => dispatch("Shift")}>
          change dependent and complex state once
        </button>
      </div>
      <div>
        <b>All are effect based hooks for side effects</b>
        <br />
        use effect hook side effect -- {effectCounter} <br />
        ref and layout effect set the height is below div
        <div ref={containerRef} className="bg-black f-w"></div>
      </div>
      <div>
        <b>Ref based hooks </b>
        <br />
        ref and useImperativeHandle = useImperativeHandle is used to expose ref
        methods of a child to parent. basically to change a ref from parent
        which is inside child
        <Child ref={refTof} callBackFn={callBackFn} />
      </div>
      <div>
        <b>Perfomance based hooks </b>
        useMemo result = {memoizedResult} <br />
        callback is used above see
        <br />
      </div>
      <div>param if any - {params.p ?? "no params"}</div> <br />
      <div>
        <b>Context hook </b>
        <ThemeContext.Provider value={{ stateCounter, setStateCounter }}>
          <Child ref={refTof} callBackFn={callBackFn} />
        </ThemeContext.Provider>

        <br />
      </div>
      useTransition = when we are computing real alot of data between rerender
      rather than showing the frozen screen we can optimize that
      <HighComputation />
    </div>
  );
};

export { ThemeContext };
export default Hooks;
