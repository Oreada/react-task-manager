export interface ISearchProps {
  onSearch: (value: string) => void;
  defaultValue: string;
}

export interface ISearchState {
  value: string;
}
