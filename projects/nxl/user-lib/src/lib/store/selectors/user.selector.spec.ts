import { Store, StoreModule } from '@ngrx/store';

import * as fromUserSelector from './user.selector';
import * as fromUserReducers from '../reducers';
import * as fromUserAction from './../actions/index';
import { TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import * as fromRoot from '../reducers';
import * as testData from '../../data/test/user-test-data';
import { PaginationHeaders } from '../../models/user-response.model';
import { UserPermissionResponse } from '../../models/user-permission-response.model';
import * as groupTestData from '../../data/test/group-test-data';

describe('User Selector', () => {
  let store: Store<fromUserReducers.UserState>;
  const state = {
    user: {
      users: testData.usersList,
      usersTablePage: { page: 1, pageSize: 1, pageCount: 1, recordCount: 1 },
      usersTableSort: null,
      usersShowFilters: false,
      usersTableFilterDataSource: null,
      usersTableFilter: null,
      usersTableSearch: null,
      selectedUsers: testData.selectedUsers,
      isLoaded: true,
      isLoading: false,
      errorMessage: null,
      displayColumnList: testData.TableColumnList.map(x => Object.assign({}, x)),
      userProfile: [testData.userDetail],
      userTenantIds: testData.UserTenantIds,
      mappingFields: [],
      previewUsersList: [],
      userShowSelection: false,
      selectedUserPermissions: null,
      userFiledsNames: testData.registrationFieldsList.registrationFields,
      country: {
        isLoaded: true,
        isLoading: false,
        countryList: testData.countryList,
        errorMessage: '',
      },
      state: {
        isLoaded: true,
        isLoading: false,
        stateList: testData.stateList,
        errorMessage: '',
      },
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
      groupedUsersPagination: { page: 1, pageSize: 1, pageCount: 1, recordCount: 1 },
      groupedUsersSort: '',
      groupedUsersFilter: null,
      groupedUsersSearch: '',
      groupedUsersFilterDataSource: null,
      groupedUsersShowSelection: false,
      groupedSelectedUsers: [],
      groupedUsersShowFilters: false,
      groupedUsersColumnList: groupTestData.groupedUsersTableColumnList.map(x =>
        Object.assign({}, x),
      ),
      addGroupUsersList: [],
      addGroupUsersSearchText: '',
      addGroupUsersPagination: null,
      addGroupSelectedUser: [],
      addUsersShowSelection: false,
      allGroupedUsers: [],
      userProfileLoaded: false,
      isLoadedSelectedUserPermission: false,
      isLoadingSelectedUserPermission: false,
      selectedUserPermissionErrorMessage: null,
      userVerifyCompanyCodeTenantId: null,
      domainTenantId: null,
      activateUsersErrorMessage: null,
      deActivateUsersErrorMessage: null,
    },
  };

  const payload = {
    body: testData.usersList,
    headers: {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      recordCount: 1,
    },
    sort: '',
    filter: testData.filterData,
    searchText: testData.searchText,
  };
  const usersList: User[] = [testData.usersList[0], testData.usersList[1], testData.usersList[2]];
  const permissionsettingData: UserPermissionResponse[] = testData.userPermission;
  const usersTablePage: PaginationHeaders = {
    page: 1,
    pageSize: 5,
    pageCount: 1,
    recordCount: 1,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('User Selector action', () => {
    it('should export get all ', () => {
      const initialState = {
        user: {
          users: testData.usersList,
          usersTablePage: { page: 1, pageSize: 1, pageCount: 1, recordCount: 1 },
          usersTableSort: '',
          usersShowFilters: false,
          usersTableFilterDataSource: null,
          usersTableFilter: testData.filterData,
          usersTableSearch: testData.searchText,
          selectedUsers: [],
          isLoaded: true,
          isLoading: false,
          errorMessage: null,
          mappingFields: [],
          previewUsersList: [],
          displayColumnList: testData.TableColumnList.map(x => Object.assign({}, x)),
          userProfile: null,
          userShowSelection: false,
          selectedUserPermissions: null,
          userFiledsNames: null,
          country: {
            isLoaded: false,
            isLoading: false,
            countryList: null,
            errorMessage: '',
          },
          state: {
            isLoaded: false,
            isLoading: false,
            stateList: null,
            errorMessage: '',
          },
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
          groupedUsersColumnList: groupTestData.groupedUsersTableColumnList.map(x =>
            Object.assign({}, x),
          ),
          addGroupUsersList: [],
          addGroupUsersSearchText: '',
          addGroupUsersPagination: null,
          addGroupSelectedUser: [],
          addUsersShowSelection: false,
          allGroupedUsers: [],
          userProfileLoaded: false,
          isLoadedSelectedUserPermission: false,
          isLoadingSelectedUserPermission: false,
          selectedUserPermissionErrorMessage: null,
          userVerifyCompanyCodeTenantId: null,
          domainTenantId: null,
          activateUsersErrorMessage: null,
          deActivateUsersErrorMessage: null,
        },
      };
      let result;
      fromUserSelector.getSelectedUsersState(initialState);
      store.dispatch(fromUserAction.loadUsersSuccess({ payload }));
      store.subscribe(value => (result = value));
      expect(result.user).toEqual(initialState.user);
    });

    it('should export call getSelectedUsersLoaded', () => {
      expect(fromUserSelector.getSelectedUsersLoaded.projector(state.user, usersList)).toEqual(
        true,
      );
    });

    it('should export call getSelectedUserById', () => {
      expect(
        fromUserSelector
          .getSelectedUserById('4ddcbd40-b86d-463d-a5ab-4bb70282f340')
          .projector(state.user, usersList),
      ).toEqual(usersList[0]);
    });
    it('should export call getIsVisableTableColumnList', () => {
      state.user.displayColumnList = testData.TableColumnList;
      expect(
        fromUserSelector.getIsVisableTableColumnList.projector(
          state.user,
          testData.TableColumnList,
        ),
      ).toEqual(testData.TableColumnList);
    });

    it('should export call getSelectedUsersPageDetails', () => {
      state.user.usersTablePage = testData.paginationData;
      expect(
        fromUserSelector.getSelectedUsersPageDetails.projector(state.user, usersTablePage),
      ).toEqual(testData.paginationData);
    });
    it('should export call getSelectedSortingOrder', () => {
      state.user.usersTableSort = testData.sortingData;
      expect(
        fromUserSelector.getSelectedSortingOrder.projector(state.user, state.user.usersTableSort),
      ).toEqual(testData.sortingData);
    });

    it('should export call getSelectedNewFilterTitle', () => {
      const value = {
        newTitle: 'Active',
        title: 'ActiveUser',
        value: { value: 'true', displayValue: 'Active' },
      };

      expect(
        fromUserSelector
          .getSelectedFilterTitle(value)
          .projector(state.user, state.user.usersTableFilterDataSource),
      ).toEqual(testData.filterProperties);
    });

    it('should export call getSelectedFilterProperties', () => {
      state.user.usersTableFilter = testData.filterData;
      expect(
        fromUserSelector.getSelectedFilterValues.projector(state.user, state.user.usersTableFilter),
      ).toEqual(testData.filterData);
    });

    it('should export call getSelectedFilterDataSourceProperties', () => {
      state.user.usersTableFilterDataSource = testData.filterProperties;
      expect(
        fromUserSelector.getSelectedFilterSource.projector(
          state.user,
          state.user.usersTableFilterDataSource,
        ),
      ).toEqual(testData.filterProperties);
    });

    it('should export call getSelectedUserSearchText', () => {
      const searchText = testData.searchText;
      state.user.usersTableSearch = searchText;
      expect(
        fromUserSelector.getSelectedUserSearchText.projector(
          state.user,
          state.user.usersTableSearch,
        ),
      ).toEqual(searchText);
    });

    it('should export call getSelectedShowFilters', () => {
      const showFilter = false;
      state.user.usersShowFilters = showFilter;
      expect(
        fromUserSelector.getSelectedShowFilters.projector(state.user, state.user.usersShowFilters),
      ).toEqual(showFilter);
    });
    it('should export call getSelectedUsers', () => {
      state.user.selectedUsers = testData.selectedUsers;
      expect(
        fromUserSelector.getSelectedUsers.projector(state.user, state.user.selectedUsers),
      ).toEqual(testData.selectedUsers);
    });
    it('should export call getSelectedIsSelectAll', () => {
      expect(fromUserSelector.getSelectedIsSelectAll.projector(state.user)).toEqual(false);
    });

    it('should export call getSelectedIsIntermediateSelect', () => {
      expect(fromUserSelector.getSelectedIsIntermediateSelect.projector(state.user)).toEqual(false);
    });
    it('should export call getSelectedExportUserColumnList', () => {
      state.user.displayColumnList = testData.TableColumnList;
      const expected = testData.TableColumnList.filter(
        x => x.visible === true && x.isExport === true,
      );
      expect(
        fromUserSelector.getSelectedExportUserColumnList.projector(
          state.user,
          testData.TableColumnList,
        ),
      ).toEqual(expected);
    });
    it('should export call getSelectedUserProfileLoaded', () => {
      state.user.userProfileLoaded = true;
      expect(
        fromUserSelector.getSelectedUserProfileLoaded.projector(state.user, testData.userDetail[0]),
      ).toEqual(true);
    });
    it('should export call getSelectedUserProfile', () => {
      state.user.userProfile = [testData.selectedUsers[0]];
      expect(
        fromUserSelector.getSelectedUserProfile.projector(state.user, testData.selectedUsers[0]),
      ).toEqual(state.user.userProfile);
    });

    // it('should export call getSelectedCSVFields', () => {
    //   expect(fromUserSelector.getSelectedCSVFields.projector(state.user, usersList)).toEqual(
    //     state.user.csvFields,
    //   );
    // it('should return UserTenantIds', () => {
    //   state.user.userTenantIds = testData.UserTenantIds;
    //   expect(
    //     fromUserSelector.getSelectedUserTenantIds.projector(state.user, testData.UserTenantIds),
    //   ).toEqual(testData.UserTenantIds);
    // });

    // it('should return true if UserTenantIds is loaded', () => {
    //   expect(
    //     fromUserSelector.getSelectedUserTenantIdLoaded.projector(
    //       state.user,
    //       testData.UserTenantIds,
    //     ),
    //   ).toEqual(true);
    // });
    it('should export call getSelectedMappedValues', () => {
      expect(fromUserSelector.getSelectedMappedValues.projector(state.user, usersList)).toEqual(
        state.user.mappingFields,
      );
    });
    it('should export call getSelectedPlatformSettings', () => {
      state.user.selectedUserPermissions = testData.userPermission;
      expect(
        fromUserSelector.getSelectedPermissionsSettings.projector(
          state.user,
          testData.userPermission,
        ),
      ).toEqual(state.user.selectedUserPermissions);
    });
    it('should export call getSelectedPermissionsSettingsLoaded', () => {
      expect(
        fromUserSelector.getSelectedPermissionsSettingsLoaded.projector(
          state.user,
          permissionsettingData,
        ),
      ).toEqual(true);
    });
    it('should export call getSelectedFieldsNames', () => {
      state.user.userFiledsNames = testData.registrationFieldsList.registrationFields;
      expect(
        fromUserSelector.getSelectedFieldsNames.projector(
          state.user,
          testData.registrationFieldsList.registrationFields,
        ),
      ).toEqual(state.user.userFiledsNames);
    });

    it('should export call getSelectedIsCountryListLoaded', () => {
      expect(
        fromUserSelector.getSelectedIsCountryListLoaded.projector(
          state.user,
          permissionsettingData,
        ),
      ).toEqual(true);
    });

    it('should export call getSelectedIsStateListLoaded', () => {
      expect(
        fromUserSelector.getSelectedIsStateListLoaded.projector(
          state.user,
          permissionsettingData,
        ),
      ).toEqual(true);
    });

    it('should export call getSelectedCountryList', () => {
      state.user.country.countryList = testData.countryList;
      expect(
        fromUserSelector.getSelectedCountryList.projector(state.user, testData.countryList),
      ).toEqual(state.user.country.countryList);
    });


    
    it('should return UserTenantIds', () => {
      state.user.userTenantIds = testData.UserTenantIds;
      expect(
        fromUserSelector.getSelectedUserTenantIds.projector(state.user, testData.UserTenantIds),
      ).toEqual(testData.UserTenantIds);
    });

    it('should return true if UserTenantIds is loaded', () => {
      expect(
        fromUserSelector.getSelectedUserTenantIdsLoaded.projector(
          state.user,
          testData.UserTenantIds,
        ),
      ).toEqual(true);
    });

    it('should export call getSelectedCountryList', () => {
      state.user.state.stateList = testData.stateList;
      expect(
        fromUserSelector.getSelectedStateList.projector(state.user, testData.stateList),
      ).toEqual(state.user.state.stateList);
    });

    it('should export call getSelectedGroupsPageDetails', () => {
      state.user.groupsTablePage = testData.paginationData;
      expect(
        fromUserSelector.getSelectedGroupsPageDetails.projector(
          state.user,
          state.user.groupsTablePage,
        ),
      ).toEqual(testData.paginationData);
    });

    it('should export call getSelectedSortingOrder', () => {
      state.user.groupsTableSort = testData.sortingData;
      expect(
        fromUserSelector.getSelectedSortingOrder.projector(state.user, state.user.groupsTableSort),
      ).toEqual(testData.sortingData);
    });

    it('should export call getSelectedFilterProperties', () => {
      state.user.groupsTableFilter = testData.filterData;
      expect(
        fromUserSelector.getSelectedGroupFilterValues.projector(
          state.user,
          state.user.groupsTableFilter,
        ),
      ).toEqual(testData.filterData);
    });

    it('should export call getSelectedGroupsSearchText', () => {
      const searchText = testData.searchText;
      state.user.groupsTableSearch = searchText;
      expect(
        fromUserSelector.getSelectedGroupsSearchText.projector(
          state.user,
          state.user.groupsTableSearch,
        ),
      ).toEqual(searchText);
    });

    it('should export call getSelectedFilterDataSourceProperties', () => {
      state.user.groupsTableFilterDataSource = testData.filterProperties;
      expect(
        fromUserSelector.getSelectedGroupFilterSource.projector(
          state.user,
          state.user.groupsTableFilterDataSource,
        ),
      ).toEqual(testData.filterProperties);
    });

    it('should export call getSelectedGroupFilterTitle', () => {
      const value = {
        newTitle: 'Active',
        title: 'ActiveUser',
        value: { value: 'true', displayValue: 'Active' },
      };

      expect(
        fromUserSelector
          .getSelectedGroupFilterTitle(value)
          .projector(state.user, state.user.groupsTableFilterDataSource),
      ).toEqual(groupTestData.filterProperties);
    });
    it('should export call getSelectedGrpedUsersIsSelectAll', () => {
      expect(fromUserSelector.getSelectedGrpedUsersIsSelectAll.projector(state.user)).toEqual(
        false,
      );
    });

    it('should export call getSelectedGroupShowSelection', () => {
      expect(fromUserSelector.getSelectedGroupShowSelection.projector(state.user)).toEqual(false);
    });
    it('should export call getSelectedGroups', () => {
      state.user.selectedGroups = groupTestData.groupList;
      expect(
        fromUserSelector.getSelectedGroups.projector(state.user, state.user.selectedGroups),
      ).toEqual(groupTestData.groupList);
    });

    it('should export call getSelectedGroupIsIntermediateSelect', () => {
      expect(fromUserSelector.getSelectedGroupIsIntermediateSelect.projector(state.user)).toEqual(
        false,
      );
    });

    it('should export call getSelectedGroupShowFilters', () => {
      const showFilter = false;
      state.user.groupsShowFilters = showFilter;
      expect(
        fromUserSelector.getSelectedGroupShowFilters.projector(
          state.user,
          state.user.groupsShowFilters,
        ),
      ).toEqual(showFilter);
    });

    it('should export call getSelectedGroupById', () => {
      expect(
        fromUserSelector.getSelectedGroupById('1').projector(state.user, groupTestData.groupList),
      ).toEqual(undefined);
    });

    it('should export call getSelectedGrpAddUsersPageDetails', () => {
      state.user.addGroupUsersPagination = testData.paginationData;
      expect(
        fromUserSelector.getSelectedGrpAddUsersPageDetails.projector(
          state.user,
          state.user.addGroupUsersPagination,
        ),
      ).toEqual(testData.paginationData);
    });

    it('should export call getSelectedGroupAddUsersSearchText', () => {
      const searchText = testData.searchText;
      state.user.addGroupUsersSearchText = searchText;
      expect(
        fromUserSelector.getSelectedGroupAddUsersSearchText.projector(
          state.user,
          state.user.addGroupUsersSearchText,
        ),
      ).toEqual(searchText);
    });

    it('should export call getSelectedGroupAddUsersList', () => {
      state.user.addGroupUsersList = groupTestData.addGroupData;
      expect(
        fromUserSelector.getSelectedGroupAddUsersList.projector(
          state.user,
          groupTestData.addGroupData,
        ),
      ).toEqual(state.user.addGroupUsersList);
    });

    it('should export call getSelectedAddUsersGroup', () => {
      state.user.addGroupSelectedUser = testData.selectedUsers;
      expect(
        fromUserSelector.getSelectedAddUsersGroup.projector(
          state.user,
          state.user.addGroupSelectedUser,
        ),
      ).toEqual(testData.selectedUsers);
    });

    it('should export call getSelectedAddUserGroupIsSelectAll', () => {
      expect(fromUserSelector.getSelectedAddUserGroupIsSelectAll.projector(state.user)).toEqual(
        false,
      );
    });

    it('should export call getSelectedAddUserIsIntermediateSelect', () => {
      expect(fromUserSelector.getSelectedAddUserIsIntermediateSelect.projector(state.user)).toEqual(
        false,
      );
    });

    it('should export call getSelectedGroupedUsersList', () => {
      state.user.groupedUsersList = groupTestData.groupList;
      expect(
        fromUserSelector.getSelectedGroupedUsersList.projector(
          state.user,
          state.user.groupedUsersList,
        ),
      ).toEqual(groupTestData.groupList);
    });

    it('should export call getSelectedGroupedUsersPageDetails', () => {
      state.user.groupedUsersPagination = testData.paginationData;
      expect(
        fromUserSelector.getSelectedGroupedUsersPageDetails.projector(
          state.user,
          state.user.groupedUsersPagination,
        ),
      ).toEqual(testData.paginationData);
    });

    it('should export call getSelectedGroupedUsersSearchText', () => {
      const searchText = testData.searchText;
      state.user.groupedUsersSearch = searchText;
      expect(
        fromUserSelector.getSelectedGroupedUsersSearchText.projector(
          state.user,
          state.user.groupedUsersSearch,
        ),
      ).toEqual(searchText);
    });

    it('should export call getSelectedGroupedUsersSortingOrder', () => {
      state.user.groupedUsersSort = testData.sortingData;
      expect(
        fromUserSelector.getSelectedGroupedUsersSortingOrder.projector(
          state.user,
          state.user.groupedUsersSort,
        ),
      ).toEqual(testData.sortingData);
    });

    it('should export call getSelectedGroupedUsersFilterValues', () => {
      state.user.groupedUsersFilter = testData.filterData;
      expect(
        fromUserSelector.getSelectedGroupedUsersFilterValues.projector(
          state.user,
          state.user.groupedUsersFilter,
        ),
      ).toEqual(testData.filterData);
    });

    it('should export call getSelectedIsGroupTableColumnList', () => {
      state.user.groupedUsersColumnList = groupTestData.groupedUsersTableColumnList;
      expect(
        fromUserSelector.getSelectedIsGroupTableColumnList.projector(
          state.user,
          groupTestData.groupedUsersTableColumnList,
        ),
      ).toEqual(groupTestData.groupedUsersTableColumnList);
    });

    it('should export call getSelectedGrpedUsersIsSelectAll', () => {
      expect(fromUserSelector.getSelectedGrpedUsersIsSelectAll.projector(state.user)).toEqual(
        false,
      );
    });

    it('should export call getSelectedGrpedUsersIsIntermediateSelect', () => {
      expect(
        fromUserSelector.getSelectedGrpedUsersIsIntermediateSelect.projector(state.user),
      ).toEqual(false);
    });

    it('should export call getSelectedGrouppedUsers', () => {
      state.user.groupedSelectedUsers = testData.selectedUsers;
      expect(
        fromUserSelector.getSelectedGrouppedUsers.projector(state.user, testData.selectedUsers),
      ).toEqual(state.user.groupedSelectedUsers);
    });

    it('should export call getSelectedGrouppedUsersShowFilters', () => {
      const showFilter = false;
      state.user.groupedUsersShowFilters = showFilter;
      expect(
        fromUserSelector.getSelectedGrouppedUsersShowFilters.projector(
          state.user,
          state.user.groupedUsersShowFilters,
        ),
      ).toEqual(showFilter);
    });

    it('should export call getGroupedUsersShowSelection', () => {
      expect(fromUserSelector.getGroupedUsersShowSelection.projector(state.user)).toEqual(false);
    });

    it('should export call getSelectedGropedExportUserColumnList', () => {
      state.user.groupedUsersColumnList = groupTestData.groupedUsersTableColumnList;
      const expected = groupTestData.groupedUsersTableColumnList.filter(
        x => x.visible === true && x.isExport === true,
      );
      expect(
        fromUserSelector.getSelectedGropedExportUserColumnList.projector(
          state.user,
          groupTestData.groupedUsersTableColumnList,
        ),
      ).toEqual(expected);
    });

    it('should export call getSelectedGroupedUsersRecordCount', () => {
      state.user.groupedUsersPagination.recordCount = 3;
      expect(
        fromUserSelector.getSelectedGroupedUsersRecordCount.projector(
          state.user,
          state.user.groupedUsersPagination.recordCount,
        ),
      ).toEqual(3);
    });
    it('should export call getSelectedUserDomainTenantId', () => {
      state.user.domainTenantId = testData.tenantId;
      expect(
        fromUserSelector.getSelectedUserDomainTenantId.projector(
          state.user,
          state.user.domainTenantId,
        ),
      ).toEqual(testData.tenantId);
    });
    it('should export call getSelectedUserVerifyCompanyCodeTenantId', () => {
      state.user.userVerifyCompanyCodeTenantId = testData.tenantId;
      expect(
        fromUserSelector.getSelectedUserVerifyCompanyCodeTenantId.projector(
          state.user,
          state.user.userVerifyCompanyCodeTenantId,
        ),
      ).toEqual(testData.tenantId);
    });


     it('should export call getSelectedRegisteredUser', () => {
      state.user.userProfile = [testData.userDetail];
      expect(
        fromUserSelector.getSelectedRegisteredUser.projector(
          state.user,
          state.user.userProfile[0].isRegistered,
        ),
      ).toEqual(testData.userDetail.isRegistered);
     });
    
       
    it('should export call getSelectedUserEmailAddress', () => {
      state.user.userProfile = [testData.userDetail];
      expect(
        fromUserSelector.getSelectedUserEmailAddress.projector(
          state.user,
          state.user.userProfile[0].email,
        ),
      ).toEqual(testData.userDetail.email);
    });
    it('should export call getSelectedUserTenantId', () => {
      state.user.userProfile = [testData.userDetail];
      expect(
        fromUserSelector.getSelectedUserTenantId.projector(
          state.user,
          state.user.userProfile[0].tenantId,
        ),
      ).toEqual(testData.userDetail.tenantId);
    });
  });
});
