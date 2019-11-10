const config = require("config");

// Use env, fallback to config
const get = key => {
  const env = process.env[key];

  if (config.has(key)) {
    const local = config.get(key);

    if (local !== "" && local !== null && (env === "" || env == null)) {
      return local;
    }
  }

  return env;
};

module.exports = { get };
