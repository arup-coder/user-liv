import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { of, Observable, EMPTY } from 'rxjs';
import * as testData from '../../data/test/user-test-data';
import * as groupTestData from '../../data/test/group-test-data';
import { hot, cold } from 'jasmine-marbles';
import * as fromEffects from './user.effects';
import * as fromActions from '../actions/user.action';
import { UserService, UserExportProductService, UserPermissionService } from '../../services';

import { RouterTestingModule } from '@angular/router/testing';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('UserEffects', () => {
  let actions$: TestActions;
  let service: UserService;
  let userPermissionService: UserPermissionService;
  let effects: fromEffects.UserEffects;
  const payloadSelectPemission = {
    body: testData.userPermission,
    userId: 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f',
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
    filter: [
      {
        title: 'ActiveUser',
        value: { value: 'Active', displayValue: 'true' },
      },
    ],
    searchText: '',
  };

  const groupPayload = {
    body: groupTestData.groupList,
    headers: {
      page: 1,
      pageSize: 1,
      pageCount: 1,
      recordCount: 1,
    },
    sort: '',
    filter: [
      {
        title: 'ActiveUser',
        value: { value: 'Active', displayValue: 'true' },
      },
    ],
    searchText: '',
  };

  const unmappedUsersData = {
    body: testData.usersList,
    headers: groupTestData.paginationData,
    searchText: groupTestData.searchText,
  };

  const mockURI = {
    uri: { userServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/user-service/api/v1' },
    uri1: { sharedServiceUriV1: 'https://dev-core-apim-nxl.azure-api.net/shared-service/api/v1' },
    uri2: {
      authorizationServiceV1:
        'https://dev-core-apim-nxl.azure-api.net/authorization-Service/api/v1',
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        [UserExportProductService],
        [UserService],
        [UserPermissionService],
        fromEffects.UserEffects,
        { provide: Actions, useFactory: getActions },
        { provide: 'env', useValue: mockURI },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(UserService);
    // service = TestBed.get(UserService);
    userPermissionService = TestBed.get(UserPermissionService);
    effects = TestBed.get(fromEffects.UserEffects);

    spyOn(service, 'getUsersList').and.returnValue(of(payload));
    spyOn(service, 'getUserById').and.returnValue(of(testData.selectedUsers[0]));
    spyOn(service, 'updateUser').and.returnValue(of([testData.userDetail]));

    spyOn(service, 'getFilteredUsers').and.returnValue(of(testData.usersList));
    spyOn(service, 'getAllUsers').and.returnValue(of(testData.usersList));
    spyOn(service, 'createUsers').and.returnValue(of([testData.userRegisterDetail]));
    spyOn(service, 'createAuthUser').and.returnValue(of(testData.userRegisterDetail));
    spyOn(service, 'createUser').and.returnValue(of([testData.userRegisterDetail]));
    spyOn(service, 'getCountryList').and.returnValue(of(testData.countryList));
    spyOn(service, 'getStateList').and.returnValue(of(testData.stateList));
    spyOn(service, 'registerUser').and.returnValue(of(''));
    spyOn(userPermissionService, 'getUserPermissions').and.returnValue(of(testData.userPermission));
    spyOn(userPermissionService, 'updateUserPermissions').and.returnValue(
      of(testData.userPermission[0]),
    );
    spyOn(effects.router, 'navigate');

    spyOn(service, 'getGroupsList').and.returnValue(of(groupPayload));
    spyOn(service, 'updateGroupStatus').and.returnValue(of(''));
    spyOn(service, 'createGroups').and.returnValue(of(groupTestData.groupList[0]));
    spyOn(service, 'updateGroup').and.returnValue(of(groupTestData.groupList));
    spyOn(service, 'addUsersToGroup').and.returnValue(of(testData.selectedUsers));
    spyOn(service, 'getUsersListByGroupId').and.returnValue(of(payload));
    spyOn(service, 'removeUser').and.returnValue(of(groupTestData.removeUser));
    spyOn(service, 'getAllGroupedUsers').and.returnValue(of(groupTestData.removeUser));
    spyOn(service, 'getDomainTenant').and.returnValue(of(testData.tenantId));

    spyOn(service, 'activateUsers').and.returnValue(of(''));

    spyOn(service, 'deActivateUsers').and.returnValue(of(''));
    spyOn(service, 'verifyCompanyCode').and.returnValue(of(testData.tenantId));
    spyOn(service, 'getAllGroupedUsersList').and.returnValue(of(groupTestData.removeUser));
  });
  describe('loadUsers', () => {
    it('should return a list of users on success', () => {
      const action = fromActions.loadUsers({
        payload: {
          pagination: testData.paginationData,
          sort: testData.sortingData,
          filter: testData.filterData,
          searchText: testData.searchText,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.loadUsersSuccess({ payload });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadUsers$).toBeObservable(expected);
    });         
  });

  describe('addUser', () => {
    it('should return new user details on success', () => {
      const action = fromActions.addUser({
        payload: { body: testData.createADUser, tenantId: testData.tenantId },
      });
      const completion = fromActions.addUserSuccess({
        payload: { body: testData.userRegisterDetail, route: undefined },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.addUser$).toBeObservable(expected);
    });
  });

  describe('loadPreviewUsers', () => {
    it('should return load preview users on success', () => {
      const action = fromActions.loadPreviewUsers({
        payload: { previewList: [testData.registerUserDetail], tenantId: testData.tenantId },
      });
      const completion = fromActions.loadPreviewUsersSuccess({
        payload: {
          body: [testData.userRegisterDetail],
        },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadPreviewUsers$).toBeObservable(expected);
    });
  });

  describe('updateUser', () => {
    it('should return updated user details on success', () => {
      const action = fromActions.updateUser({
        payload: {
          body: {
            request: testData.updateUser,
            isRegistered: true,
          },
          selectedUserId: testData.userDetail.userId,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.updateUserSuccess({
        payload: { body: testData.testUpdatedUser, route: undefined },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updateUser$).toBeObservable(expected);
    });
  });

  describe('getUserById', () => {
    it('should return getUser ById on success', () => {
      const UserId = '11';
      const action = fromActions.userProfile({
        payload: { profileUserId: UserId, tenantId: testData.tenantId },
      });
      const completion = fromActions.userProfileSuccess({
        payload: { body: [testData.selectedUsers[0]] },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.getUserById$).toBeObservable(expected);
    });
  });

  describe('exportCurrentSearchUserProducts', () => {
    it('should return current search users', () => {
      const headerlist = testData.TableColumnList.filter(
        x => x.isExport === true && x.visible === true,
      );
      const action = fromActions.exportCurrentSearchUserProducts({
        payload: {
          filterValues: testData.filterData,
          searchText: testData.searchText,
          exportHeaderList: headerlist,
          sort: testData.sortingData,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.exportCurrentSearchUserProductsSuccess();
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.exportCurrentSearchUserProducts$).toBeObservable(expected);
    });
  });

  describe('exportAllUserProducts', () => {
    it('should return all users', () => {
      const headerlist = testData.TableColumnList.filter(
        x => x.isExport === true && x.visible === true,
      );
      const action = fromActions.exportAllUserProducts({
        payload: {
          exportHeaderList: headerlist,
          sort: testData.sortingData,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.exportAllUserProductsSuccess();
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.exportAllUserProducts$).toBeObservable(expected);
    });
  });

  describe('updateRegisteredUserDetails', () => {
    it('should return update  registered users on success', () => {
      const action = fromActions.updateUnRegisteredUser({
        payload: {
          body: testData.updateUser,
          userId: testData.updatedUser.userId,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.registerUser({
        payload: {
          body: testData.updateUser,
          userId: testData.updatedUser.userId,
          actionType: 'update',
          tenantId: testData.tenantId,
        },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updateRegisteredUserDetails$).toBeObservable(expected);
      //expect(effects.router.navigate).toHaveBeenCalled();
    });
  });

  describe('registerUser', () => {
    it('should register user', () => {
      const action = fromActions.registerUser({
        payload: {
          body: testData.updateUser,
          userId: testData.updatedUser.userId,
          actionType: 'update',
          tenantId: testData.tenantId,
        },
      });
      const regUser = Object.assign({}, testData.updateUser, {
        userId: testData.updatedUser.userId,
        isRegistered: true,
      });
      const completion = fromActions.updateUnRegisteredUserSuccess({
        payload: { body: [regUser], route: effects.router.navigate(['/home']) },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.registerUser$).toBeObservable(expected);
      // expect(effects.router.navigate).toHaveBeenCalled();
    });
  });

  describe('createRegisteredUserDetails', () => {
    it('should return create un registered users on success', () => {
      const action = fromActions.createUnRegisteredUser({
        payload: {
          body: [testData.userRegisterDetail],
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.registerUser({
        payload: {
          body: testData.userRegisterDetail,
          userId: testData.userRegisterDetail.userId,
          actionType: 'create',
          tenantId: testData.tenantId,
        },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.createRegisteredUserDetails$).toBeObservable(expected);
      //expect(effects.router.navigate).toHaveBeenCalled();
    });
  });

  describe('updateUserProfile', () => {
    it('should return update user profile success', () => {
      const action = fromActions.updateUserProfile({
        payload: {
          body: { request: testData.registerUserDetail, isRegistered: true },
          userId: '11',
          tenantId: testData.tenantId,
        },
      });
      const requestSuccess = Object.assign({}, testData.registerUserDetail, { isRegistered: true });
      const completion = fromActions.updateUserProfileSuccess({
        payload: { body: [requestSuccess], route: effects.router.navigate(['/home']) },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updateUserProfile$).toBeObservable(expected);
      expect(effects.router.navigate).toHaveBeenCalled();
    });
  });

  describe('loadPermissionSetting', () => {
    it('should return a list of Permissionetting on success', () => {
      const testUserId = 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f';
      const action = fromActions.loadUserPermissionsSetting({ payload: { userId: testUserId } });
      const completion = fromActions.loadUserPermissionsSettingSuccess({
        payload: testData.userPermission,
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadPermissionsSetting$).toBeObservable(expected);
    });
  });
  describe('updatePermissionSetting', () => {
    it('should return updated Permissionetting on success', () => {
      const action = fromActions.updateUserPermissionsSetting({
        payload: {
          body: testData.userPermission[0],
          userId: 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f',
        },
      });
      const completion = fromActions.updateUserPermissionsSettingSuccess();
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updatePermissionsSetting$).toBeObservable(expected);
    });
  });
  describe('loadGroups', () => {
    it('should return load groups success', () => {
      const action = fromActions.loadGroupsList({
        payload: {
          pagination: groupTestData.paginationData,
          sort: groupTestData.sortingData,
          filter: testData.filterData,
          searchText: groupTestData.searchText,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.loadGroupsListSuccess({
        payload: groupPayload,
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadGroups$).toBeObservable(expected);
    });
  });

  describe('update group status', () => {
    it('should return group updated status on success', () => {
      const UserIds = testData.selectedUsers.map(selectedUsers => selectedUsers.userId);
      const action = fromActions.updateGroupStatus({
        payload: { groupIds: UserIds, status: true },
      });
      const completion = fromActions.updateGroupStatusSuccess({
        payload: { groupIds: UserIds, status: true },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updateGroupStatus$).toBeObservable(expected);
    });
  });

  describe('addGroup', () => {
    it('should return new group details on success', () => {
      const action = fromActions.addGroup({
        payload: { body: groupTestData.addGroupData[0], tenantId: testData.tenantId },
      });
      const completion = fromActions.addGroupSuccess({
        payload: { body: groupTestData.groupList[0], route: undefined },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.addGroup$).toBeObservable(expected);
    });
  });

  describe('updateGroup', () => {
    it('should return updated group details on success', () => {
      const action = fromActions.updateGroup({
        payload: { body: groupTestData.updateGroupData[0] },
      });
      const completion = fromActions.updateGroupSuccess({
        payload: {
          body: groupTestData.updateGroupData[0],
          groupId: '1',
          route: undefined,
        },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.updateGroup$).toBeObservable(expected);
    });
  });

  describe('addUsersToGroup', () => {
    it('should return new users to a group on success', () => {
      const action = fromActions.addUsersToGroup({
        payload: { selectedUsers: testData.selectedUsers, groupId: '1' },
      });
      const completion = fromActions.addUsersToGroupSuccess({
        payload: { body: testData.selectedUsers, route: undefined },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.addUsersToGroup$).toBeObservable(expected);
    });
  });

  describe('loadUsersByGroupId', () => {
    it('should return load groups success', () => {
      const action = fromActions.loadGroupedUsers({
        payload: {
          pagination: groupTestData.paginationData,
          sort: groupTestData.sortingData,
          filter: testData.filterData,
          searchText: groupTestData.searchText,
          groupId: '1',
        },
      });
      const completion = fromActions.loadGroupedUsersSuccess({
        payload: payload,
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadUsersByGroupId$).toBeObservable(expected);
    });
  });

  describe('remove users from a group', () => {
    it('should return remove users from a group  success', () => {
      const action = fromActions.removeUser({
        payload: { selectedUser: groupTestData.removeUser, groupId: '1' },
      });
      const completion = fromActions.removeUserSuccess({
        payload: { body: groupTestData.removeUser },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.removeUser$).toBeObservable(expected);
    });
  });

  describe('exportAllGroupedUsers', () => {
    it('should return all exported users', () => {
      const headerlist = testData.TableColumnList.filter(
        x => x.isExport === true && x.visible === true,
      );
      const action = fromActions.exportAllGroupedUsers({
        payload: {
          exportHeaderList: headerlist,
          sort: testData.sortingData,
          groupId: '1',
        },
      });
      const completion = fromActions.exportAllGroupedUsersSuccess();
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.exportAllGroupedUsers$).toBeObservable(expected);
    });
  });

  describe('loadCountryList', () => {
    it('should return country list on success', () => {
      const action = fromActions.loadCountryList();
      const completion = fromActions.loadCountryListSuccess({
        payload: { body: testData.countryList },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadCountryList$).toBeObservable(expected);
    });
  });

  describe('loadStateList', () => {
    it('should return state list on success', () => {
      const action = fromActions.loadStateList({
        payload: 'IN',
      });
      const completion = fromActions.loadStateListSuccess({
        payload: { body: testData.stateList },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadStateList$).toBeObservable(expected);
    });
  });

  describe('getDomainTenant', () => {
    it('should return tenantId on success', () => {
      const action = fromActions.getDomainTenant({
        payload: 'amplify.com',
      });
      const completion = fromActions.getDomainTenantSuccess({
        payload: testData.tenantId,
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.getDomainTenant$).toBeObservable(expected);
    });
  });

  describe('activateUsers', () => {
    it('should return activat users on success', () => {
      const action = fromActions.activateUsers({
        payload: { userIds: testData.userIds, tenantId: testData.tenantId },
      });
      const completion = fromActions.activateUsersSuccess({
        payload: { userIds: testData.userIds },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.activateUsers$).toBeObservable(expected);
    });
  });

  describe('deactivateUsers', () => {
    it('should return deactivate users on success', () => {
      const action = fromActions.deActivateUsers({
        payload: { userIds: testData.userIds, tenantId: testData.tenantId },
      });
      const completion = fromActions.deActivateUsersSuccess({
        payload: { userIds: testData.userIds },
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.deActivateUsers$).toBeObservable(expected);
    });
  });

  describe('verifyUserCompanyCode', () => {
    it('should return Tenant data on success', () => {
      const action = fromActions.verifyUserCompanyCode({
        payload: 'EASTNXL5847',
      });
      const completion = fromActions.verifyUserCompanyCodeSuccess({
        payload: testData.tenantId,
      });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.verifyUserCompanyCode$).toBeObservable(expected);
    });
  });

  describe('loadAddUsers', () => {
    it('should return a list of users on success', () => {
      const action = fromActions.loadUsers({
        payload: {
          pagination: testData.paginationData,
          sort: testData.sortingData,
          filter: testData.filterData,
          searchText: testData.searchText,
          tenantId: testData.tenantId,
        },
      });
      const completion = fromActions.loadUsersSuccess({ payload });
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });


    describe('getUserTenantIds', () => {
      it('should return get user tenant ids success', () => {
        const action = fromActions.loadUserTenantIds({
          payload: {
            userId: testData.UserTenantIds[0],
          },
        });
        const completion = fromActions.loadUserTenantIdsSuccess({
          payload: {
            body: testData.UserTenantIds,
          },
        });
        actions$.stream = hot('-a', { a: action });
        const expected = cold('-c', { c: completion });
        expect(effects.getTenantIdsByUserId$).toBeObservable(expected);
      });
    });
});
