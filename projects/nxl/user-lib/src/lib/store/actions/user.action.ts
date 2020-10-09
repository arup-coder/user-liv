import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import { TableColumns } from '../../models/user-table-column-model';
import { UserPostRequest } from '../../models/user-post-request.model';
import { UserPutRequest } from '../../models/user-put-request.model';
import { RegistrationFields } from '../../models/user-registration-fields-names.model';
import { UserPermissionResponse } from '../../models/user-permission-response.model';
import { UserPermissionsPostRequest } from '../../models/user-permission-post-request.model';
import { GroupList } from '../../models/group.model';
import { GroupPostRequest } from '../../models/group-post-request.model';
import { GroupPutRequest } from '../../models/group-put-request.model';
import { GroupedUsersListResponse } from '../../models/userGroupPostRequest';

import { UserRequest } from '../../models/user-request.model';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';
// load user

export const loadUsers = createAction(
  '[User] Load Users',
  props<{
    payload: {
      pagination: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
      tenantId: string;
      groupId?: string;
    };
  }>(),
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{
    payload: {
      body: User[];
      headers: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
    };
  }>(),
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ payload: string }>(),
);

// create user

export const addUser = createAction(
  '[User] Add User',
  props<{
    payload: {
      body: UserRequest;
      tenantId: string;
    };
  }>(),
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{
    payload: {
      body: User;
      route: any;
    };
  }>(),
);

export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{
    payload: string;
    route: any;
  }>(),
);
// update user

export const updateUser = createAction(
  '[User] Update User',
  props<{
    payload: {
      body: {
        request: UserPutRequest;
        isRegistered: boolean;
      };
      selectedUserId: string;
      tenantId: string;
    };
  }>(),
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{
    payload: {
      body: User;
      route: any;
    };
  }>(),
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ payload: string }>(),
);

// // import user

// export const downloadUserTemplate = createAction('[User] Download User Template');

// export const downloadUserTemplateSuccess = createAction(
//   '[User] Download User Template Success',
//   props<{
//     payload: {
//       body?: any;
//       headers: string;
//     };
//   }>(),
// );

// export const downloadUserTemplateFailure = createAction(
//   '[User] Download User Template Failure',
//   props<{ payload: string }>(),
// );

// delete User

export const deleteUser = createAction(
  '[User] Delete User',
  props<{
    payload: {
      deleteUserId: string;
    };
  }>(),
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{
    payload: {
      deleteUserId: string;
    };
  }>(),
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ payload: string }>(),
);

// user sorting Actions

export const sortUsers = createAction(
  '[User] Sort Users',
  props<{
    payload: {
      sort: string;
    };
  }>(),
);

// user pagination Actions
export const userPaginationChange = createAction(
  '[User] User Pagination Change',
  props<{
    payload: {
      pagination: PaginationHeaders;
    };
  }>(),
);

// user filter value Actions

export const filterValueUsers = createAction(
  '[User] Filter Users',
  props<{
    payload: {
      filter: FilterValues[];
    };
  }>(),
);

// user filter Actions

export const filterOnOff = createAction(
  '[User] Filter On Off',
  props<{
    payload: {
      filter: FilterValues[];
      showFilter: boolean;
    };
  }>(),
);
// user selection Actions
export const userSelectionOnOff = createAction(
  '[User] User Selection On Off',
  props<{
    payload: {
      userSelection: boolean;
    };
  }>(),
);
//user displaycolumn List

export const userTableColumnsVisableChange = createAction(
  '[User] Table Columns Visible Change',
  props<{
    payload: {
      tableColumnsChange: TableColumns[];
    };
  }>(),
);

// user search Actions
export const userSearch = createAction(
  '[User] User Search',
  props<{
    payload: {
      searchText: string;
    };
  }>(),
);

//user selection List
export const userSelectionChange = createAction(
  '[User] Users Selection List Change',
  props<{
    payload: {
      selectedUsers: User[];
      users: User[];
    };
  }>(),
);

// current  User Get data

export const userProfile = createAction(
  '[User] Get User Profile',
  props<{
    payload: {
      profileUserId: string;
      tenantId: string;
    };
  }>(),
);
export const userProfileSuccess = createAction(
  '[User] Get User Profile Success',
  props<{
    payload: {
      body: User[];
    };
  }>(),
);
export const userProfileFailure = createAction(
  '[User] Get User Profile Failure',
  props<{ payload: string }>(),
);

