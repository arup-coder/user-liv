import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/user.action';
import { User } from '../../models/user.model';
import { PaginationHeaders, FilterValues } from '../../models/user-response.model';
import { userTableColumnList } from '../../data/defaults/user-default-values';
import { groupedUsersTableColumnList } from '../../data/defaults/user-default-values';
import { TableColumns } from '../../models/user-table-column-model';
import {
  funSetIsSelect,
  funGetMappingValues,
  funGroupSetIsSelect,
  funGetGroupedUsers,
  funConcatList,
  funConstructPayload,
} from '../../functions/index';
import { UserMappingFields } from '../../models/user-mapping-fields.model';
import { RegistrationFields } from '../../models/user-registration-fields-names.model';
import { UserPermissionResponse } from '../../models/user-permission-response.model';
import { GroupList } from '../../models/group.model';
import { selectedUsers } from '../../data/test/user-test-data';
import { Country } from '../../models/user-country.model';
import { State } from '../../models/user-state.model';
import { state } from '@angular/animations';
export const elementFeatureKey = 'user';

export interface UserState {
  users: User[];
  usersTablePage: PaginationHeaders;
  usersTableSort: string;
  usersTableFilterDataSource: FilterValues[];
  usersShowFilters: boolean;
  userShowSelection: boolean;
  usersTableFilter: FilterValues[];
  usersTableSearch: string;
  isLoaded: boolean;
  isLoading: boolean;
  errorMessage: string;
  displayColumnList: TableColumns[];
  mappingFields: UserMappingFields[];
  selectedUsers: User[];
  activateUsersErrorMessage: string;
  deActivateUsersErrorMessage: string;
  userProfileLoaded: boolean;
  userProfile: User[];
  userTenantIds: string[];
  previewUsersList: User[];
  userFiledsNames: RegistrationFields[];
  isLoadedSelectedUserPermission: boolean;
  isLoadingSelectedUserPermission: boolean;
  selectedUserPermissions: UserPermissionResponse[];
  selectedUserPermissionErrorMessage: string;
  groupList: GroupList[];
  groupsTablePage: PaginationHeaders;
  groupsTableSort: string;
  groupsTableFilter: FilterValues[];
  groupsTableSearch: string;
  groupsTableFilterDataSource: FilterValues[];
  groupShowSelection: boolean;
  selectedGroups: GroupList[];
  groupsShowFilters: boolean;
  groupedUsersList: any[];
  groupedUsersPagination: PaginationHeaders;
  groupedUsersSearch: string;
  groupedUsersSort: string;
  groupedUsersFilter: FilterValues[];
  groupedUsersFilterDataSource: FilterValues[];
  groupedUsersShowSelection: boolean;
  groupedSelectedUsers: User[];
  groupedUsersShowFilters: boolean;
  groupedUsersColumnList: TableColumns[];
  allGroupedUsers: any[];
  addGroupUsersList: User[];
  addGroupUsersSearchText: string;
  addGroupUsersPagination: PaginationHeaders;
  addGroupSelectedUser: User[];
  addUsersShowSelection: boolean;
  country: {
    isLoaded: boolean;
    isLoading: boolean;
    errorMessage: string;
    countryList: Country[];
  };
  state: {
    isLoaded: boolean;
    isLoading: boolean;
    errorMessage: string;
    stateList: State[];
  };
  userVerifyCompanyCodeTenantId: string;
  domainTenantId: string;
}

export interface UserProfileState {
  isLoadedProfile: boolean;
  isLoadingProfile: boolean;
  errorMessageprofile: string;
  userProfile: User;
}

export const initialUserProfileState: UserProfileState = {
  isLoadedProfile: false,
  isLoadingProfile: false,
  errorMessageprofile: null,
  userProfile: null,
};
 
