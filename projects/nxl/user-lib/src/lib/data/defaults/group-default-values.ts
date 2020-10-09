import { GroupPaginationHeaders, FilterValues } from '../../models/group-response.model';

export const initialGroupPaginationParams: GroupPaginationHeaders = {
  page: 1,
  pageSize: 5,
  pageCount: 0,
  recordCount: 0,
};

export const filterProperties: FilterValues[] = [
  {
    title: 'IsActive',
    displayTitle: 'Status',
    dataSource: [
      { displayValue: 'Active', value: 'true' },
      { displayValue: 'InActive', value: 'false' },
    ],
  },
];
