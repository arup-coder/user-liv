import { User } from "./user.model";

export interface UserResponse {
  headers?: PaginationHeaders;
  body: User[];
  sort: string;
  filter: FilterValues[];
  searchText: string;
}

export interface PaginationHeaders {
  page: number;
  pageSize: number;
  pageCount: number;
  recordCount: number;
}

export interface SortingProperties {
  active: string;
  direction: string;
}
export interface FilterValues {           // Used for Filter Source & Filter Selection
  title: string;                          // title to send to api call
  dataSource?: FilterValueDataSource[];   // datasource of filter
  value?: FilterValueDataSource;          // value of selected filter
  displayTitle?: string;                  // title to display to filter in UI
  newTitle?: string;                      // displaytitle will be replaced by newTitle when filter option is selected
}

export interface FilterValueDataSource {
  value: string;                          // Value to send to api call
  displayValue: string;                   // value to display in filter in UI
}




