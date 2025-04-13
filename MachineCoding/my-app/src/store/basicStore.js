function createStore(intialState, reducer) {
  const store = intialState;

  const subscribedFn = []

  const getState = () => store;

  const subscribe = (newFn) => {
    subscribedFn.push(newFn)
    //returning a function which can unsubscribe the function
    return () => {
        subscribedFn = subscribedFn.filter(sFn => sFn !== newFn)
    }
  };

  const dispatch = (action) => {
    store = reducer(action)
    subscribedFn.forEach(fn => {
        fn(store)
    })
  };

  return {getState, subscribe, dispatch}
}