// Active/Inactive user action
export const activateUsers = createAction(
  '[User] activate Users',
  props<{
    payload: {
      userIds: string[];
      tenantId: string;
    };
  }>(),
);

export const activateUsersSuccess = createAction(
  '[User] activate Users Success',
  props<{
    payload: {
      userIds: string[];
    };
  }>(),
);

export const activateUsersFailure = createAction(
  '[User] activate Users Failure',
  props<{ payload: string }>(),
);

export const deActivateUsers = createAction(
  '[User] deActivate Users',
  props<{
    payload: {
      userIds: string[];
      tenantId: string;
    };
  }>(),
);

export const deActivateUsersSuccess = createAction(
  '[User] deActivate Users Success',
  props<{
    payload: {
      userIds: string[];
    };
  }>(),
);

export const deActivateUsersFailure = createAction(
  '[User] deActivate Users Failure',
  props<{ payload: string }>(),
);

export const mappingValueChange = createAction(
  '[User] Mapping Values changed',
  props<{
    payload: {
      mappingFields: any;
    };
  }>(),
);

export const getPreviewList = createAction(
  '[User] Get Preview List',
  props<{
    payload: {
      previewList: any;
    };
  }>(),
);

export const loadPreviewUsers = createAction(
  '[User] Load Preview Users',
  props<{
    payload: {
      previewList: UserPostRequest[];
      tenantId: string;
    };
  }>(),
);

export const loadPreviewUsersSuccess = createAction(
  '[User] Load Preview Users Success',
  props<{
    payload: {
      body: User[];
    };
  }>(),
);
export const loadPreviewUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ payload: string }>(),
);

// Export User Product
export const exportAllUserProducts = createAction(
  '[User] Export All User Products',
  props<{
    payload: {
      exportHeaderList: TableColumns[];
      sort: string;
      tenantId: string;
    };
  }>(),
);

export const exportAllUserProductsSuccess = createAction('[User] Export All User Products Success');

export const exportAllUserProductsFailure = createAction(
  '[User] Export All User Products Failure',
  props<{ payload: string }>(),
);

// Export User Product
export const exportCurrentSearchUserProducts = createAction(
  '[User] Export Searched  User Products',
  props<{
    payload: {
      filterValues: FilterValues[];
      searchText: string;
      exportHeaderList: TableColumns[];
      sort: string;
      tenantId: string;
    };
  }>(),
);

export const exportCurrentSearchUserProductsSuccess = createAction(
  '[User] Export Searched User Products Success',
);

export const exportCurrentSearchUserProductsFailure = createAction(
  '[User] Export Searched User Products Failure',
  props<{ payload: string }>(),
);

// Update Registered User
export const updateUnRegisteredUser = createAction(
  '[User] Update Register User Details',
  props<{
    payload: {
      body: UserPutRequest;
      userId: string;
      tenantId: string;
    };
  }>(),
);

export const updateUnRegisteredUserSuccess = createAction(
  '[User] Update Register User Details Success',
  props<{
    payload: {
      body: User[];
      route: any;
    };
  }>(),
);

export const updateUnRegisteredUserFailure = createAction(
  '[User] Update Register User Details Failure',
  props<{
    payload: string;
    route: any;
  }>(),
);

// Update Registered User
export const registerUser = createAction(
  '[User] Register User',
  props<{
    payload: {
      body: UserPutRequest;
      userId: string;
      tenantId: string;
      actionType: string;
    };
  }>(),
);

export const registerUserSuccess = createAction('[User] Register User Success');

export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{
    payload: string;
  }>(),
);

// Create Register User
export const createUnRegisteredUser = createAction(
  '[User] Create Register User Details',
  props<{
    payload: {
      body: UserPostRequest[];
      tenantId: string;
    };
  }>(),
);

export const createUnRegisteredUserSuccess = createAction(
  '[User] Create Register User Details Success',
  props<{
    payload: {
      body: User;
      route: any;
    };
  }>(),
);

export const createUnRegisteredUserFailure = createAction(
  '[User] Create Register User Details Failure',
  props<{
    payload: string;
    route: any;
  }>(),
);

// Update User Profile
export const updateUserProfile = createAction(
  '[User] Update User Profile',
  props<{
    payload: {
      body: {
        request: UserPutRequest;
        isRegistered: boolean;
      };
      userId: string;
      tenantId: string;
    };
  }>(),
);

