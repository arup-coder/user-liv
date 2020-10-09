import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/user.reducer';
import * as userDefaults from '../../data/defaults/user-default-values';
import { FilterValues } from '../../models/user-response.model';
import * as funUser from '../../functions';
import * as groupDefaults from '../../data/defaults/group-default-values';
import { groupedUsersTableColumnList } from '../../data/defaults/user-default-values';

export const getSelectedUsersState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.user,
);

// get current page details for users table
export const getSelectedUsersPageDetails = createSelector(getSelectedUsersState, userState =>
  userState.usersTablePage ? userState.usersTablePage : userDefaults.initialUserPaginationParams,
);

export const getSelectedUsersList = createSelector(getSelectedUsersState, fromUsers.getUsersList);

export const getSelectedUsersLoaded = createSelector(
  getSelectedUsersState,
  userState => userState.isLoaded,
);

// get current sorting order for users table
export const getSelectedSortingOrder = createSelector(getSelectedUsersState, usersState =>
  usersState.usersTableSort ? usersState.usersTableSort : '',
);

// get user by selected Id
export const getSelectedUserById = (userId: string) =>
  createSelector(getSelectedUsersState, userState =>
    userState.users !== null
      ? userState.users.find(selectedUser => selectedUser.userId === userId)
      : null,
  );
// get user by employee Id
export const getSelectedUserByEmployeeId = (employeeId: number) =>
  createSelector(getSelectedUsersState, userState =>
    userState.users !== null
      ? userState.users.find(selectedUser => selectedUser.externalId === employeeId.toString())
      : null,
  );
// get current filter values for users table
export const getSelectedFilterValues = createSelector(getSelectedUsersState, usersState => {
  return usersState.usersTableFilter &&
    usersState.usersTableFilter.length > 0 &&
    usersState.usersTableFilter[0].title === ''
    ? null
    : usersState.usersTableFilter;
});

// get filter dataSource for users table
export const getSelectedFilterSource = createSelector(getSelectedUsersState, usersState => {
  return usersState.usersTableFilterDataSource &&
    usersState.usersTableFilterDataSource.length > 0 &&
    usersState.usersTableFilterDataSource[0].title === ''
    ? userDefaults.filterProperties
    : usersState.usersTableFilterDataSource;
});

// get showFilter value
export const getSelectedShowFilters = createSelector(getSelectedUsersState, usersState => {
  return usersState.usersShowFilters ? usersState.usersShowFilters : false;
});

// get userShowSelection value
export const getuserShowSelection = createSelector(getSelectedUsersState, usersState => {
  return usersState.userShowSelection ? usersState.userShowSelection : false;
});

// sticky the filter value on the header
export const getSelectedFilterTitle = (selectedValue: FilterValues) =>
  createSelector(getSelectedUsersState, () => {
    const copyfilterProperties = userDefaults.filterProperties;
    if (selectedValue.title) {
      copyfilterProperties.filter((filterValue, index) => {
        if (filterValue.title === selectedValue.title) {
          copyfilterProperties[index].newTitle = selectedValue.value.displayValue.toString();
        }
      });
    } else {
      copyfilterProperties.filter(filterValue => {
        delete filterValue['newTitle'];
      });
    }
    return copyfilterProperties;
  });


export const getIsVisableTableColumnList = createSelector(getSelectedUsersState, userState =>
         userState.displayColumnList,
       );

// get current search Text for users table
export const getSelectedUserSearchText = createSelector(getSelectedUsersState, usersState =>
  usersState.usersTableSearch ? usersState.usersTableSearch : '',
);

// get userProfile
export const getSelectedUserProfileLoaded = createSelector(getSelectedUsersState, userState =>
  userState.userProfileLoaded ? userState.userProfileLoaded : false,
);

export const getSelectedUserProfile = createSelector(getSelectedUsersState, userState => {
  return userState.userProfile !== null ? userState.userProfile : null;
});

// uesr list table  check box selection selectors..//
// get current selected users from the table
export const getSelectedUsers = createSelector(getSelectedUsersState, usersState =>
  usersState.selectedUsers ? usersState.selectedUsers : [],
);

