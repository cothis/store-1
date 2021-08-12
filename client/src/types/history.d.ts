type Search = Record<string, string>;

interface Path {
  pathname: string;
  search: Search;
  hash: string;
}

type To = string | Partial<Path>;

type HistoryEventHandler = (path: Path) => void;

interface IHistory {
  listen: (listener: HistoryEventHandler) => () => void;
  push: (to: To) => void;
  replace: (to: To) => void;
  get path(): Path;
}