export const updateUserProfileSuccess = createAction(
  '[User] Update User Profile Success',
  props<{
    payload: {
      body: User[];
      route: any;
    };
  }>(),
);

export const updateUserProfileFailure = createAction(
  '[User] Update User Profile Failure',
  props<{
    payload: string;
    route: any;
  }>(),
);

//  load user Permissions
export const loadUserPermissionsSetting = createAction(
  '[Permission] Load  User PermissionsSetting',
  props<{
    payload: {
      userId: string;
    };
  }>(),
);
export const loadUserPermissionsSettingSuccess = createAction(
  '[Permission] Load User PermissionsSetting Success',
  props<{ payload: UserPermissionResponse[] }>(),
);
export const loadUserPermissionsSettingFailure = createAction(
  '[Permission] Load User PermissionsSetting Failure',
  props<{ payload: string }>(),
);

// update PermissionsSetting

export const updateUserPermissionsSetting = createAction(
  '[Permission] Update User PermissionsSetting',
  props<{
    payload: {
      body: UserPermissionsPostRequest[];
      userId: string;
    };
  }>(),
);

export const updateUserPermissionsSettingSuccess = createAction(
  '[Permission] Update User PermissionsSetting Success'
);

export const updateUserPermissionsSettingFailure = createAction(
  '[Permission] Update User PermissionsSetting Failure',
  props<{ payload: string }>(),
);

export const clearUserPermissionsSetting = createAction(
  '[Permission] Clear User PermissionsSetting'
);

// Load User Fields Names
export const loadUserFieldsNames = createAction(
  '[User] Load User Fields Names',
  props<{
    payload: RegistrationFields[];
  }>(),
);

// Load User Fields Names
export const clearUserState = createAction('[User] clear User State');

// load groups
export const loadGroupsList = createAction(
  '[User] Load Groups',
  props<{
    payload: {
      pagination: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
      tenantId: string;
    };
  }>(),
);
export const loadGroupsListSuccess = createAction(
  '[User] Load Groups Success',
  props<{
    payload: {
      body: GroupList[];
      headers: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
    };
  }>(),
);
export const loadGroupsFailure = createAction(
  '[User] Load Groups Failure',
  props<{ payload: string }>(),
);

// group filter value Actions
export const filterValueGroups = createAction(
  '[User] Filter Groups',
  props<{
    payload: {
      filter: FilterValues[];
    };
  }>(),
);

// group pagination Actions
export const groupPaginationChange = createAction(
  '[User] Group Pagination Change',
  props<{
    payload: {
      pagination: PaginationHeaders;
    };
  }>(),
);

// group filter Actions

export const gorupFilterOnOff = createAction(
  '[User] Group Filter On Off',
  props<{
    payload: {
      filter: FilterValues[];
      showFilter: boolean;
    };
  }>(),
);

// group search Actions
export const userGroupSearch = createAction(
  '[User] Group Search',
  props<{
    payload: {
      searchText: string;
    };
  }>(),
);

// Active/Inactive group action
export const updateGroupStatus = createAction(
  '[User] Update Group Status',
  props<{
    payload: {
      groupIds: string[];
      status: boolean;
    };
  }>(),
);

export const updateGroupStatusSuccess = createAction(
  '[User] Update Group Status Success',
  props<{
    payload: {
      groupIds: string[];
      status: boolean;
    };
  }>(),
);

export const updateGroupStatusFailure = createAction(
  '[User] Update Group Status Failure',
  props<{ payload: string }>(),
);

// group selection Actions
export const groupSelectionOnOff = createAction(
  '[User] Group Selection On Off',
  props<{
    payload: {
      groupSelection: boolean;
    };
  }>(),
);

//group selection List
export const groupSelectionChange = createAction(
  '[User] Groups Selection List Change',
  props<{
    payload: {
      selectedGroups: GroupList[];
      groups: GroupList[];
    };
  }>(),
);

// group sorting Actions

export const sortGroups = createAction(
  '[User] Sort Groups',
  props<{
    payload: {
      sort: string;
    };
  }>(),
);

// create group

export const addGroup = createAction(
  '[User] Add Group',
  props<{
    payload: {
      tenantId: string;
      body: GroupPostRequest;
    };
  }>(),
);

export const addGroupSuccess = createAction(
  '[User] Add Group Success',
  props<{
    payload: {
      body: GroupList;
      route?: any;
    };
  }>(),
);

