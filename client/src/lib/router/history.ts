export type Search = Record<string, string>;

export interface Path {
  pathname: string;
  search: Search;
  hash: string;
}

export type To = string | Partial<Path>;

export type HistoryEventHandler = (path: Path) => void;

export interface IHistory {
  listen: (listener: HistoryEventHandler) => () => void;
  push: (to: To) => void;
  replace: (to: To) => void;
  forward: () => void;
  back: () => void;
  go: (delta: number) => void;
  get path(): Path;
}

function parseSearch(query: string) {
  return query
    .substr(1)
    .split('&')
    .map<[string, string]>((s) => s.split('=') as [string, string])
    .reduce<Search>((acc, [key, value]) => {
      if (!key) return acc;
      acc[key] = value;
      return acc;
    }, {});
}

function parsePath(path: string): Partial<Path> {
  const partialPath: Partial<Path> = {};
  if (path) {
    const hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      partialPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    const searchIndex = path.indexOf('?');
    if (searchIndex >= 0) {
      const search = path.substr(searchIndex);
      partialPath.search = parseSearch(search);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      partialPath.pathname = path;
    }
  }

  return partialPath;
}

const mergeSearch = (search: Search) =>
  Object.entries(search)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

function createPath({ pathname = '/', search = {}, hash = '' }: Partial<Path>): string {
  const _search: Search = {};
  Object.entries(search).forEach(([key, value]) => {
    if (value.trim() !== '') {
      _search[key] = value.trim();
    }
  });
  return `${pathname}${Object.keys(_search).length ? '?' : ''}${mergeSearch(_search)}${hash ? '#' : ''}${hash}`;
}

export const createHref = (to: To) => (typeof to === 'string' ? to : createPath(to));

const createEvents = () => {
  let handlers: HistoryEventHandler[] = [];

  return {
    push(func: HistoryEventHandler) {
      handlers.push(func);
      const removeHandler = () => {
        handlers = handlers.filter((handler) => handler !== func);
      };

      return removeHandler;
    },

    call(path: Path) {
      handlers.forEach((handler) => handler(path));
    },
  };
};

class BrowserHistory implements IHistory {
  private listeners: ReturnType<typeof createEvents>;
  private globalHistory: History = window.history;
  private currentPath: Path;

  constructor() {
    const { pathname, search, hash } = window.location;
    const state = this.globalHistory.state || {};

    window.addEventListener('popstate', (e) => {
      const prevPath = e.state as Path;
      this.currentPath = prevPath;
      this.listeners.call(prevPath);
    });

    this.listeners = createEvents();
    this.currentPath = {
      pathname,
      search: parseSearch(search),
      hash,
      ...state,
    };

    if (Object.keys(state).length === 0) {
      this.replace(this.currentPath);
    }
  }

  getNextPathAndUrl(to: To): [Path, string] {
    const path = typeof to === 'string' ? parsePath(to) : to;
    let nextPath: Path;
    if (path.pathname && path.pathname !== this.currentPath.pathname) {
      nextPath = {
        search: {},
        hash: '',
        pathname: path.pathname,
      };
    } else {
      nextPath = {
        ...this.currentPath,
        ...path,
      };
    }

    return [nextPath, createHref(nextPath)];
  }

  listen(listener: HistoryEventHandler) {
    const removeListener = this.listeners.push(listener);

    return removeListener;
  }

  push(to: To) {
    const [nextPath, url] = this.getNextPathAndUrl(to);
    this.globalHistory.pushState(nextPath, '', url);
    this.currentPath = nextPath;
    this.listeners.call(nextPath);
  }

  replace(to: To) {
    const [nextPath, url] = this.getNextPathAndUrl(to);
    this.globalHistory.replaceState(nextPath, '', url);
    this.currentPath = nextPath;
    this.listeners.call(nextPath);
  }

  go(delta: number) {
    this.globalHistory.go(delta);
  }

  forward() {
    this.go(1);
  }

  back() {
    this.go(-1);
  }

  get path() {
    return this.currentPath;
  }
}

export const createHistory = (): IHistory => new BrowserHistory();