export const initialUserState: UserState = {
  users: [],
  usersTablePage: null,
  usersTableSort: '',
  usersTableFilterDataSource: null,
  usersShowFilters: false,
  userShowSelection: false,
  usersTableFilter: null,
  usersTableSearch: '',
  isLoaded: false,
  isLoading: false,
  errorMessage: null,
  displayColumnList: userTableColumnList.map(x => Object.assign({}, x)),

  mappingFields: [],
  selectedUsers: [],
  userProfileLoaded: false,
  userProfile: null,
  previewUsersList: [],
  userTenantIds: [],

  userFiledsNames: null,
  isLoadedSelectedUserPermission: false,
  isLoadingSelectedUserPermission: false,
  selectedUserPermissions: null,
  selectedUserPermissionErrorMessage: null,

  groupList: [],
  groupsTablePage: null,
  groupsTableSort: '',
  groupsTableFilter: null,
  groupsTableSearch: '',
  groupsTableFilterDataSource: null,
  groupShowSelection: false,
  selectedGroups: [],
  groupsShowFilters: false,

  groupedUsersList: [],
  groupedUsersPagination: null,
  groupedUsersSort: '',
  groupedUsersFilter: null,
  groupedUsersSearch: '',
  groupedUsersFilterDataSource: null,
  groupedUsersShowSelection: false,
  groupedSelectedUsers: [],
  groupedUsersShowFilters: false,
  groupedUsersColumnList: groupedUsersTableColumnList.map(x => Object.assign({}, x)),
  allGroupedUsers: [],
  addGroupUsersList: [],
  addGroupUsersSearchText: '',
  addGroupUsersPagination: null,
  addGroupSelectedUser: [],
  addUsersShowSelection: false,
  state: {
    isLoaded: false,
    isLoading: false,
    errorMessage: '',
    stateList: null,
  },
  country: {
    isLoaded: false,
    isLoading: false,
    errorMessage: '',
    countryList: null,
  },
  userVerifyCompanyCodeTenantId: null,
  domainTenantId: null,
  activateUsersErrorMessage: null,
  deActivateUsersErrorMessage: null,
};

