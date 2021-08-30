export const attachPath = (base: string, url: string) => {
  return new URL(url, base).href;
};
