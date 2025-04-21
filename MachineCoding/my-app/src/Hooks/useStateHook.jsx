import { useReducer } from "react";

/** so mayank remember as these are simply functions right which will be called again and again,
 * so i need to store data outside which will keep saved.
 * now i know when a components rerenders it recompute so the parent component will calls we functions again
 *  and need to return the old value ,but as when i am calling it again there is no key maintain we just pass initial value,
 * so to tackle that i maintain a counter and returns the values of all hooks
 * (and thats the reason why hooks cannot be conditional in parent component as it will mess up the count)
 *
 *  let id = counter++; i maintained this a closure so that when i return the set function it can access the actual counter to update<
 * and not the counter that was already at a high value after running all hooks
 */

// const hooksInfo = {};
// let counter = 0;
// const useStateHook = (initial) => {
//   let id = counter++;

//   if (!hooksInfo[id]) {
//     function setValue(newVal) {
//       if (!Object.is(newVal, hooksInfo[id][0])) {
//         hooksInfo[id][0] = newVal;
//         counter = 0;
//         rerender({});
//       }
//     }
//     hooksInfo[id] = [initial, setValue];
//   }

//   const [, rerender] = useReducer(() => ({}));

//   return hooksInfo[id];
// };

// const useEffectHook = (initialFn, dependency) => {
//   let id = counter++;

//   if (!hooksInfo[id]) {
//     const cleanUp = initialFn();
//     hooksInfo[id] = [cleanUp, dependency];
//   } else {
//     const changed = dependency.every((d, i) => {
//       return hooksInfo[id][1][i] === d;
//     });

//     if (!changed) {
//       if (hooksInfo[id][0]) hooksInfo[id][0]();
//       const cleanUp = initialFn();
//       hooksInfo[id] = [cleanUp, dependency];
//     }
//   }
// };

// const useMemoHook = (initialFn, dependency) => {
//   let id = counter++;

//   if (!hooksInfo[id]) {
//     const computed = initialFn();
//     hooksInfo[id] = [computed, dependency];
//     return computed;
//   } else {
//     const changed = dependency.every((d, i) => {
//       return hooksInfo[id][1][i] === d;
//     });

//     if (!changed) {
//       const computed = initialFn();
//       hooksInfo[id] = [computed, dependency];
//       return computed;
//     } else {
//       return hooksInfo[id][0];
//     }
//   }
// };

/**
 *
 * the issue i had was basic in this logic that what if this hook is used in multiple components and just one rerenders the
 * counter will be zero again and can get value of other hooks in other components ,
 * so i need s counter and hooks data maintained for each component so trying stuff below
 * 2. issue is that i am using useReducer(() => ({})) to render
 * 3. final unmout clean never works
 *
 * i resolved the 1st issue by creating a wrapper , rest is too react specific and i can just think of a solution like
 * returing a unmount function to run the clean ups
 */

// const useStateHook = (initial) => {
//   let id = this.counter++;

//   if (!this.hooksInfo[id]) {
//     function setValue(newVal) {
//       if (!Object.is(newVal, this.hooksInfo[id][0])) {
//         this.hooksInfo[id][0] = newVal;
//         this.counter = 0;
//         rerender({});
//       }
//     }
//     this.hooksInfo[id] = [initial, setValue];
//   }

//   const [, rerender] = useReducer(() => ({}));

//   return this.hooksInfo[id];
// };

// const useEffectHook = (initialFn, dependency) => {
//   let id = this.counter++;

//   if (!this.hooksInfo[id]) {
//     const cleanUp = initialFn();
//     this.hooksInfo[id] = [cleanUp, dependency];
//   } else {
//     const changed = dependency.every((d, i) => {
//       return this.hooksInfo[id][1][i] === d;
//     });

//     if (!changed) {
//       if (this.hooksInfo[id][0]) this.hooksInfo[id][0]();
//       const cleanUp = initialFn();
//       this.hooksInfo[id] = [cleanUp, dependency];
//     }
//   }
// };

// const useMemoHook = (initialFn, dependency) => {
//   let id = this.counter++;

//   if (!this.hooksInfo[id]) {
//     const computed = initialFn();
//     this.hooksInfo[id] = [computed, dependency];
//     return computed;
//   } else {
//     const changed = dependency.every((d, i) => {
//       return this.hooksInfo[id][1][i] === d;
//     });

//     if (!changed) {
//       const computed = initialFn();
//       this.hooksInfo[id] = [computed, dependency];
//       return computed;
//     } else {
//       return this.hooksInfo[id][0];
//     }
//   }
// };

const customComponent = (component) => {
  const hooksInfo = {};
  let counter = 0;
  const useStateHook = (initial) => {
    let id = counter++;

    if (!hooksInfo[id]) {
      function setValue(newVal) {
        if (!Object.is(newVal, hooksInfo[id][0])) {
          hooksInfo[id][0] = newVal;
          counter = 0;
          rerender({});
        }
      }
      hooksInfo[id] = [initial, setValue];
    }

    const [, rerender] = useReducer(() => ({}));

    return hooksInfo[id];
  };

  const useEffectHook = (initialFn, dependency) => {
    let id = counter++;

    if (!hooksInfo[id]) {
      const cleanUp = initialFn();
      hooksInfo[id] = [cleanUp, dependency];
    } else {
      const changed = dependency.every((d, i) => {
        return hooksInfo[id][1][i] === d;
      });

      if (!changed) {
        if (hooksInfo[id][0]) hooksInfo[id][0]();
        const cleanUp = initialFn();
        hooksInfo[id] = [cleanUp, dependency];
      }
    }
  };

  const useMemoHook = (initialFn, dependency) => {
    let id = counter++;

    if (!hooksInfo[id]) {
      const computed = initialFn();
      hooksInfo[id] = [computed, dependency];
      return computed;
    } else {
      const changed = dependency.every((d, i) => {
        return hooksInfo[id][1][i] === d;
      });

      if (!changed) {
        const computed = initialFn();
        hooksInfo[id] = [computed, dependency];
        return computed;
      } else {
        return hooksInfo[id][0];
      }
    }
  };
  return () => component(useStateHook, useEffectHook, useMemoHook);
};

// export { useStateHook, useEffectHook, useMemoHook, customComponent };
export default customComponent;
