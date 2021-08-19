export type MatchPath = Record<string, string>;

export function isPathWithParam(pathname: string): boolean {
  const index = pathname.indexOf('?');
  if (index !== -1 && index !== pathname.length - 1) {
    throw new Error('path의 중간에 optional param이 올 수 없습니다.');
  }

  return /\/:[^\/]+/.test(pathname);
}

const cache: Record<string, RegExp> = {};

export function matchPath(currentPathname: string, routePathname: string): MatchPath | null {
  let regex: RegExp | null;
  if (routePathname in cache) {
    regex = cache[routePathname];
  } else {
    const pattern = routePathname.replace(/\/:([^\/?]+)(\?)?/g, '/$2(?<$1>[^/]+)$2').replaceAll('/', `\\/`);
    regex = new RegExp(`^${pattern}$`);
    cache[routePathname] = regex;
  }

  const result = currentPathname.match(regex);
  if (result) {
    const group: MatchPath = {};
    if (result.groups) {
      Object.keys(result.groups).forEach((key) => {
        group[key] = result.groups![key];
      });
    }
    return group;
  }

  return null;
}
