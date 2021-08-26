export const debouncer = <T>() => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (cb: Function, delay: number = 0, ...args: unknown[]) => {
    return new Promise<T>((resolve, reject) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(cb(...args) as T);
      }, delay);
    });
  };
};