export const addGroupFailure = createAction(
  '[User] Add Group Failure',
  props<{
    payload: string;
  }>(),
);

// update group

export const updateGroup = createAction(
  '[User] Update Group',
  props<{
    payload: {
      body: GroupPutRequest;
    };
  }>(),
);

export const updateGroupSuccess = createAction(
  '[User] Update Group Success',
  props<{
    payload: {
      body: GroupPutRequest;
      groupId: string;
      route?: any;
    };
  }>(),
);

export const updateGroupFailure = createAction(
  '[User] Update Group Failure',
  props<{ payload: string }>(),
);

// Get all users for add users to a group
export const getUnMappedUsers = createAction(
  '[User] Get UnMapped Users',
  props<{
    payload: {
      tenantId: string;
      groupId: string;
      pagination: PaginationHeaders;
      searchText: string;
    };
  }>(),
);

export const getUnMappedUsersSuccess = createAction(
  '[User] Get UnMapped Users Success',
  props<{
    payload: {
      body: User[];
      headers: PaginationHeaders;
      searchText: string;
      route: any;
    };
  }>(),
);
export const getUnMappedUsersFailure = createAction(
  '[User] Get UnMapped Users Failure',
  props<{ payload: string }>(),
);

// group pagination Actions
export const addUsersGroupPaginationChange = createAction(
  '[User] Users List Pagination Change',
  props<{
    payload: {
      pagination: PaginationHeaders;
    };
  }>(),
);

// group search Actions
export const addUserGroupSearch = createAction(
  '[User] Add Users Search',
  props<{
    payload: {
      searchText: string;
    };
  }>(),
);

//user selection List
export const groupAddUserListSelectionChange = createAction(
  '[User] Group Add Users Selection List Change',
  props<{
    payload: {
      selectedUsers: User[];
      users: User[];
    };
  }>(),
);

// add users to a group

export const addUsersToGroup = createAction(
  '[User] Add Users To Group',
  props<{
    payload: {
      groupId: string;
      selectedUsers: User[];
    };
  }>(),
);

export const addUsersToGroupSuccess = createAction(
  '[User] Add Users To Group Success',
  props<{
    payload: {
      body: UserPostRequest[];
      route?: any;
    };
  }>(),
);

export const addUsersToGroupFailure = createAction(
  '[User] Add Users To Group Failure',
  props<{
    payload: string;
  }>(),
);

//  load grouped user

export const loadGroupedUsers = createAction(
  '[User] Load Grouped Users',
  props<{
    payload: {
      pagination: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
      groupId: string;
    };
  }>(),
);
export const loadGroupedUsersSuccess = createAction(
  '[User] Load Grouped Users Success',
  props<{
    payload: {
      body: User[];
      headers: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
    };
  }>(),
);

export const loadGroupedUsersFailure = createAction(
  '[User] Load Grouped Users Failure',
  props<{ payload: string }>(),
);

//grouped users list displaycolumn List

export const groupedUserTableColumnsChange = createAction(
  '[User] Table Columns  Change',
  props<{
    payload: {
      tableColumnsChange: TableColumns[];
    };
  }>(),
);

//grouped user pagination Actions
export const groupedUsersPaginationChange = createAction(
  '[User] Grouped Users Pagination Change',
  props<{
    payload: {
      pagination: PaginationHeaders;
    };
  }>(),
);

// user sorting Actions

export const groupedUsersSort = createAction(
  '[User] Grouped Users Sort',
  props<{
    payload: {
      sort: string;
    };
  }>(),
);

//grouped user selection List
export const groupedUsersSelectionChange = createAction(
  '[User] Groupped Users Selection Change',
  props<{
    payload: {
      selectedUsers: User[];
      users: User[];
    };
  }>(),
);

//grouped user filter Actions

export const groupedUsersfilterOnOff = createAction(
  '[User] Groupped Users Filter On Off',
  props<{
    payload: {
      filter: FilterValues[];
      showFilter: boolean;
    };
  }>(),
);

// user selection Actions
export const grouppedUserSelectionOnOff = createAction(
  '[User] Groupped User Selection On Off',
  props<{
    payload: {
      userSelection: boolean;
    };
  }>(),
);

// remove user from group
export const removeUser = createAction(
  '[User] Remove User From Group',
  props<{
    payload: {
      selectedUser: GroupedUsersListResponse[];
      groupId: string;
    };
  }>(),
);

