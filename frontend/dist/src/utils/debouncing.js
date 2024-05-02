export const debounce = (callback, timeout) => {
  console.log("timeout", timeout);
  let timer = null;
  // if already a timer just clear the timer so that new evnt is registered

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // if using this apply
      console.log("called");
      callback.apply(this, args);
    }, timeout);
  };
};
