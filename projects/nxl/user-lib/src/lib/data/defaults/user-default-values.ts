import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import { TableColumns } from '../../models/user-table-column-model';


export const initialUserPaginationParams: PaginationHeaders = {
  page: 1,
  pageSize: 5,
  pageCount: 0,
  recordCount: 0,
};

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

export const userTableColumnList: TableColumns[] = [
         {
           index: 1,
           columnName: 'checkbox',
           displayColumn: 'checkbox',
           visible: true,
           isExport: false,
         },
         {
           index: 2,
           columnName: 'firstName',
           displayColumn: 'First Name',
           visible: true,
           isExport: true,
         },

         {
           index: 3,
           columnName: 'lastName',
           displayColumn: 'Last Name',
           visible: true,
           isExport: true,
         },
         {
           index: 4,
           columnName: 'mobilePhone',
           displayColumn: 'Mobile Phone',
           visible: true,
           isExport: true,
         },

         {
           index: 5,
           columnName: 'email',
           displayColumn: 'Email',
           visible: true,
           isExport: true,
         },
         {
           index: 6,
           columnName: 'alternateEmail',
           displayColumn: 'Alternate Email',
           visible: true,
           isExport: true,
         },
         {
           index: 7,
           columnName: 'jobTitle',
           displayColumn: 'Job Title',
           visible: true,
           isExport: true,
         },
         {
           index: 8,
           columnName: 'department',
           displayColumn: 'Department',
           visible: true,
           isExport: true,
         },
         {
           index: 9,
           columnName: 'organization',
           displayColumn: 'Company',
           visible: true,
           isExport: true,
         },
         {
           index: 10,
           columnName: 'countryCode',
           displayColumn: 'Country',
           visible: true,
           isExport: true,
         },
         {
           index: 11,
           columnName: 'address1',
           displayColumn: 'Address Line1',
           visible: true,
           isExport: true,
         },
         {
           index: 12,
           columnName: 'address2',
           displayColumn: 'Address Line2',
           visible: true,
           isExport: true,
         },
         {
           index: 13,
           columnName: 'address3',
           displayColumn: 'Address Line3',
           visible: true,
           isExport: true,
         },
         {
           index: 14,
           columnName: 'address4',
           displayColumn: 'Address Line4',
           visible: true,
           isExport: true,
         },
         {
           index: 15,
           columnName: 'city',
           displayColumn: 'City',
           visible: true,
           isExport: true,
         },
         {
           index: 16,
           columnName: 'stateCode',
           displayColumn: 'State',
           visible: true,
           isExport: true,
         },
         {
           index: 17,
           columnName: 'postalCode',
           displayColumn: 'Zipcode',
           visible: true,
           isExport: true,
         },
         {
           index: 18,
           columnName: 'workPhone',
           displayColumn: 'Work Phone',
           visible: true,
           isExport: true,
         },
         //  {
         //    index: 19,
         //    columnName: 'mobilePhone',
         //    displayColumn: 'Mobile Phone',
         //    visible: false,
         //    isExport: false,
         //    isGroup: true,
         //  },
         //  {
         //    index: 20,
         //    columnName: 'postalCode',
         //    displayColumn: 'Zipcode',
         //    visible: false,
         //    isExport: false,
         //    isGroup: true,
         //  },
         {
           index: 21,
           columnName: 'externalId',
           displayColumn: 'Employee Id',
           visible: true,
           isExport: true,
         },
         {
           index: 22,
           columnName: 'createdOn',
           displayColumn: 'Created',
           visible: true,
           isExport: true,
         },
         {
           index: 23,
           columnName: 'isRegistered',
           displayColumn: 'Registered',
           visible: true,
           isExport: true,
         },
         {
           index: 24,
           columnName: 'isActive',
           displayColumn: 'Status',
           visible: true,
           isExport: true,
         },
         {
           index: 25,
           columnName: 'menu',
           displayColumn: 'Menu',
           visible: true,
           isExport: false,
         },
       ];
export const filterProperties: FilterValues[] = [
  {
    title: 'IsActive',
    displayTitle: 'Status',
    dataSource: [
      { displayValue: 'Active', value: 'true' },
      { displayValue: 'InActive', value: 'false' },
    ],
  },
  {
    title: 'CountryCode',
    displayTitle: 'Country',
    dataSource: [
      { displayValue: 'United States', value: 'United States' },
      { displayValue: 'United Kingdom', value: 'United Kingdom' },
    ],
  },
  // {
  //   title: 'Department',
  //   displayTitle: 'Department',
  //   dataSource: [
  //     { displayValue: 'Business Development', value: 'Business Development' },
  //     { displayValue: 'Product Management', value: 'Product Management' },
  //     { displayValue: 'Research and Development', value: 'Research and Development' },
  //     { displayValue: 'Marketing', value: 'Marketing' },
  //     { displayValue: 'Engineering', value: 'Engineering' },
  //     { displayValue: 'Sales', value: 'Sales' },
  //     { displayValue: 'Training', value: 'Training' },
  //     { displayValue: 'Human Resources', value: 'Human Resources' },
  //   ],
  // },
];

export const defaultPermission: any = [
  {
    moduleName: 'User',
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    moduleName: 'Tenant',
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    moduleName: 'Point',
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    moduleName: 'Configuration',
    create: false,
    read: false,
    update: false,
    delete: false,
  },
];