export const removeUserSuccess = createAction(
  '[User] Remove User From Group Success',
  props<{
    payload: {
      body: any[];
    };
  }>(),
);

export const removeUserFailure = createAction(
  '[User] Remove User From Group Failure',
  props<{ payload: string }>(),
);

//grouped user search Actions
export const groupedUserSearch = createAction(
  '[User] Grouped User Search',
  props<{
    payload: {
      searchText: string;
    };
  }>(),
);

// Export Grouped User Product
export const exportAllGroupedUsers = createAction(
  '[User] Export All Grouped User Products',
  props<{
    payload: {
      exportHeaderList: TableColumns[];
      sort: string;
      groupId: string;
    };
  }>(),
);

export const exportAllGroupedUsersSuccess = createAction(
  '[User] Export All Grouped User Products Success',
);

export const exportAllGroupedUsersFailure = createAction(
  '[User] Export All Grouped User Products Failure',
  props<{ payload: string }>(),
);

export const getAllGroupedUser = createAction(
  '[User] Get All Grouped Users',
  props<{
    payload: {
      groupId: string;
    };
  }>(),
);

export const getAllGroupedUsersSuccess = createAction(
  '[User] Get All Grouped Users Success',
  props<{
    payload: any;
  }>(),
);

export const getAllGroupedUsersFailure = createAction(
  '[User] Get All Grouped Users Failure',
  props<{
    payload: string;
  }>(),
);

// Load Country List
export const loadCountryList = createAction('[User] load Country list');

export const loadCountryListSuccess = createAction(
  '[User] load Country list Success',
  props<{
    payload: { body: Country[] };
  }>(),
);

export const loadCountryListFailure = createAction(
  '[User] load Country list Failure',
  props<{
    payload: string;
  }>(),
);

// Load State List
export const loadStateList = createAction(
  '[User] load State list',
  props<{
    payload: string;
  }>(),
);
// Load State List
export const loadStateListSuccess = createAction(
  '[User] load State list Success',
  props<{
    payload: {
      body: State[];
    };
  }>(),
);

// Load State List
export const loadStateListFailure = createAction(
  '[User] load State list Failure',
  props<{
    payload: string;
  }>(),
);

// verify companyCode
export const verifyUserCompanyCode = createAction(
  '[User] Verify User Company Code',
  props<{
    payload: string;
  }>(),
);

// verify companyCode success
export const verifyUserCompanyCodeSuccess = createAction(
  '[User] Verify User Company Code Success',
  props<{
    payload: string;
  }>(),
);
// verify companyCode failure
export const verifyUserCompanyCodeFailure = createAction(
  '[User] Verify User Company Code Failure',
  props<{
    payload: string;
  }>(),
);

// clear UserDefaultTenant
export const clearUserDefaultTenant = createAction('[User] Clear UserDefaultTenantID');

// clear UserDefaultTenant
export const getDomainTenant = createAction(
  '[Tenant] Get Domain Tenant',
  props<{
    payload: string;
  }>(),
);

// clear UserDefaultTenant
export const getDomainTenantSuccess = createAction(
  '[Tenant] Get Domain Tenant Success',
  props<{
    payload: string;
  }>(),
);

// clear UserDefaultTenant
export const getDomainTenantFailure = createAction(
  '[Tenant] Get Domain Tenant Success',
  props<{
    payload: string;
  }>(),
);

export const loadAddUsers = createAction(
  '[User] Load Add Users',
  props<{
    payload: {
      pagination: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
      tenantId: string;
      groupId?: string;
    };
  }>(),
);
export const loadAddUsersSuccess = createAction(
  '[User] Load Add Users Success',
  props<{
    payload: {
      body: User[];
      headers: PaginationHeaders;
      sort: string;
      filter: FilterValues[];
      searchText: string;
      route: any;
    };
  }>(),
);
export const loadAddUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ payload: string }>(),
);

// Load User TenantIds
export const loadUserTenantIds = createAction(
  '[User] load User Tenant Ids',
  props<{
    payload: {
      userId: string;
    };
  }>(),
);
export const loadUserTenantIdsSuccess = createAction(
  '[User] load User Tenant Ids Success',
  props<{
    payload: {
      body: string[];
    };
  }>(),
);
export const loadUserTenantIdsFailure = createAction(
  '[User] load User Tenant Ids Failure',
  props<{ payload: string }>(),
);