/**
 * Enables HMR if available and triggers given callback
 * on hot reloads.
 */
export default (s, cb, hot) => {
  if (module.hot) {
    hot(m => cb(m, true));
  }

  cb(s);
};
