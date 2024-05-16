export const debounce = (callback, timeout) => {
  console.log("timeout", timeout);
  let timer = null;
  // if already a timer just clear the timer so that new evnt is registered

  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      // if using this apply
      console.log("called");
      callback(...args);
    }, timeout);
  };
};