//get Header columns which can be exported
export const getSelectedExportUserColumnList = createSelector(getSelectedUsersState, userState => {
  return userState.displayColumnList.filter(
    columns => columns.isExport === true && columns.visible === true,
  );
});
// get isSelectAll value for table header check box
export const getSelectedIsSelectAll = createSelector(getSelectedUsersState, usersState => {
  const selectedUsersLength = usersState.users.filter(selectedUser => selectedUser.isSelected)
    .length;
  return selectedUsersLength === usersState.users.length && selectedUsersLength !== 0;
});

// get is IsIntermediateSelect for table header check box
export const getSelectedIsIntermediateSelect = createSelector(getSelectedUsersState, usersState => {
  const selectedCustomersLength = usersState.users.filter(selectedUser => selectedUser.isSelected)
    .length;
  return selectedCustomersLength !== usersState.users.length && selectedCustomersLength !== 0;
});

// export const getSelectedCSVFields = createSelector(getSelectedUsersState, usersState => {
//   return usersState.csvFields ? usersState.csvFields : null;
// });
export const getSelectedMappedValues = createSelector(getSelectedUsersState, usersState => {
  return usersState.mappingFields ? usersState.mappingFields : [];
});

export const getSelectedRegisteredUser = createSelector(getSelectedUsersState, usersState => {
  return usersState.userProfile !== null
    ? usersState.userProfile[0]
      ? usersState.userProfile[0].isRegistered
      : null
    : null;
});
export const getSelectedUserIdFun = funUser.funGetUserId;
export const getSelectedUserEmailAddress = createSelector(getSelectedUsersState, usersState => {
  return usersState.userProfile
    ? usersState.userProfile[0]
      ? usersState.userProfile[0].email
      : funUser.funGetUserEmail()
    : funUser.funGetUserEmail();
});

export const getSelectedFieldsNames = createSelector(getSelectedUsersState, usersState => {
  return usersState.userFiledsNames;
});
export const getSelectedPermissionsSettingsLoaded = createSelector(
  getSelectedUsersState,
  userState => (userState.selectedUserPermissions !== null ? true : false),
);
export const getSelectedPermissionsSettings = createSelector(getSelectedUsersState, userState => {
  return userState.selectedUserPermissions !== null ? userState.selectedUserPermissions : null;
});

// Group Management selectors

// get group list
export const getSelectedGroupsList = createSelector(getSelectedUsersState, fromUsers.getGroupsList);

// get current page details for group table
export const getSelectedGroupsPageDetails = createSelector(getSelectedUsersState, userState =>
  userState.groupsTablePage ? userState.groupsTablePage : userDefaults.initialUserPaginationParams,
);

// get current sorting order for groups table
export const getSelectedGroupSortingOrder = createSelector(getSelectedUsersState, usersState =>
  usersState.groupsTableSort ? usersState.groupsTableSort : '',
);

// get current filter values for groups table
export const getSelectedGroupFilterValues = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupsTableFilter &&
    usersState.groupsTableFilter.length > 0 &&
    usersState.groupsTableFilter[0].title === ''
    ? null
    : usersState.groupsTableFilter;
});

// get current search Text for groups table
export const getSelectedGroupsSearchText = createSelector(getSelectedUsersState, usersState =>
  usersState.groupsTableSearch ? usersState.groupsTableSearch : '',
);

// get filter dataSource for users table
export const getSelectedGroupFilterSource = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupsTableFilterDataSource &&
    usersState.groupsTableFilterDataSource.length > 0 &&
    usersState.groupsTableFilterDataSource[0].title === ''
    ? groupDefaults.filterProperties
    : usersState.groupsTableFilterDataSource;
});

// sticky the filter value on the group header
export const getSelectedGroupFilterTitle = (selectedValue: FilterValues) =>
  createSelector(getSelectedUsersState, () => {
    const copyfilterProperties = groupDefaults.filterProperties;
    if (selectedValue.title) {
      copyfilterProperties.filter((filterValue, index) => {
        if (filterValue.title === selectedValue.title) {
          copyfilterProperties[index].newTitle = selectedValue.value.displayValue.toString();
        }
      });
    } else {
      copyfilterProperties.filter(filterValue => {
        delete filterValue['newTitle'];
      });
    }
    return copyfilterProperties;
  });

