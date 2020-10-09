import { GroupList } from '../../models/group.model';
import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import { GroupedUsersListResponse } from '../../models/userGroupPostRequest';
import { GroupPostRequest } from '../../models/group-post-request.model';
import { GroupPutRequest } from '../../models/group-put-request.model';
import { TestRequest } from '@angular/common/http/testing';
import { UnmappedUserResponse } from '../../models/group-response.model';
import { TableColumns } from '../../models/user-table-column-model';
export const groupId: string = '1';
export const groupList: GroupList[] = [
  {
    groupId: '1',
    groupName: 'Group',
    groupDescription: 'GroupDesc',
    totalUsers: 12,
    createdDate: '12-Dec-2020',
    isActive: true,
  },
  {
    groupId: '2',
    groupName: 'GroupT',
    groupDescription: 'GroupDesc',
    totalUsers: 12,
    createdDate: '12-Dec-2020',
    isActive: false,
  },
  {
    groupId: '3',
    groupName: 'GroupTT',
    groupDescription: 'GroupDesc',
    totalUsers: 12,
    createdDate: '12-Dec-2020',
    isActive: true,
  },
];

export const sortingData = '';
export const searchText = '';

export const paginationData: PaginationHeaders = {
  page: 1,
  pageSize: 1,
  pageCount: 1,
  recordCount: 1,
};

export const filter = [
  {
    title: 'Active',
    displayTitle: 'Status',
    dataSource: [
      { displayValue: 'Active', value: 'true' },
      { displayValue: 'Inactive', value: 'false' },
    ],
    value: { displayValue: 'Active', value: 'true' },
  },
];

export const filterProperties = [
  {
    title: 'IsActive',
    displayTitle: 'Status',
    dataSource: [
      { displayValue: 'Active', value: 'true' },
      { displayValue: 'InActive', value: 'false' },
    ],
  },
];

export const addGroupData = [
  {
    groupName: 'Group',
    groupDescription: 'GroupDesc',
    tenantId: 'c25e7207-191d-4853-947d-5153636cf669',
  },
];

export const updateGroupData = [
  {
    groupId: '1',
    groupName: 'Group',
    groupDescription: 'GroupDesc',
    tenantId: 'c25e7207-191d-4853-947d-5153636cf669',
  },
];

export const removeUser: GroupedUsersListResponse[] = [
  {
    userId: '1',
    name: 'Anu',
    employeeId: '123',
    userName: 'aa@gmail.com',
    dateAdded: '12 Dec 2012',
  },
];

export const addGroup: GroupPostRequest = {
   tenantId: '1',
    groupName: 'group',
    groupDescription: 'group'
}

export const updateGroup: GroupPutRequest = {
  groupId: '1',
  tenantId: '1',
  groupName: 'group',
  groupDescription: 'group',
};


export const unMappedUsers: any[] = [{
  userId: '1',
  employeeId: '123',
  userName: 'testRequest.com',
  name: 'test',
}]


export const groupedUsersTableColumnList: TableColumns[] = [
  {
    index: 1,
    columnName: 'checkbox',
    displayColumn: 'checkbox',
    visible: true,
    isExport: false,
  },
  {
    index: 2,
    columnName: 'name',
    displayColumn: 'Name',
    visible: true,
    isExport: true,
  },
  {
    index: 3,
    columnName: 'employeeId',
    displayColumn: 'Employee Id',
    visible: true,
    isExport: true,
  },
  {
    index: 4,
    columnName: 'userName',
    displayColumn: 'Username',
    visible: true,
    isExport: true,
  },
  {
    index: 5,
    columnName: 'dateAdded',
    displayColumn: 'Date Added',
    visible: true,
    isExport: true,
  },
  {
    index: 6,
    columnName: 'menu',
    displayColumn: 'Menu',
    visible: true,
    isExport: false,
  },
];

