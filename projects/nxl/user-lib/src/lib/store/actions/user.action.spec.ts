import * as actions from '../actions/index';

describe('Users Actions', () => {
  describe('loadUsers', () => {
    it('should return [User] Load Users', () => {
      const type = '[User] Load Users';
      const action = actions.loadUsers;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUsersSuccess', () => {
    it('should return [User] Load Users Success', () => {
      const type = '[User] Load Users Success';
      const action = actions.loadUsersSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUsersFailure', () => {
    it('should return [User] Load Users Failure', () => {
      const type = '[User] Load Users Failure';
      const action = actions.loadUsersFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUser', () => {
    it('should return [User] Add User', () => {
      const type = '[User] Add User';
      const action = actions.addUser;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUserSuccess', () => {
    it('should return [User] Add User Success', () => {
      const type = '[User] Add User Success';
      const action = actions.addUserSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUserFailure', () => {
    it('should return [User] Add User Failure', () => {
      const type = '[User] Add User Failure';
      const action = actions.addUserFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUser', () => {
    it('should return [User] Update User', () => {
      const type = '[User] Update User';
      const action = actions.updateUser;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUserSuccess', () => {
    it('should return [User] Update User Success', () => {
      const type = '[User] Update User Success';
      const action = actions.updateUserSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUserFailure', () => {
    it('should return [User] Update User Failure', () => {
      const type = '[User] Update User Failure';
      const action = actions.updateUserFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('sortUsers', () => {
    it('should return [User] User Sorting Order Change', () => {
      const type = '[User] Sort Users';
      const action = actions.sortUsers;
      expect(type).toEqual(action.type);
    });
  });
  describe('userPaginationChange', () => {
    it('should return [User] User Pagination Change', () => {
      const type = '[User] User Pagination Change';
      const action = actions.userPaginationChange;
      expect(type).toEqual(action.type);
    });
  });
  describe('filterValueUsers', () => {
    it('should return [User] Filter Users', () => {
      const type = '[User] Filter Users';
      const action = actions.filterValueUsers;
      expect(type).toEqual(action.type);
    });
  });
  describe('filterOnOff', () => {
    it('should return [User] Filter On Off', () => {
      const type = '[User] Filter On Off';
      const action = actions.filterOnOff;
      expect(type).toEqual(action.type);
    });
  });
  describe('userSearch', () => {
    it('should return [User] User Search', () => {
      const type = '[User] User Search';
      const action = actions.userSearch;
      expect(type).toEqual(action.type);
    });
  });
  describe('userTableColumnsVisableChange', () => {
    it('should return [User] Table Columns Visible Change', () => {
      const type = '[User] Table Columns Visible Change';
      const action = actions.userTableColumnsVisableChange;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadUsersSuccess', () => {
    it('should return [User] Load Users Success', () => {
      const type = '[User] Load Users Success';
      const action = actions.loadUsersSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUsersFailure', () => {
    it('should return [User] Load Users Failure', () => {
      const type = '[User] Load Users Failure';
      const action = actions.loadUsersFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUser', () => {
    it('should return [User] Add User', () => {
      const type = '[User] Add User';
      const action = actions.addUser;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUserSuccess', () => {
    it('should return [User] Add User Success', () => {
      const type = '[User] Add User Success';
      const action = actions.addUserSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('addUserFailure', () => {
    it('should return [User] Add User Failure', () => {
      const type = '[User] Add User Failure';
      const action = actions.addUserFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUser', () => {
    it('should return [User] Update User', () => {
      const type = '[User] Update User';
      const action = actions.updateUser;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUserSuccess', () => {
    it('should return [User] Update User Success', () => {
      const type = '[User] Update User Success';
      const action = actions.updateUserSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('updateUserFailure', () => {
    it('should return [User] Update User Failure', () => {
      const type = '[User] Update User Failure';
      const action = actions.updateUserFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('sortUsers', () => {
    it('should return [User] User Sorting Order Change', () => {
      const type = '[User] Sort Users';
      const action = actions.sortUsers;
      expect(type).toEqual(action.type);
    });
  });
  describe('userPaginationChange', () => {
    it('should return [User] User Pagination Change', () => {
      const type = '[User] User Pagination Change';
      const action = actions.userPaginationChange;
      expect(type).toEqual(action.type);
    });
  });
  describe('filterValueUsers', () => {
    it('should return [User] Filter Users', () => {
      const type = '[User] Filter Users';
      const action = actions.filterValueUsers;
      expect(type).toEqual(action.type);
    });
  });
  describe('filterOnOff', () => {
    it('should return [User] Filter On Off', () => {
      const type = '[User] Filter On Off';
      const action = actions.filterOnOff;
      expect(type).toEqual(action.type);
    });
  });
  describe('userSearch', () => {
    it('should return [User] User Search', () => {
      const type = '[User] User Search';
      const action = actions.userSearch;
      expect(type).toEqual(action.type);
    });
  });
  describe('userTableColumnsVisableChange', () => {
    it('should return [User] Table Columns Visible Change', () => {
      const type = '[User] Table Columns Visible Change';
      const action = actions.userTableColumnsVisableChange;
      expect(type).toEqual(action.type);
    });
  });

  describe('userProfile', () => {
    it('should return [User] Get User Profile', () => {
      const type = '[User] Get User Profile';
      const action = actions.userProfile;
      expect(type).toEqual(action.type);
    });
  });
  describe('userProfileSuccess', () => {
    it('should return [User] Get User Profile Success', () => {
      const type = '[User] Get User Profile Success';
      const action = actions.userProfileSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('userProfileFailure', () => {
    it('should return [User] Get User Profile Failure', () => {
      const type = '[User] Get User Profile Failure';
      const action = actions.userProfileFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('exportAllUserProducts', () => {
    it('should return [User] Export All User Products', () => {
      const type = '[User] Export All User Products';
      const action = actions.exportAllUserProducts;
      expect(type).toEqual(action.type);
    });
  });

  describe('exportAllUserProductsSuccess', () => {
    it('should return [User] Export All User Products Success', () => {
      const type = '[User] Export All User Products Success';
      const action = actions.exportAllUserProductsSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('exportAllUserProductsFailure', () => {
    it('should return [User] Export All User Products Failure', () => {
      const type = '[User] Export All User Products Failure';
      const action = actions.exportAllUserProductsFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('exportCurrentSearchUserProducts', () => {
    it('should return [User] Export Searched  User Products', () => {
      const type = '[User] Export Searched  User Products';
      const action = actions.exportCurrentSearchUserProducts;
      expect(type).toEqual(action.type);
    });
  });

  describe('exportCurrentSearchUserProductsSuccess', () => {
    it('should return [User] Export Searched User Products Success', () => {
      const type = '[User] Export Searched User Products Success';
      const action = actions.exportCurrentSearchUserProductsSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('exportCurrentSearchUserProductsFailure', () => {
    it('should return [User] Export Searched User Products Failure', () => {
      const type = '[User] Export Searched User Products Failure';
      const action = actions.exportCurrentSearchUserProductsFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadPermissionsSetting', () => {
    it('should return [Permission] Load  User PermissionsSetting', () => {
      const type = '[Permission] Load  User PermissionsSetting';
      const action = actions.loadUserPermissionsSetting;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadPermissionsSettingSuccess', () => {
    it('should return [Permission] Load User PermissionsSetting Success', () => {
      const type = '[Permission] Load User PermissionsSetting Success';
      const action = actions.loadUserPermissionsSettingSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadPermissionsSettingFailure', () => {
    it('should return [Permission] Load User PermissionsSetting Failure', () => {
      const type = '[Permission] Load User PermissionsSetting Failure';
      const action = actions.loadUserPermissionsSettingFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('updatePermissionsSetting', () => {
    it('should return [Permission] Update User PermissionsSetting', () => {
      const type = '[Permission] Update User PermissionsSetting';
      const action = actions.updateUserPermissionsSetting;
      expect(type).toEqual(action.type);
    });
  });
  describe('updatePermissionsSettingSuccess', () => {
    it('should return [Permission] Update User PermissionsSetting Success', () => {
      const type = '[Permission] Update User PermissionsSetting Success';
      const action = actions.updateUserPermissionsSettingSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('updatePermissionsSettingFailure', () => {
    it('should return [Permission] Update User PermissionsSetting Failure', () => {
      const type = '[Permission] Update User PermissionsSetting Failure';
      const action = actions.updateUserPermissionsSettingFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('clearUserState', () => {
    it('should return [User] clear User State', () => {
      const type = '[User] clear User State';
      const action = actions.clearUserState;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadCountryList', () => {
    it('should return [User] load Country list', () => {
      const type = '[User] load Country list';
      const action = actions.loadCountryList;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadCountryListSuccess', () => {
    it('should return [User] load Country list Success', () => {
      const type = '[User] load Country list Success';
      const action = actions.loadCountryListSuccess;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadCountryListFailure', () => {
    it('should return [User] load Country list Failure', () => {
      const type = '[User] load Country list Failure';
      const action = actions.loadCountryListFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadStateList', () => {
    it('should return [User] load State list', () => {
      const type = '[User] load State list';
      const action = actions.loadStateList;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadStateListSuccess', () => {
    it('should return [User] load State list Success', () => {
      const type = '[User] load State list Success';
      const action = actions.loadStateListSuccess;
      expect(type).toEqual(action.type);
    });
  });

  describe('loadStateListFailure', () => {
    it('should return [User] load State list Failure', () => {
      const type = '[User] load State list Failure';
      const action = actions.loadStateListFailure;
      expect(type).toEqual(action.type);
    });
  });

  describe('verifyUserCompanyCode', () => {
    it('should return [User] Verify User Company Code', () => {
      const type = '[User] Verify User Company Code';
      const action = actions.verifyUserCompanyCode;
      expect(type).toEqual(action.type);
    });
  });

  describe('verifyUserCompanyCodeSuccess', () => {
    it('should return [User] Verify User Company Code Success', () => {
      const type = '[User] Verify User Company Code Success';
      const action = actions.verifyUserCompanyCodeSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('verifyUserCompanyCodeFailure', () => {
    it('should return [User] Verify User Company Code Failure', () => {
      const type = '[User] Verify User Company Code Failure';
      const action = actions.verifyUserCompanyCodeFailure;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUserTenantIds', () => {
    it('should return [User] load User Tenant Ids', () => {
      const type = '[User] load User Tenant Ids';
      const action = actions.loadUserTenantIds;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUserTenantIdsSuccess', () => {
    it('should return [User] load User Tenant Ids Success', () => {
      const type = '[User] load User Tenant Ids Success';
      const action = actions.loadUserTenantIdsSuccess;
      expect(type).toEqual(action.type);
    });
  });
  describe('loadUserTenantIdsFailure', () => {
    it('should return [User] load User Tenant Ids Failure', () => {
      const type = '[User] load User Tenant Ids Failure';
      const action = actions.loadUserTenantIdsFailure;
      expect(type).toEqual(action.type);
    });
  });
});