// get groupShowSelection value
export const getSelectedGroupShowSelection = createSelector(getSelectedUsersState, usersState => {
         return usersState.groupShowSelection ? usersState.groupShowSelection : false;
});

// get current selected groups from the table
export const getSelectedGroups = createSelector(getSelectedUsersState, usersState =>
  usersState.selectedGroups ? usersState.selectedGroups : [],
);

// get isSelectAll value for group table header check box
export const getSelectedGroupIsSelectAll = createSelector(getSelectedUsersState, usersState => {
  const selectedGroupsLength = usersState.groupList.filter(selectedGroups => selectedGroups.isSelected)
    .length;
  return selectedGroupsLength === usersState.groupList.length && selectedGroupsLength !== 0;
});

// get is IsIntermediateSelect for group table header check box
export const getSelectedGroupIsIntermediateSelect = createSelector(getSelectedUsersState, usersState => {
  const selectedGroupsLength = usersState.groupList.filter(
    selectedGroup => selectedGroup.isSelected,
  ).length;
  return selectedGroupsLength !== usersState.groupList.length && selectedGroupsLength !== 0;
});

// get showFilter value
export const getSelectedGroupShowFilters = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupsShowFilters ? usersState.groupsShowFilters : false;
});

// get user by selected Id
export const getSelectedGroupById = (groupId: string) =>
         createSelector(getSelectedUsersState, userState =>
           userState.groupList !== null
             ? userState.groupList.find(selectedGroup => selectedGroup.groupId === groupId)
             : null,
  );

  // get current page details for group add users list table
export const getSelectedGrpAddUsersPageDetails = createSelector(getSelectedUsersState, userState =>
         userState.addGroupUsersPagination
           ? userState.addGroupUsersPagination
           : userDefaults.initialUserPaginationParams,
);

// get current search Text for groups table
export const getSelectedGroupAddUsersSearchText = createSelector(
         getSelectedUsersState,
         usersState =>
           usersState.addGroupUsersSearchText ? usersState.addGroupUsersSearchText : '',
);

// get all users for add group
export const getSelectedGroupAddUsersList = createSelector(getSelectedUsersState, usersState => {
  return usersState.addGroupUsersList ? usersState.addGroupUsersList : [];
});

// get current selected users from the group add users table
export const getSelectedAddUsersGroup = createSelector(getSelectedUsersState, usersState =>
         usersState.addGroupSelectedUser ? usersState.addGroupSelectedUser : [],
);

// get isSelectAll value for table header check box
export const getSelectedAddUserGroupIsSelectAll = createSelector(getSelectedUsersState, usersState => {
  const selectedUsersLength = usersState.addGroupUsersList.filter(selectedUser => selectedUser.isSelected)
    .length;
  return selectedUsersLength === usersState.addGroupUsersList.length && selectedUsersLength !== 0;
});

// get is IsIntermediateSelect for table header check box
export const getSelectedAddUserIsIntermediateSelect = createSelector(getSelectedUsersState, usersState => {
  const selectedCustomersLength = usersState.addGroupUsersList.filter(
    selectedUser => selectedUser.isSelected,
  ).length;
  return (
    selectedCustomersLength !== usersState.addGroupUsersList.length && selectedCustomersLength !== 0
  );
});

// get all users for add group
export const getSelectedGroupedUsersList = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupedUsersList ? usersState.groupedUsersList : [];
});


// get current page details for users table
export const getSelectedGroupedUsersPageDetails = createSelector(
         getSelectedUsersState,
         userState =>
           userState.groupedUsersPagination
             ? userState.groupedUsersPagination
             : userDefaults.initialUserPaginationParams,
       );


       // get current search Text for users table
export const getSelectedGroupedUsersSearchText = createSelector(getSelectedUsersState, usersState =>
         usersState.groupedUsersSearch ? usersState.groupedUsersSearch : '',
       );


       // get current sorting order for users table
export const getSelectedGroupedUsersSortingOrder = createSelector(
         getSelectedUsersState,
         usersState => (usersState.groupedUsersSort ? usersState.groupedUsersSort : ''),
       );