const userReducer = createReducer(
  initialUserState,
  // load users
  on(fromActions.loadUsers, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.loadUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    users: funSetIsSelect(payload.body, state.selectedUsers),
    usersTablePage: {
      page: payload.headers.page,
      pageSize: payload.headers.pageSize,
      pageCount: payload.headers.pageCount,
      recordCount: payload.headers.recordCount,
    },
    usersTableSort: payload.sort,
    usersTableFilter: payload.filter,
    usersTableSearch: payload.searchText,
  })),
  on(fromActions.loadUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  // Get Profile
  on(fromActions.userProfile, state => ({
    ...state,
    isLoadingProfile: true,
    isLoadedProfile: false,
    isLoading: true,
    isLoaded: false,
    errorMessageProfile: null,
    userProfileLoaded: false,
  })),
  on(fromActions.userProfileSuccess, (state, { payload }) => ({
    ...state,
    isLoadingProfile: false,
    isLoadedProfile: true,
    isLoading: false,
    isLoaded: true,
    userProfile: payload.body,
    userProfileLoaded: true,
  })),
  on(fromActions.userProfileFailure, (state, { payload }) => ({
    ...state,
    isLoadingProfile: false,
    isLoadedProfile: false,
    userProfile: null,
    errorMessageProfile: payload,
    userProfileLoaded: false,
  })),
  // add user
  on(fromActions.addUser, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.addUserSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    users: state.users.concat(payload.body),
  })),
  on(fromActions.addUserFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  // update user
  on(fromActions.updateUser, state => ({ ...state, isLoading: true, isLoaded: false })),
  on(fromActions.updateUserSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      users: state.users.map(user => {
        return user.userId === payload.body.userId
          ? Object.assign({}, user, { value: payload.body })
          : user;
      }),
    };
  }),
  on(fromActions.updateUserFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),

  on(fromActions.sortUsers, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    usersTableSort: payload.sort,
  })),
  on(fromActions.userPaginationChange, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: '',
    usersTablePage: payload.pagination,
  })),
  on(fromActions.filterValueUsers, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    usersTableFilter: payload.filter,
  })),
  on(fromActions.filterOnOff, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    usersTableFilterDataSource: payload.filter,
    usersShowFilters: payload.showFilter,
  })),
  on(fromActions.userSelectionOnOff, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    userShowSelection: payload.userSelection,
  })),

  on(fromActions.userTableColumnsVisableChange, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    displayColumnList: payload.tableColumnsChange,
  })),
  on(fromActions.userSearch, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    usersTableSearch: payload.searchText,
  })),

  on(fromActions.userSelectionChange, (state, { payload }) => ({
    ...state,
    selectedUsers: payload.selectedUsers,
    users: payload.users,

    userShowSelection: payload.selectedUsers
      ? payload.selectedUsers.length
        ? true
        : false
      : false,
  })),
  on(fromActions.activateUsers, state => ({ ...state })),
  on(fromActions.activateUsersSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      selectedUsers: [],
      userShowSelection: false,
      users: funSetIsSelect(
        state.users.map(users => {
          const found = payload.userIds.find(user => user === users.userId);
          return found ? Object.assign({}, users, { isActive: true }) : users;
        }),
        [],
      ),
    };
  }),
  on(fromActions.activateUsersFailure, (state, { payload }) => ({
    ...state,
    activateUsersErrorMessage: payload,
  })),

  on(fromActions.deActivateUsers, state => ({ ...state })),
  on(fromActions.deActivateUsersSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      selectedUsers: [],
      userShowSelection: false,
      users: funSetIsSelect(
        state.users.map(users => {
          const found = payload.userIds.find(user => user === users.userId);
          return found ? Object.assign({}, users, { isActive: false }) : users;
        }),
        [],
      ),
    };
  }),
  on(fromActions.deActivateUsersFailure, (state, { payload }) => ({
    ...state,
    deActivateUsersErrorMessage: payload,
  })),

  on(fromActions.mappingValueChange, (state, { payload }) => ({
    ...state,
    mappingFields: funGetMappingValues(state.mappingFields, payload.mappingFields),
  })),
  on(fromActions.getPreviewList, (state, { payload }) => ({
    ...state,
    previewUsersList: payload.previewList,
  })),

  // load preview users
  on(fromActions.loadPreviewUsers, (state, { payload }) => ({
    ...state,
    previewUsersList: payload.previewList,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.loadPreviewUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    users: state.users.concat(payload.body),
    usersTablePage: {
      page: state.usersTablePage.page,
      pageSize: state.usersTablePage.pageSize,
      pageCount: state.users.length / state.usersTablePage.pageSize,
      recordCount: state.users.length + payload.body.length,
    },
  })),
  on(fromActions.loadPreviewUsersFailure, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
  })),

  on(fromActions.updateUnRegisteredUserSuccess, (state, { payload }) => ({
    ...state,
    userProfile: payload.body,
  })),
  on(fromActions.updateUserProfileSuccess, (state, { payload }) => ({
    ...state,
    userProfile: payload.body,
  })),
  on(fromActions.createUnRegisteredUserSuccess, (state, { payload }) => ({
    ...state,
    userProfile: [payload.body],
  })),
  on(fromActions.loadUserFieldsNames, (state, { payload }) => ({
    ...state,
    userFiledsNames: payload,
  })),

  //Get permission by userId
  on(fromActions.loadUserPermissionsSetting, state => ({
    ...state,
    isLoadingSelectedUserPermission: true,
    isLoadedSelectedUserPermission: false,
  })),
  on(fromActions.loadUserPermissionsSettingSuccess, (state, { payload }) => ({
    ...state,
    isLoadingSelectedUserPermission: false,
    isLoadedSelectedUserPermission: true,
    selectedUserPermissions: payload,
  })),
  on(fromActions.loadUserPermissionsSettingFailure, state => ({
    ...state,
    isLoadingSelectedUserPermission: false,
    isLoadedSelectedUserPermission: false,
    errorMessage: 'error',
  })),
  // update PermissionsSetting
  on(fromActions.updateUserPermissionsSetting, state => ({
    ...state,
    isLoadingSelectedUserPermission: true,
    isLoadedSelectedUserPermission: false,
  })),
  on(fromActions.updateUserPermissionsSettingSuccess, state => ({
    ...state,
    selectedUserPermissions: null,
  })),
  on(fromActions.updateUserPermissionsSettingFailure, (state, { payload }) => ({
    ...state,

    selectedUserPermissionErrorMessage: payload,
    selectedUserPermissions: null,
  })),
  on(fromActions.clearUserPermissionsSetting, (state, {}) => ({
    ...state,
    selectedUserPermissions: null,
  })),

  // load users
  on(fromActions.loadGroupsList, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.loadGroupsListSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    groupList: funGroupSetIsSelect(payload.body, state.selectedGroups),
    groupsTablePage: {
      page: payload.headers.page,
      pageSize: payload.headers.pageSize,
      pageCount: payload.headers.pageCount,
      recordCount: payload.headers.recordCount,
    },
    groupsTableSort: payload.sort,
    groupsTableFilter: payload.filter,
    groupsTableSearch: payload.searchText,
  })),
  on(fromActions.loadGroupsFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  on(fromActions.gorupFilterOnOff, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupsTableFilterDataSource: payload.filter,
    groupsShowFilters: payload.showFilter,
  })),
  on(fromActions.filterValueGroups, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupsTableFilter: payload.filter,
  })),
  on(fromActions.groupPaginationChange, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: '',
    groupsTablePage: payload.pagination,
  })),
  on(fromActions.userGroupSearch, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupsTableSearch: payload.searchText,
  })),
  on(fromActions.updateGroupStatus, state => ({ ...state })),
  on(fromActions.updateGroupStatusSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      selectedGroups: [],
      groupShowSelection: false,
      groupList: funGroupSetIsSelect(
        state.groupList.map(groups => {
          const found = payload.groupIds.find(group => group === groups.groupId);
          return found ? Object.assign({}, groups, { isActive: payload.status }) : groups;
        }),
        [],
      ),
    };
  }),
  on(fromActions.updateGroupStatusFailure, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
  })),
  on(fromActions.groupSelectionChange, (state, { payload }) => ({
    ...state,
    selectedGroups: payload.selectedGroups,
    groupList: payload.groups,

    groupShowSelection: payload.selectedGroups
      ? payload.selectedGroups.length
        ? true
        : false
      : false,
  })),
  on(fromActions.sortGroups, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupsTableSort: payload.sort,
  })),

  // add group
  on(fromActions.addGroup, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.addGroupSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    groupList: state.groupList.concat(payload.body),
  })),
  on(fromActions.addGroupFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  // update group
  on(fromActions.updateGroup, state => ({ ...state, isLoading: true, isLoaded: false })),
  on(fromActions.updateGroupSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      groupList: state.groupList.map(group => {
        return group.groupId === payload.body.groupId ? Object.assign(group, payload.body) : group;
      }),
    };
  }),
  on(fromActions.updateGroupFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),

  on(fromActions.getUnMappedUsers, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.getUnMappedUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    addGroupUsersList: funSetIsSelect(payload.body, state.addGroupSelectedUser),
    addGroupUsersPagination: {
      page: payload.headers.page,
      pageSize: payload.headers.pageSize,
      pageCount: payload.headers.pageCount,
      recordCount: payload.headers.recordCount,
    },
    addGroupUsersSearchText: payload.searchText,
  })),
  on(fromActions.getUnMappedUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  on(fromActions.addUserGroupSearch, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    addGroupUsersSearchText: payload.searchText,
  })),
  on(fromActions.addUsersGroupPaginationChange, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: '',
    addGroupUsersPagination: payload.pagination,
  })),
  on(fromActions.groupAddUserListSelectionChange, (state, { payload }) => ({
    ...state,
    addGroupSelectedUser: payload.selectedUsers,
    addGroupUsersList: payload.users,
    addUsersShowSelection: payload.selectedUsers
      ? payload.selectedUsers.length
        ? true
        : false
      : false,
  })),

  // add group
  on(fromActions.addUsersToGroup, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    // addGroupSelectedUser: [],
  })),
  on(fromActions.addUsersToGroupSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    allGroupedUsers: state.allGroupedUsers.concat(payload.body),
    groupedUsersList: funConcatList(
      state.groupedUsersList,
      payload.body,
    ),
    groupedUsersPagination: {
      page: state.groupedUsersPagination.page,
      pageSize: state.groupedUsersPagination.pageSize,
      pageCount: (state.groupedUsersPagination.pageCount + payload.body.length) / 5,
      recordCount: state.groupedUsersPagination.recordCount + payload.body.length,
    },
  })),
  on(fromActions.addUsersToGroupFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),

  // load users by groupId
  on(fromActions.loadGroupedUsers, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.loadGroupedUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    groupedUsersList: funSetIsSelect(payload.body, state.groupedSelectedUsers),
    groupedUsersPagination: {
      page: payload.headers.page,
      pageSize: payload.headers.pageSize,
      pageCount: payload.headers.pageCount,
      recordCount: payload.headers.recordCount,
    },
    groupedUsersSort: payload.sort,
    groupedUsersFilter: payload.filter,
    groupedUsersSearch: payload.searchText,
  })),
  on(fromActions.loadGroupedUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  on(fromActions.groupedUserTableColumnsChange, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupedUsersColumnList: payload.tableColumnsChange,
  })),
  on(fromActions.groupedUsersPaginationChange, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: '',
    groupedUsersPagination: payload.pagination,
  })),
  on(fromActions.groupedUsersSort, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupedUsersSort: payload.sort,
  })),
  on(fromActions.groupedUsersSelectionChange, (state, { payload }) => ({
    ...state,
    groupedSelectedUsers: payload.selectedUsers,
    groupedUsersList: payload.users,

    groupedUsersShowSelection: payload.selectedUsers
      ? payload.selectedUsers.length
        ? true
        : false
      : false,
  })),

  on(fromActions.groupedUsersfilterOnOff, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupedUsersFilterDataSource: payload.filter,
    groupedUsersShowFilters: payload.showFilter,
  })),

  on(fromActions.grouppedUserSelectionOnOff, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupedUsersShowSelection: payload.userSelection,
  })),

  // remove users from a group
  on(fromActions.removeUser, state => ({ ...state, isLoading: true, isLoaded: false })),
  on(fromActions.removeUserSuccess, (state, { payload }) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      allGroupedUsers: state.allGroupedUsers.filter(
        o1 => !payload.body.some(o2 => o1.userId === o2.userId),
      ),
      groupedSelectedUsers: state.groupedSelectedUsers.filter(
        o1 => !payload.body.some(o2 => o1.userId === o2.userId),
      ),
      groupedUsersList: funGetGroupedUsers(
        state.groupedUsersList,
        payload.body,
        state.groupedSelectedUsers,
      ),
      groupedUsersPagination: {
        page: 1,
        pageSize: 5,
        pageCount: (state.groupedUsersList.length - payload.body.length) / 5,
        recordCount: state.groupedUsersPagination.recordCount - payload.body.length,
      },
      addGroupSelectedUser: state.addGroupSelectedUser.filter(
        o1 => !payload.body.some(o2 => o1.userId === o2.userId),
      ),
    };
  }),
  on(fromActions.removeUserFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  on(fromActions.groupedUserSearch, (state, { payload }) => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    errorMessage: '',
    groupedUsersSearch: payload.searchText,
  })),
  on(fromActions.loadCountryList, state => ({
    ...state,
    country: {
      isLoading: true,
      isLoaded: false,
      countryList: null,
      errorMessage: null,
    },
  })),
  on(fromActions.loadCountryListSuccess, (state, { payload }) => ({
    ...state,
    country: {
      isLoading: false,
      isLoaded: true,
      countryList: payload.body,
      errorMessage: null,
    },
  })),
  on(fromActions.loadCountryListFailure, (state, { payload }) => ({
    ...state,
    country: {
      isLoading: false,
      isLoaded: false,
      countryList: null,
      errorMessage: payload,
    },
  })),

  on(fromActions.loadStateList, state => ({
    ...state,
    state: {
      isLoading: true,
      isLoaded: false,
      stateList: null,
      errorMessage: null,
    },
  })),
  on(fromActions.loadStateListSuccess, (state, { payload }) => ({
    ...state,
    state: {
      isLoading: false,
      isLoaded: true,
      stateList: payload.body,
      errorMessage: null,
    },
  })),
  on(fromActions.loadStateListFailure, (state, { payload }) => ({
    ...state,
    state: {
      isLoading: false,
      isLoaded: false,
      stateList: null,
      errorMessage: payload,
    },
  })),

  on(fromActions.getAllGroupedUser, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.getAllGroupedUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    allGroupedUsers: payload.body,
    addGroupSelectedUser: payload.body,
  })),
  on(fromActions.getAllGroupedUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),

  on(fromActions.loadAddUsers, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),
  on(fromActions.loadAddUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    addGroupUsersList: funConstructPayload(payload.body, state.addGroupSelectedUser),
    addGroupUsersPagination: {
      page: payload.headers.page,
      pageSize: payload.headers.pageSize,
      pageCount: payload.headers.pageCount,
      recordCount: payload.headers.recordCount,
    },
    addGroupUsersSearchText: payload.sort,
  })),
  on(fromActions.loadUsersFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  // Get TenantId By userId
  on(fromActions.loadUserTenantIds, state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
  })),

  on(fromActions.loadUserTenantIdsSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    userTenantIds: payload.body,
  })),
  on(fromActions.loadUserTenantIdsFailure, (state, { payload }) => ({
    ...state,
    isLoading: false,
    isLoaded: false,
    errorMessage: payload,
  })),
  on(fromActions.clearUserPermissionsSetting, (state, {}) => ({
    ...state,
    selectedUserPermissions: null,
  })),
  on(fromActions.verifyUserCompanyCodeSuccess, (state, { payload }) => ({
    ...state,
    userVerifyCompanyCodeTenantId: payload,
  })),

  on(fromActions.verifyUserCompanyCodeFailure, (state, { payload }) => ({
    ...state,
    userVerifyCompanyCodeTenantId: null,
  })),
  on(fromActions.clearUserDefaultTenant, state => ({
    ...state,
    userVerifyCompanyCodeTenantId: '',
  })),
  on(fromActions.getDomainTenantSuccess, (state, { payload }) => ({
    ...state,
    domainTenantId: payload,
  })),
  on(fromActions.getDomainTenantFailure, (state, { payload }) => ({
    ...state,
    domainTenantId: payload,
  })),
  on(fromActions.clearUserState, (state, {}) => ({
    users: [],
    usersTablePage: null,
    usersTableSort: '',
    usersTableFilterDataSource: null,
    usersShowFilters: false,
    userShowSelection: false,
    usersTableFilter: null,
    usersTableSearch: '',
    isLoaded: false,
    isLoading: false,
    errorMessage: null,
    displayColumnList: [],
    mappingFields: [],
    selectedUsers: [],
    userProfileLoaded: false,
    userProfile: null,
    previewUsersList: [],
    userFiledsNames: null,
    isLoadedSelectedUserPermission: false,
    isLoadingSelectedUserPermission: false,
    selectedUserPermissions: null,
    selectedUserPermissionErrorMessage: null,
    groupList: null,
    groupsTablePage: null,
    groupsTableSort: '',
    groupsTableFilter: null,
    groupsTableSearch: '',
    groupsTableFilterDataSource: null,
    groupShowSelection: false,
    selectedGroups: [],
    groupsShowFilters: false,
    groupedUsersList: [],
    groupedUsersPagination: null,
    groupedUsersSort: '',
    groupedUsersFilter: null,
    groupedUsersSearch: '',
    groupedUsersFilterDataSource: null,
    groupedUsersShowSelection: false,
    groupedSelectedUsers: [],
    groupedUsersShowFilters: false,
    groupedUsersColumnList: groupedUsersTableColumnList.map(x => Object.assign({}, x)),
    allGroupedUsers: [],
    addGroupUsersList: [],
    addGroupUsersSearchText: '',
    addGroupUsersPagination: null,
    addGroupSelectedUser: [],
    addUsersShowSelection: false,
    state: {
      isLoaded: false,
      isLoading: false,
      errorMessage: '',
      stateList: null,
    },
    country: {
      isLoaded: false,
      isLoading: false,
      errorMessage: '',
      countryList: null,
    },
    userVerifyCompanyCodeTenantId: null,
    domainTenantId: null,
    activateUsersErrorMessage: null,
    deActivateUsersErrorMessage: null,
    userTenantIds:[]
  })),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

export const getUsersList = (state: UserState) => state.users;
export const getGroupsList = (state: UserState) => state.groupList;
