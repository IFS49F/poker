const runtimeEnv =
  (typeof window !== 'undefined' && window.__ENV__) ? window.__ENV__ : {};

export const getEnv = (key, fallback) => {
  if (runtimeEnv[key] !== undefined) {
    return runtimeEnv[key];
  }
  if (process.env[key] !== undefined) {
    return process.env[key];
  }
  return fallback;
};
