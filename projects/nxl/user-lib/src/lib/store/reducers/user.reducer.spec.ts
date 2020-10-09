import * as fromUserReducers from './user.reducer';
import * as fromActions from '../actions/user.action';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';

describe('UsersReducer', () => {
  describe('initial user reducer action', () => {
    const users = testData.usersList;
    const previewList = [testData.createUser];
    const permissionSettingData = testData.userPermission;
    const groupList = groupTestData.groupList;
    const stateList = testData.stateList;
    const countryList = testData.countryList;

    it('should return the default state', () => {
      const { initialUserState } = fromUserReducers;
      const action = {} as any;
      const state = fromUserReducers.reducer(undefined, action);

      expect(state).toBe(initialUserState);
    });

    it('should set loading to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadUsers({
        payload: {
          pagination: testData.paginationData,
          sort: testData.sortingData,
          filter: testData.filterData,
          searchText: testData.searchText,
          tenantId: testData.tenantId,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
      expect(state.users).toEqual([]);
      expect(state.errorMessage).toBeNull();
    });

    it('should set loading preview to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadPreviewUsers({
        payload: { previewList: [testData.createUser], tenantId: testData.tenantId },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.previewUsersList).toEqual(previewList);
    });

    it('should set get preview list to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.getPreviewList({
        payload: { previewList: testData.usersList },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.previewUsersList).toEqual(users);
    });

    it('should populate the load preview users list successfully', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.usersTablePage = testData.paginationData;
      const action = fromActions.loadPreviewUsersSuccess({
        payload: {
          body: testData.usersList,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.users).toEqual(users);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
    });

    it('should populate the users list successfully', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadUsersSuccess({
        payload: {
          body: testData.usersList,
          headers: {
            page: 1,
            pageSize: 1,
            pageCount: 1,
            recordCount: 1,
          },
          sort: '',
          filter: testData.filterData,
          searchText: '',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
      expect(state.users).toEqual(users);
    });

    it('should return the initial state when load user failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadUsersFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should set loading user profile to true', () => {
      const { initialUserState } = fromUserReducers;
      const UserId = 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f';
      const action = fromActions.userProfile({
        payload: {
          profileUserId: UserId,
          tenantId: testData.tenantId,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
      expect(state.userProfile).toEqual(null);
      expect(state.errorMessage).toBeNull();
    });

    it('should populate the user profile successfully', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateUserSuccess({
        payload: {
          body: testData.usersList[0],
          route: '',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
      expect(state.userProfile).toEqual(null);
    });

    it('should return the initial state when load user profile failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.userProfileFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(null);
    });

    it('should try to add user', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addUser({
        payload: { body: testData.createADUser, tenantId: testData.tenantId },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should add user to added successfully to the users list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.addUserSuccess({
        payload: { body: testData.userDetail, route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.users.length).toEqual(10);
    });

    it('should return the initial state when add user failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addUserFailure({ payload: 'error', route: '' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should try to update user', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateUser({
        payload: {
          body: { request: testData.updateUser, isRegistered: true },
          selectedUserId: testData.updatedUser.userId,
          tenantId: testData.tenantId,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should update user to successfully update the users list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.updateUserSuccess({
        payload: { body: testData.updatedUser, route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(Object.keys(state.users).length).toEqual(9);
    });

    it('should return the initial state when update user failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateUserFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should return users list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const selectedUsers = fromUserReducers.getUsersList(previousState);
      expect(selectedUsers.length).toEqual(9);
    });

    it('should update sorting data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.sortUsers({
        payload: { sort: testData.sortingData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.usersTableSort).toEqual(testData.sortingData);
    });

    it('should update pagination data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.userPaginationChange({
        payload: { pagination: testData.paginationData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.usersTablePage).toEqual(testData.paginationData);
    });

    it('should update filter data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.filterValueUsers({
        payload: { filter: testData.filterData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.usersTableFilter).toEqual(testData.filterData);
    });
    it('should update selected users on single selection', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.userSelectionChange({
        payload: { selectedUsers: testData.selectedUsers, users: testData.usersList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.selectedUsers).toEqual(testData.selectedUsers);
    });

    it('should update userTableColumnsVisableChange change', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.userTableColumnsVisableChange({
        payload: { tableColumnsChange: testData.TableColumnList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.displayColumnList).toEqual(testData.TableColumnList);
    });
    it('should update filter toggle change', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.filterOnOff({
        payload: { filter: testData.filterProperties, showFilter: true },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.usersTableFilterDataSource).toEqual(testData.filterProperties);
      expect(state.usersShowFilters).toEqual(true);
    });
    it('should update searchText based on input', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.userSearch({
        payload: { searchText: testData.searchText },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.usersTableSearch).toEqual(testData.searchText);
    });

    it('should update registerd user details', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.updateUnRegisteredUserSuccess({
        payload: { body: [testData.userDetail], route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userProfile[0].isRegistered).toEqual(false);
    });

    it('should update user profile success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.updateUserProfileSuccess({
        payload: { body: [testData.userDetail], route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userProfile[0].isRegistered).toEqual(false);
    });
    it('should create unregistered user success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.createUnRegisteredUserSuccess({
        payload: { body: testData.userDetail, route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userProfile[0].isRegistered).toEqual(false);
    });

    it('should user selection on off', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.userSelectionOnOff({
        payload: { userSelection: false },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userShowSelection).toEqual(false);
      expect(state.errorMessage).toEqual('');
    });
    it('should set  loading permissionSetting to true', () => {
      const { initialUserState } = fromUserReducers;
      const testUserId = testData.userPermission[0].userId;
      const action = fromActions.loadUserPermissionsSetting({
        payload: {
          userId: testUserId,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(false);
      expect(state.isLoaded).toEqual(false);
      expect(state.selectedUserPermissions).toEqual(null);
    });
    it('should populate the  permissionSetting  successfully', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.selectedUserPermissions = testData.userPermission;
      const action = fromActions.loadUserPermissionsSettingSuccess({
        payload: testData.userPermission,
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.selectedUserPermissions).toEqual(testData.userPermission);
      expect(state.isLoaded).toEqual(false);
      expect(state.isLoading).toEqual(false);
    });
    it('should return the initial state when load platformSetting failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadUserPermissionsSettingFailure({ payload: '' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual('error');
    });

    it('should update countrylist on load country success', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadCountryListSuccess({
        payload: { body: testData.countryList },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.country.countryList).toEqual(testData.countryList);
    });
    it('should clear country List on load state failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadCountryListFailure({ payload: 'error loading stateList' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.country.countryList).toEqual(null);
      expect(state.country.isLoading).toEqual(false);
      expect(state.country.isLoaded).toEqual(false);
      expect(state.country.errorMessage).toEqual('error loading stateList');
    });

    it('should update stateslist on load state success', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadStateListSuccess({ payload: { body: testData.stateList } });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.state.stateList).toEqual(testData.stateList);
    });
    it('should clear stateslist on load state failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadStateListFailure({ payload: 'error loading stateList' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.state.stateList).toEqual(null);
      expect(state.state.isLoading).toEqual(false);
      expect(state.state.isLoaded).toEqual(false);
      expect(state.state.errorMessage).toEqual('error loading stateList');
    });

    // get group list
    it('should set loading to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupsList({
        payload: {
          pagination: testData.paginationData,
          sort: testData.sortingData,
          filter: testData.filterData,
          searchText: testData.searchText,
          tenantId: testData.tenantId,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
      expect(state.groupList).toEqual([]);
      expect(state.errorMessage).toBeNull();
    });

    it('should populate the groups list successfully', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupsListSuccess({
        payload: {
          body: groupTestData.groupList,
          headers: {
            page: 1,
            pageSize: 1,
            pageCount: 1,
            recordCount: 1,
          },
          sort: '',
          filter: groupTestData.filter,
          searchText: '',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
      expect(state.groupList).toEqual(groupList);
    });

    it('should return the initial state when load groups failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupsFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should update group filter toggle change', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.gorupFilterOnOff({
        payload: { filter: testData.filterProperties, showFilter: true },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupsTableFilterDataSource).toEqual(testData.filterProperties);
      expect(state.groupsShowFilters).toEqual(true);
    });

    it('should update group filter data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.filterValueGroups({
        payload: { filter: groupTestData.filter },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupsTableFilter).toEqual(groupTestData.filter);
    });

    it('should update pagination data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupPaginationChange({
        payload: { pagination: testData.paginationData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupsTablePage).toEqual(testData.paginationData);
    });

    it('should update searchText based on input', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.userGroupSearch({
        payload: { searchText: testData.searchText },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupsTableSearch).toEqual(testData.searchText);
    });

    it('should update groups status based on input', () => {
      const UserIds = testData.selectedUsers.map(selectedUsers => selectedUsers.userId);
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.updateGroupStatus({
        payload: { groupIds: UserIds, status: false },
      });
      const state = fromUserReducers.reducer(previousState, action);
    });

    it('should update groups status based on input', () => {
      const UserIds = testData.selectedUsers.map(selectedUsers => selectedUsers.userId);
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.updateGroupStatusSuccess({
        payload: { groupIds: UserIds, status: false },
      });
      const state = fromUserReducers.reducer(previousState, action);
    });

    it('should try to update groups status failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateGroupStatusFailure({ payload: '' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual('');
    });

    it('should update selected groups on single selection', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupSelectionChange({
        payload: { selectedGroups: groupTestData.groupList, groups: groupTestData.groupList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.selectedGroups).toEqual(groupTestData.groupList);
    });

    it('should update sorting groups successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.sortGroups({
        payload: { sort: groupTestData.sortingData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupsTableSort).toEqual(groupTestData.sortingData);
    });

    it('should try to add group', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addGroup({
        payload: { body: groupTestData.addGroup, tenantId: testData.tenantId },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should add group to added successfully to the groups list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.addGroupSuccess({
        payload: { body: groupTestData.groupList[0], route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupList.length).toEqual(4);
    });

    it('should return the initial state when add groups failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addGroupFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should try to update group', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateGroup({
        payload: {
          body: groupTestData.updateGroup,
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should update group to successfully update the groups list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.updateGroupSuccess({
        payload: { body: groupTestData.updateGroup, groupId: '1', route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(Object.keys(state.groupList).length).toEqual(3);
    });

    it('should return the initial state when update user failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.updateGroupFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should set loading to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.getUnMappedUsers({
        payload: {
          pagination: testData.paginationData,
          searchText: testData.searchText,
          tenantId: testData.tenantId,
          groupId: '1',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
      expect(state.groupedUsersList).toEqual([]);
      expect(state.errorMessage).toBeNull();
    });

    it('should populate the grouped users list successfully', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.getUnMappedUsersSuccess({
        payload: {
          body: groupTestData.unMappedUsers,
          headers: {
            page: 1,
            pageSize: 1,
            pageCount: 50,
            recordCount: 50,
          },
          searchText: '',
          route: '',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
      expect(state.addGroupUsersList).toEqual(groupTestData.unMappedUsers);
    });

    it('should return the initial state when load users failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.getUnMappedUsersFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should update add users searchText based on input', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.addUserGroupSearch({
        payload: { searchText: testData.searchText },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.addGroupUsersSearchText).toEqual(testData.searchText);
    });

    it('should update pagination data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.addUsersGroupPaginationChange({
        payload: { pagination: testData.paginationData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.addGroupUsersPagination).toEqual(testData.paginationData);
    });

    it('should update selected users on single selection', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.groupAddUserListSelectionChange({
        payload: { selectedUsers: testData.selectedUsers, users: testData.usersList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.addGroupSelectedUser).toEqual(testData.selectedUsers);
    });

    it('should try to add users to a group', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addUsersToGroup({
        payload: { selectedUsers: testData.usersList, groupId: '1' },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should update pagination data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupedUsersPaginationChange({
        payload: { pagination: testData.paginationData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersPagination).toEqual(testData.paginationData);
    });

    it('should add users to group successfully to the groups list', () => {
      const { initialUserState } = fromUserReducers;

      initialUserState.groupedUsersPagination = {
        page: 1,
        pageSize: 1,
        pageCount: 1,
        recordCount: 3,
      };
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.addUsersToGroupSuccess({
        payload: { body: testData.usersList, route: '' },
      });
      const state = fromUserReducers.reducer(previousState, action);

      expect(state.groupedUsersList.length).toEqual(5);
    });

    it('should return the initial state when add groups failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.addUsersToGroupFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    // get group list
    it('should set loading to true', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupedUsers({
        payload: {
          pagination: testData.paginationData,
          sort: testData.sortingData,
          filter: testData.filterData,
          searchText: testData.searchText,
          groupId: '1',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
      expect(state.groupList).toEqual([]);
      expect(state.errorMessage).toBeNull();
    });

    it('should populate the groups list successfully', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupedUsersSuccess({
        payload: {
          body: testData.usersList,
          headers: {
            page: 1,
            pageSize: 1,
            pageCount: 1,
            recordCount: 1,
          },
          sort: '',
          filter: groupTestData.filter,
          searchText: '',
        },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoaded).toEqual(true);
      expect(state.isLoading).toEqual(false);
      expect(state.groupedUsersList).toEqual(testData.usersList);
    });

    it('should return the initial state when load groups failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadGroupedUsersFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should update groupedUserTableColumnsChange change', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.groupedUserTableColumnsChange({
        payload: { tableColumnsChange: testData.TableColumnList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersColumnList).toEqual(testData.TableColumnList);
    });

    it('should update grouped users sorting data successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.sortGroups({
        payload: { sort: groupTestData.sortingData },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersSort).toEqual(groupTestData.sortingData);
    });

    it('should  selected grouped users on single selection', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupedUsersSelectionChange({
        payload: { selectedUsers: testData.selectedUsers, users: testData.usersList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedSelectedUsers).toEqual(testData.selectedUsers);
    });

    it('should update grouped users filter toggle change', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupedUsersfilterOnOff({
        payload: { filter: testData.filterProperties, showFilter: true },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersFilterDataSource).toEqual(testData.filterProperties);
      expect(state.groupedUsersShowFilters).toEqual(true);
    });

    it('should grouped users selection on off', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.grouppedUserSelectionOnOff({
        payload: { userSelection: false },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersShowSelection).toEqual(false);
      expect(state.errorMessage).toEqual('');
    });

    it('should try to remove users from a group', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.removeUser({
        payload: { selectedUser: groupTestData.removeUser, groupId: '1' },
      });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.isLoading).toEqual(true);
      expect(state.isLoaded).toEqual(false);
    });

    it('should remove a user from a group successfully', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.removeUserSuccess({
        payload: { body: groupTestData.groupList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersList.length).toEqual(0);
    });

    it('should return the initial state when remove users from groups failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.removeUserFailure({ payload: 'error' });
      const state = fromUserReducers.reducer(initialUserState, action);
      expect(state.errorMessage).toEqual(action.payload);
    });

    it('should update add users searchText based on input', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const action = fromActions.groupedUserSearch({
        payload: { searchText: testData.searchText },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersSearch).toEqual(testData.searchText);
    });

    it('should return groups list', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, groupList };
      const selectedGroups = fromUserReducers.getGroupsList(previousState);
      expect(selectedGroups.length).toEqual(3);
    });
    it('should call loadStateList', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, stateList };
      const action = fromActions.loadStateList({
        payload: 'IN',
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.state.isLoading).toEqual(true);
    });

    it('should return stateList on success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, stateList };
      const action = fromActions.loadStateListSuccess({
        payload: { body: testData.stateList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.state.stateList).toEqual(testData.stateList);
    });

    it('should call loadCountryList', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.loadCountryList();
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.country.isLoading).toEqual(true);
    });

    it('should return country List on success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.loadCountryListSuccess({
        payload: { body: testData.countryList },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.country.countryList).toEqual(testData.countryList);
    });

    it('should call activateUsers', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.activateUsers({
        payload: { userIds: [testData.userIds[0]], tenantId: testData.tenantId },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state).toEqual(initialUserState);
    });
    it('should activate users on success', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState };
      const action = fromActions.activateUsersSuccess({
        payload: { userIds: [testData.userIds[0]] },
      });
      const state = fromUserReducers.reducer(previousState, action);
      let user = state.users.find(x => x.userId === testData.userIds[0]);
      expect(user.isActive).toEqual(true);
    });

    it('should update error message on activate users failure', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.activateUsersFailure({
        payload: 'error in activate users',
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.activateUsersErrorMessage).toEqual('error in activate users');
    });
    it('should call deactivateUsers', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.deActivateUsers({
        payload: { userIds: [testData.userIds[0]], tenantId: testData.tenantId },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state).toEqual(initialUserState);
    });
    it('should update error message on deactivate users failure', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.deActivateUsersFailure({
        payload: 'error in activate users',
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.deActivateUsersErrorMessage).toEqual('error in activate users');
    });

    it('should DeActivate users on success', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.deActivateUsersSuccess({
        payload: { userIds: [testData.userIds[0]] },
      });
      const state = fromUserReducers.reducer(previousState, action);
      let user = state.users.find(x => x.userId === testData.userIds[0]);
      expect(user.isActive).toEqual(false);
    });

    it('should update tenantID on verify company code success', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.verifyUserCompanyCodeSuccess({
        payload: testData.tenantId,
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userVerifyCompanyCodeTenantId).toEqual(testData.tenantId);
    });

    it('should clear user verify Company Code Tenant ID', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.clearUserDefaultTenant();
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userVerifyCompanyCodeTenantId).toEqual('');
    });

    it('should update tenantID to null verify company code failure', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.verifyUserCompanyCodeFailure({
        payload: 'error',
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userVerifyCompanyCodeTenantId).toEqual(null);
    });
    it('should update userProfile on success', () => {
      const { initialUserState } = fromUserReducers;
      initialUserState.users = testData.usersList;
      const previousState = { ...initialUserState, countryList };
      const action = fromActions.userProfileSuccess({
        payload: { body: [testData.userDetail] },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userProfile).toEqual([testData.userDetail]);
      expect(state.userProfileLoaded).toEqual(true);
    });
    it('should load User Field Names', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.loadUserFieldsNames({
        payload: testData.registrationFieldsList,
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userFiledsNames).toEqual(testData.registrationFieldsList);
    });
    it('should update User Permissions Setting', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.updateUserPermissionsSetting({
        payload: {
          body: testData.userPermissionRequest,
          userId: testData.UserId,
        },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.isLoadingSelectedUserPermission).toEqual(true);
      expect(state.isLoadedSelectedUserPermission).toEqual(false);
    });

    it('should update User Permissions Setting on success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.updateUserPermissionsSettingSuccess();
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.selectedUserPermissions).toEqual(null);
    });

    it('should clear User Permissions Setting on failure', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.updateUserPermissionsSettingFailure({
        payload: 'error on update',
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.isLoadingSelectedUserPermission).toEqual(false);
      expect(state.isLoadedSelectedUserPermission).toEqual(false);
      expect(state.selectedUserPermissions).toEqual(null);
      expect(state.selectedUserPermissionErrorMessage).toEqual('error on update');
    });
    it('should clear User Permissions Setting', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.clearUserPermissionsSetting();
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.isLoadingSelectedUserPermission).toEqual(false);
      expect(state.isLoadedSelectedUserPermission).toEqual(false);
      expect(state.selectedUserPermissions).toEqual(null);
    });
    it('should set  grouped Users Sort ', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.groupedUsersSort({
        payload: { sort: 'firstName' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.groupedUsersSort).toEqual('firstName');
    });
    it('should get domain tenant on success ', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.getDomainTenantSuccess({
        payload: testData.tenantId,
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.domainTenantId).toEqual(testData.tenantId);
    });

    it('should load user tenantId', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.loadUserTenantIds({
        payload: { userId: 'e970ddb9-d5fe-4e0f-8248-5771e7df679c' },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userTenantIds).toEqual(null);
    });

    it('should load user tenantIds success', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState, users };
      const action = fromActions.loadUserTenantIdsSuccess({
        payload: { body: testData.UserTenantIds },
      });
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.userTenantIds).toEqual(testData.UserTenantIds);
    });

    it('should load user tenantIds failure', () => {
      const { initialUserState } = fromUserReducers;
      const action = fromActions.loadUserTenantIdsFailure({ payload: '' });
      const state = fromUserReducers.reducer(initialUserState, action);

      expect(state.isLoading).toEqual(false);
      expect(state.isLoaded).toEqual(false);
      expect(state.errorMessage).toEqual('');
    });
    it('should clear user State', () => {
      const { initialUserState } = fromUserReducers;
      const previousState = { ...initialUserState };
      const action = fromActions.clearUserState();
      const state = fromUserReducers.reducer(previousState, action);
      expect(state.users).toEqual([]);
      expect(state.usersTablePage).toEqual(null);
      expect(state.usersTableSort).toEqual('');
      expect(state.usersTableFilterDataSource).toEqual(null);
      expect(state.usersShowFilters).toEqual(false);
      expect(state.userShowSelection).toEqual(false);
      expect(state.usersTableFilter).toEqual(null);
      expect(state.usersTableSearch).toEqual('');
      expect(state.isLoaded).toEqual(false);
      expect(state.isLoading).toEqual(false);
      expect(state.errorMessage).toEqual(null);
      expect(state.displayColumnList).toEqual([]);
      expect(state.mappingFields).toEqual([]);
      expect(state.selectedUsers).toEqual([]);
      expect(state.userProfileLoaded).toEqual(false);
      expect(state.userProfile).toEqual(null);
      expect(state.previewUsersList).toEqual([]);
      expect(state.userFiledsNames).toEqual(null);
      expect(state.selectedUserPermissions).toEqual(null);
      expect(state.groupList).toEqual(null);
      expect(state.groupsTablePage).toEqual(null);
      expect(state.groupsTableSort).toEqual('');
      expect(state.groupsTableFilter).toEqual(null);
      expect(state.groupsTableSearch).toEqual('');
      expect(state.groupsTableFilterDataSource).toEqual(null);
      expect(state.groupShowSelection).toEqual(false);
      expect(state.selectedGroups).toEqual([]);
      expect(state.groupsShowFilters).toEqual(false);
      expect(state.groupedUsersList).toEqual([]);
      expect(state.groupedUsersPagination).toEqual(null);
      expect(state.groupedUsersSort).toEqual('');
      expect(state.groupedUsersFilter).toEqual(null);
      expect(state.groupedUsersSearch).toEqual('');
      expect(state.groupedUsersFilterDataSource).toEqual(null);
      expect(state.groupedUsersShowSelection).toEqual(false);
      expect(state.groupedSelectedUsers).toEqual([]);
      expect(state.groupedUsersShowFilters).toEqual(false);
      expect(state.allGroupedUsers).toEqual([]);
      expect(state.addGroupUsersList).toEqual([]);
      expect(state.addGroupUsersSearchText).toEqual('');
      expect(state.addGroupUsersPagination).toEqual(null);
      expect(state.addGroupSelectedUser).toEqual([]);
      expect(state.addUsersShowSelection).toEqual(false);
      expect(state.userVerifyCompanyCodeTenantId).toEqual(null);
      expect(state.domainTenantId).toEqual(null);
      expect(state.isLoadedSelectedUserPermission).toEqual(false);
      expect(state.isLoadingSelectedUserPermission).toEqual(false);
    });
  });
});