// get current filter values for users table
export const getSelectedGroupedUsersFilterValues = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupedUsersFilter &&
    usersState.groupedUsersFilter.length > 0 &&
    usersState.groupedUsersFilter[0].title === ''
    ? null
    : usersState.groupedUsersFilter;
});

export const getSelectedIsGroupTableColumnList = createSelector(
         getSelectedUsersState,
         userState => userState.groupedUsersColumnList,
);


// get isSelectAll value for table header check box
export const getSelectedGrpedUsersIsSelectAll = createSelector(getSelectedUsersState, usersState => {
  const selectedUsersLength = usersState.groupedUsersList.filter(
    selectedUser => selectedUser.isSelected,
  ).length;
  return selectedUsersLength === usersState.groupedUsersList.length && selectedUsersLength !== 0;
});

// get is IsIntermediateSelect for table header check box
export const getSelectedGrpedUsersIsIntermediateSelect = createSelector(getSelectedUsersState, usersState => {
  const selectedCustomersLength = usersState.groupedUsersList.filter(
    selectedUser => selectedUser.isSelected,
  ).length;
  return (
    selectedCustomersLength !== usersState.groupedUsersList.length && selectedCustomersLength !== 0
  );
});
// get current selected users from the table
export const getSelectedGrouppedUsers = createSelector(getSelectedUsersState, usersState =>
         usersState.groupedSelectedUsers ? usersState.groupedSelectedUsers : [],
);

       // get groped users showFilter value
export const getSelectedGrouppedUsersShowFilters = createSelector(getSelectedUsersState, usersState => {
  return usersState.groupedUsersShowFilters ? usersState.groupedUsersShowFilters : false;
});


// get userShowSelection value
export const getGroupedUsersShowSelection = createSelector(
         getSelectedUsersState,
         usersState => {
           return usersState.groupedUsersShowSelection
             ? usersState.groupedUsersShowSelection
             : false;
         },
       );

//get groupped users Header columns which can be exported
export const getSelectedGropedExportUserColumnList = createSelector(getSelectedUsersState, userState => {
  return userState.groupedUsersColumnList.filter(
    columns => columns.isExport === true && columns.visible === true,
  );
});

export const getSelectedGroupedUsersRecordCount = createSelector(
  getSelectedUsersState,
  usersState => {
    return usersState.groupedUsersPagination ? usersState.groupedUsersPagination.recordCount : 0;
  },
);

export const getSelectedIsCountryListLoaded = createSelector(getSelectedUsersState, userState => {
  return userState.country !== null ? userState.country.isLoaded : false;
});

export const getSelectedIsStateListLoaded = createSelector(getSelectedUsersState, userState => {
  return userState.state !== null ? userState.state.isLoaded : false;
});

export const getSelectedCountryList = createSelector(getSelectedUsersState, userState => {
  return userState.country !== null ? userState.country.countryList : null;
});

export const getSelectedStateList = createSelector(getSelectedUsersState, userState => {
  return userState.state !== null ? userState.state.stateList : null;
});

export const getSelectedUserVerifyCompanyCodeTenantId = createSelector(
  getSelectedUsersState,
  userState => {
    return userState.userVerifyCompanyCodeTenantId !== null
      ? userState.userVerifyCompanyCodeTenantId
      : null;
  },
);
export const getSelectedUserDomainTenantId = createSelector(getSelectedUsersState, userState => {
  return userState.domainTenantId !== null ? userState.domainTenantId : null;
});

export const getSelectedUserTenantId = createSelector(getSelectedUsersState, userState => {
  return userState.userProfile !== null
    ? userState.userProfile[0]
      ? userState.userProfile[0].tenantId
      : null
    : null;
});

//get User TenantIds is Loaded
export const getSelectedUserTenantIdsLoaded = createSelector(getSelectedUsersState, userState =>
  userState.userTenantIds ? (userState.userTenantIds.length > 0 ? true : false) : false,
);

//get User TenantIds
export const getSelectedUserTenantIds = createSelector(
  getSelectedUsersState,
  userState => userState.userTenantIds,
);