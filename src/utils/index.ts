/**
 * 防抖
 * @param callback 执行方法
 * @param delay 间隔时间
 * @param immediate 是否先执行
 */
export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 300,
  immediate = false
) {
  let timer: number | null = null;
  const cb = function (this: unknown, ...args: T) {
    timer && clearTimeout(timer);
    if (immediate) {
      const isEnter = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      isEnter && callback.apply(this, args);
    } else {
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    }
  };
  return cb;
}

/**
 * 等待
 * @param delay 等待时间
 * @returns
 */
export function wait(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
