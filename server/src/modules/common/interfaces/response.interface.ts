
export interface IListResponseData<T> {
  total: number;
  items: T[];
  page: number;
  limit: number;
}
