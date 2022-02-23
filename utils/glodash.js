export const isNil = (o) =>
  o === undefined || o === null || typeof o === 'undefined';

export const isString = (o) => typeof o === 'string';

export const isNumber = (o) => typeof o === 'number';

export const isBoolean = (o) => typeof o === 'boolean';

export const isObject = (o) =>
  Object.prototype.toString.call(o) === '[object Object]' && !isNil(o);

export const isFunction = (o) => typeof o === 'function';

export const isArray = (o) => Array.isArray(o);

// Array
/**
 * 获取数组第一个元素（类数组无法使用，例：arguments）
 * @param o array
 * @returns target | undefined
 */
export const head = (o) => (isArray(o) ? o[0] : undefined);
/**
 * 获取数组最后一个元素（类数组无法使用，例：arguments）
 * @param o array
 * @returns target | undefined
 */
export const last = (o) => (isArray(o) ? o[o.length - 1] : undefined);
/**
 * 移除数组前n个元素，默认1
 * @param o array
 * @param n ?number
 * @returns new array
 */
export const drop = (o, n = 1) =>
  isArray(o) && isNumber(n)
    ? o.slice(n > 0 && n < o.length ? n : 1, o.length)
    : o;
/**
 * 移除数组符合条件的元素
 * @param o array
 * @param fn function，需返回条件
 * @returns new array
 */
export const dropWhile = (o, fn) => {
  if (isArray(o)) {
    return o.filter((c) => !fn(c));
  } else {
    return o;
  }
};
/**
 * 移除数组中非法数据（undefined、null、0、{}、[]、false）
 * @param o array
 * @returns new array
 */
export const compact = (o) => {
  if (isArray(o)) {
    let resIndex = 0;
    const result = [];
    for (const value of o) {
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  } else {
    return o;
  }
};
/**
 * 查找数组中符合条件的元素
 * @param o array
 * @param fn function，需返回条件
 * @returns target | undefined
 */
export const find = (o, fn) => {
  if (isArray(o)) {
    const i = o.findIndex(fn);
    return i >= 0 ? o[i] : undefined;
  } else {
    return undefined;
  }
};

// String
/**
 * 将undefined和null以外的数据转为字符串
 * @param o any
 * @returns '' | string
 */
export const toString = (o) => (isNil(o) ? '' : `${o}`);
/**
 * 将字符串按指定分隔符分隔为数组
 * @param s string
 * @param separator 分隔符
 * @returns array
 */
export const split = (s, separator) =>
  typeof s === 'string' ? s.split(separator) : s;
/**
 * 将字符串第一个字符转为小写
 * @param s string
 * @returns string
 */
export const lowerFirst = (s) => {
  if (isString(s)) {
    const sa = split(s, '');
    return `${head(sa).toLowerCase()}${drop(sa).join('')}`;
  } else {
    return s;
  }
};
/**
 * 判断字符串是否以指定字符开头
 * @param s string
 * @param target string
 * @returns boolean
 */
export const startsWith = (s, target) =>
  s.slice(0, target.length) === target;
/**
 * 判断字符串是否以指定字符结尾
 * @param s string
 * @param target string
 * @returns boolean
 */
export const endsWith = (s, target) => {
  const { length } = s;
  let position = length;
  if (position > length) {
    position = length;
  }
  const end = position;
  position -= target.length;
  return position >= 0 && s.slice(position, end) === target;
};

// Object
export const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * 判断对象中是否存在指定属性
 * @param o object
 * @param key string
 * @returns boolean
 */
export const has = (o, key) =>
  !isNil(o) && hasOwnProperty.call(o, key);
/**
 * 获取对象中所有的属性名
 * @param o object
 * @returns array
 */
export const keys = (o) => (typeof o === 'object' ? Object.keys(o) : []);
/**
 * 对象遍历
 * @param o object
 * @param fn 遍历回调
 */
export const forEach = (o, fn) => {
  keys(o).forEach((k) => fn(o[k], k));
};
/**
 * 判断两个对象显式属性与对应值是否相等
 * @param o1 object
 * @param o2 object
 * @returns boolean
 */
export const isEqual = (o1, o2) => {
  const ks = keys(o1);
  if (!isObject(o1) || !isObject(o2) || ks.length !== keys(o2).length) {
    return false;
  } else {
    for (let i = 0; i < ks.length; i += 1) {
      if (isObject(o1[ks[i]])) {
        return isEqual(o1[ks[i]], o2[ks[i]]);
      } else if (o1[ks[i]] !== o2[ks[i]]) {
        return false;
      }
    }
  }
};
/**
 * 获取对象中指定路径的值
 * @param o object
 * @param path string
 * @param defaultValue any
 * @returns target | defaultValue | undefined
 */
export const get = (o, path, defaultValue) => {
  let target = o;
  if (!isObject(o)) return defaultValue;
  const keys = path.split('.');
  keys.forEach((k) => {
    if (target) {
      target = target[k];
    } else {
      target = defaultValue;
    }
  });
  return target;
};
/**
 * 移除对象中指定属性
 * @param o object
 * @param targetProp string
 * @returns boolean
 */
export const unset = (o, targetProp) => {
  if (isObject(o)) {
    try {
      return Reflect.deleteProperty(o, targetProp);
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

// Function
/**
 * 节流函数
 * @param callback function 回调函数
 * @param delay number(ms) 默认250
 * @param noTrailing boolean 如果 noTrailing 为 true，则回调将仅delay在调用节流函数时每delay ms执行一次。如果 noTrailing 为 false 或未指定，回调将在最后一次节流函数调用后执行最后一次。
 * @param debounceMode boolean 如果debounceMode为 true，则安排clear在delay ms之后执行。如果debounceMode为 false，则安排callback在delay ms之后执行 。
 * @returns function
 */
export const throttle = (callback, delay = 250, noTrailing, debounceMode) => {
  let timeoutID;
  let cancelled = false;
  let lastExec = 0;
  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  function wrapper(...arguments_) {
    let self = this;
    let elapsed = Date.now() - lastExec;
    if (cancelled) {
      return;
    }
    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    function clear() {
      timeoutID = undefined;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    clearExistingTimeout();
    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }
  return wrapper;
};

/**
 * 判断目标值是否为空（[]、{}、''、0、false）
 * @param o any
 * @returns boolean
 */
export const isEmpty = (o) => {
  if (isArray(o)) {
    return o.length === 0;
  } else if (isObject(o)) {
    return keys(o).length === 0;
  } else {
    return !o;
  }
};
/**
 * 判断类型
 * @param o any
 * @returns string
 */
export const typeOf = (o) => {
  const prelType = typeof o;
  if (prelType === 'object') {
    return isArray(o) ? 'array' : prelType;
  } else {
    return prelType;
  }
};
