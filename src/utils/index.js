const isObject = val => typeof val === "object" || typeof val === "function";

const setIn = (obj, parts, length, val) => {
  let tmp = obj;
  let i = 0;
  for (; i < length - 1; i++) {
    const part = parts[i];
    tmp = !isObject(tmp[part]) ? (tmp[part] = {}) : tmp[part];
  }
  tmp[parts[i]] = val;
  return obj;
};

const set = (obj, path, val, sep = ".") => {
  if (!isObject(obj) || !path || !path.length) {
    return obj;
  }
  const parts = Array.isArray(path) ? path : String(path).split(sep);
  const { length } = parts;
  if (length === 1) {
    obj[parts[0]] = val;
    return obj;
  }
  return setIn(obj, parts, length, val);
};

const pick = (object, keys) =>
  keys.reduce((obj, key) => {
    const data = get(object, key);
    if (data != null) set(obj, key, data);
    return obj;
  }, {});

const get = (object, path) => {
  if (typeof path === "string") {
    path = path.split(".").filter(key => key.length);
  }
  const result = path.reduce((dive, key) => dive && dive[key], object);
  //console.log(object, path, result);
  return result;
};

const isArray = obj => Object.prototype.toString.call(obj) === "[object Array]";

const flatArray = arr => [].concat(...arr);

const range = ({ start, size }) => {
  return [...Array(size).keys()].map(i => i + start);
};

export { set, get, pick, isArray, flatArray, range };
