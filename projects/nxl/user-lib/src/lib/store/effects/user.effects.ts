import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as userActions from '../actions/index';
import { UserService } from '../../services/user.service';
import { UserExportProductService } from '../../services/user.export-product.service';
import { UserPermissionService } from '../../services/user.permission.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private exportUserProductService: UserExportProductService,
    private userPermissionService: UserPermissionService,
    public router: Router,
  ) {}

  // load
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      switchMap(action => {
        return this.userService
          .getUsersList(
            action.payload.pagination,
            action.payload.sort,
            action.payload.filter,
            action.payload.searchText,
            action.payload.tenantId,
          )
          .pipe(
            map(users =>
              userActions.loadUsersSuccess({
                payload: {
                  body: users.body,
                  headers: users.headers,
                  sort: users.sort,
                  filter: users.filter,
                  searchText: users.searchText,
                },
              }),
            ),
            catchError(error => of(userActions.loadUsersFailure({ payload: error }))),
          );
      }),
    ),
  );

  //add
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUser),
      map(actions => actions),
      switchMap(action => {
        return this.userService.createAuthUser(action.payload.body, action.payload.tenantId).pipe(
          map(user => {
            return userActions.addUserSuccess({
              payload: { body: user, route: this.router.navigate(['/user/user-list']) },
            });
          }),
          catchError(error =>
            of(
              userActions.addUserFailure({
                payload: error,
                route: this.router.navigate(['/user/user-add']),
              }),
            ),
          ),
        );
      }),
    ),
  );

  // update
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .updateUser(
            action.payload.body.request,
            action.payload.selectedUserId,
            action.payload.tenantId,
          )
          .pipe(
            map(() => {
              const updatedUser = Object.assign({}, action.payload.body.request, {
                userId: action.payload.selectedUserId,
                isRegistered: action.payload.body.isRegistered,
              });
              return userActions.updateUserSuccess({
                payload: { body: updatedUser, route: this.router.navigate(['/user/user-list']) },
              });
            }),
            catchError(error => of(userActions.updateUserFailure({ payload: error }))),
          );
      }),
    ),
  );

  // get user profile
  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.userProfile),
      switchMap(action => {
        return this.userService
          .getUserById(action.payload.profileUserId, action.payload.tenantId)
          .pipe(
            map(user =>
              userActions.userProfileSuccess({
                payload: {
                  body: user ? [user] : [],
                },
              }),
            ),
            catchError(error => {
              return of(userActions.userProfileFailure({ payload: error }));
            }),
          );
      }),
    ),
  );

  //Activate Users
  activateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.activateUsers),
      switchMap(action => {
        return this.userService.activateUsers(action.payload.userIds, action.payload.tenantId).pipe(
          map(() =>
            userActions.activateUsersSuccess({
              payload: { userIds: action.payload.userIds },
            }),
          ),
          catchError(error => of(userActions.activateUsersFailure({ payload: error }))),
        );
      }),
    ),
  );

  //Deactivate Users
  deActivateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deActivateUsers),
      switchMap(action => {
        return this.userService
          .deActivateUsers(action.payload.userIds, action.payload.tenantId)
          .pipe(
            map(() =>
              userActions.deActivateUsersSuccess({
                payload: { userIds: action.payload.userIds },
              }),
            ),
            catchError(error => of(userActions.deActivateUsersFailure({ payload: error }))),
          );
      }),
    ),
  );

  // getTenantIdsByUserId$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userActions.loadUserTenantIds),
  //     switchMap(action => {
  //       return this.userService.getUserTenantIds(action.payload.userId).pipe(
  //         map(tenant =>
  //           userActions.loadUserTenantIdsSuccess({
  //             payload: {
  //               body: tenant,
  //             },
  //           }),
  //         ),
  //         catchError(error => of(userActions.loadUserTenantIdsFailure({ payload: error }))),
  //       );
  //     }),
  //   ),
  // );

  // create bulk users
  loadPreviewUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadPreviewUsers),
      switchMap(action => {
        return this.userService
          .createUsers(action.payload.previewList, action.payload.tenantId)
          .pipe(
            map(users =>
              userActions.loadPreviewUsersSuccess({
                payload: {
                  body: users,
                },
              }),
            ),
            catchError(error => {
              return of(userActions.loadPreviewUsersFailure({ payload: error }));
            }),
          );
      }),
    ),
  );

  // export Current Search User Products
  exportCurrentSearchUserProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.exportCurrentSearchUserProducts),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .getFilteredUsers(
            action.payload.filterValues,
            action.payload.searchText,
            action.payload.sort,
            action.payload.tenantId,
          )
          .pipe(
            map(users => {
              this.exportUserProductService.downloadFile(
                users,
                'UserList',
                action.payload.exportHeaderList,
              );
              return userActions.exportCurrentSearchUserProductsSuccess();
            }),
            catchError(error =>
              of(userActions.exportCurrentSearchUserProductsFailure({ payload: error })),
            ),
          );
      }),
    ),
  );

  // export All Search User Products
  exportAllUserProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.exportAllUserProducts),
      map(actions => actions),
      switchMap(action => {
        return this.userService.getAllUsers(action.payload.sort, action.payload.tenantId).pipe(
          map(users => {
            this.exportUserProductService.downloadFile(
              users,
              'UserList',
              action.payload.exportHeaderList,
            );
            return userActions.exportAllUserProductsSuccess();
          }),
          catchError(error => of(userActions.exportAllUserProductsFailure({ payload: error }))),
        );
      }),
    ),
  );

  // register User
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.registerUser),
      map(actions => actions),
      switchMap(action => {
        return this.userService.registerUser(action.payload.userId, action.payload.tenantId).pipe(
          map(() => {
            const updatedRegisteredUser = Object.assign({}, action.payload.body, {
              userId: action.payload.userId,
              isRegistered: true,
            });
            userActions.registerUserSuccess();
            if (action.payload.actionType === 'create') {
              return userActions.createUnRegisteredUserSuccess({
                payload: {
                  body: updatedRegisteredUser,
                  route: this.router.navigate(['/home']),
                },
              });
            } else {
              return userActions.updateUnRegisteredUserSuccess({
                payload: {
                  body: [updatedRegisteredUser],
                  route: this.router.navigate(['/home']),
                },
              });
            }
          }),
          catchError(error => of(userActions.registerUserFailure({ payload: error }))),
        );
      }),
    ),
  );

  // update register user details
  updateRegisteredUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUnRegisteredUser),
      switchMap(action => {
        return this.userService
          .updateUser(action.payload.body, action.payload.userId, action.payload.tenantId)
          .pipe(
            map(() => {
              return userActions.registerUser({
                payload: {
                  body: action.payload.body,
                  userId: action.payload.userId,
                  tenantId: action.payload.tenantId,
                  actionType: 'update',
                },
              });
            }),
            catchError(error => {
              return of(
                userActions.updateUnRegisteredUserFailure({
                  payload: error,
                  route: this.router.navigate(['/user/user-registration']),
                }),
              );
            }),
          );
      }),
    ),
  );

  createRegisteredUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUnRegisteredUser),
      switchMap(action => {
        return this.userService.createUser(action.payload.body, action.payload.tenantId).pipe(
          map(response => {
            return userActions.registerUser({
              payload: {
                body: action.payload.body[0],
                userId: action.payload.body[0].userId,
                tenantId: action.payload.tenantId,
                actionType: 'create',
              },
            });
          }),
          catchError(error => {
            return of(
              userActions.createUnRegisteredUserFailure({
                payload: error,
                route: this.router.navigate(['/user/user-registration']),
              }),
            );
          }),
        );
      }),
    ),
  );

  // update user profile
  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserProfile),
      switchMap(action => {
        return this.userService
          .updateUser(action.payload.body.request, action.payload.userId, action.payload.tenantId)
          .pipe(
            map(() => {
              const updatedUserProfile = Object.assign({}, action.payload.body.request, {
                userId: action.payload.userId,
                isRegistered: action.payload.body.isRegistered,
              });
              return userActions.updateUserProfileSuccess({
                payload: {
                  body: [updatedUserProfile],
                  route: this.router.navigate(['/home']),
                },
              });
            }),
            catchError(error => {
              return of(
                userActions.updateUserProfileFailure({
                  payload: error,
                  route: this.router.navigate(['/profile/user-profile']),
                }),
              );
            }),
          );
      }),
    ),
  );

  //load permissions
  loadPermissionsSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUserPermissionsSetting),
      switchMap(action =>
        this.userPermissionService.getUserPermissions(action.payload.userId).pipe(
          map(settingData =>
            userActions.loadUserPermissionsSettingSuccess({ payload: settingData }),
          ),
          catchError(error =>
            of(userActions.loadUserPermissionsSettingFailure({ payload: error })),
          ),
        ),
      ),
    ),
  );

  // update permission
  updatePermissionsSetting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUserPermissionsSetting),
      map(actions => actions),
      switchMap(action => {
        return this.userPermissionService
          .updateUserPermissions(action.payload.body, action.payload.userId)
          .pipe(
            map(settings => {
              return userActions.updateUserPermissionsSettingSuccess();
            }),
            catchError(error =>
              of(userActions.updateUserPermissionsSettingFailure({ payload: error })),
            ),
          );
      }),
    ),
  );

  // load groups
  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadGroupsList),
      switchMap(action => {
        return this.userService
          .getGroupsList(
            action.payload.pagination,
            action.payload.sort,
            action.payload.filter,
            action.payload.searchText,
            action.payload.tenantId,
          )
          .pipe(
            map(groupsList =>
              userActions.loadGroupsListSuccess({
                payload: {
                  body: groupsList.body,
                  headers: groupsList.headers,
                  sort: groupsList.sort,
                  filter: groupsList.filter,
                  searchText: groupsList.searchText,
                },
              }),
            ),
            catchError(error => of(userActions.loadGroupsFailure({ payload: error }))),
          );
      }),
    ),
  );

  // update Group status
  updateGroupStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateGroupStatus),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .updateGroupStatus(action.payload.groupIds, action.payload.status)
          .pipe(
            map(() => {
              return userActions.updateGroupStatusSuccess({
                payload: { groupIds: action.payload.groupIds, status: action.payload.status },
              });
            }),
            catchError(error => of(userActions.updateGroupStatusFailure({ payload: error }))),
          );
      }),
    ),
  );

  // add
  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addGroup),
      map(actions => actions),
      switchMap(action => {
        return this.userService.createGroups(action.payload.body, action.payload.tenantId).pipe(
          map(group => {
            return userActions.addGroupSuccess({
              payload: {
                body: group,
                route: this.router.navigate(['/user/user-group-details/', group.groupId]),
              },
            });
          }),
          catchError(error => of(userActions.addGroupFailure({ payload: error }))),
        );
      }),
    ),
  );

  // update group
  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateGroup),
      map(actions => actions),
      switchMap(action => {
        return this.userService.updateGroup(action.payload.body).pipe(
          map(() => {
            const updatedGroup = Object.assign({}, action.payload.body, {
              groupId: action.payload.body.groupId,
            });
            return userActions.updateGroupSuccess({
              payload: {
                body: updatedGroup,
                groupId: action.payload.body.groupId,
                route: this.router.navigate(['/user/user-group-management']),
              },
            });
          }),
          catchError(error => of(userActions.updateGroupFailure({ payload: error }))),
        );
      }),
    ),
  );

  // // load unmapped users
  // getAllUnmappedUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userActions.getUnMappedUsers),
  //     switchMap(action => {
  //       return this.userService
  //         .getUnmappedUsersList(
  //           action.payload.pagination,
  //           action.payload.searchText,
  //           action.payload.groupId,
  //         )
  //         .pipe(
  //           map(users =>
  //             userActions.getUnMappedUsersSuccess({
  //               payload: {
  //                 body: users.body,
  //                 headers: users.headers,
  //                 searchText: users.searchText,
  //                 route: this.router.navigate([
  //                   'user/user-group-details/' + action.payload.groupId,
  //                   { outlets: { dialog: ['user-group-add-users', action.payload.groupId] } },
  //                 ]),
  //               },
  //             }),
  //           ),
  //           catchError(error => of(userActions.getUnMappedUsersFailure({ payload: error }))),
  //         );
  //     }),
  //   ),
  // );

  // add users to a group
  addUsersToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUsersToGroup),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .addUsersToGroup(action.payload.selectedUsers, action.payload.groupId)
          .pipe(
            map(user => {
              return userActions.addUsersToGroupSuccess({
                payload: {
                  body: action.payload.selectedUsers,
                  route: this.router.navigate([
                    '/user/user-group-details/',
                    action.payload.groupId,
                  ]),
                },
              });
            }),
            catchError(error =>
              of(
                userActions.addUsersToGroupFailure({
                  payload: error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  // load  users by group Id
  loadUsersByGroupId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadGroupedUsers),
      switchMap(action => {
        return this.userService
          .getUsersListByGroupId(
            action.payload.pagination,
            action.payload.sort,
            action.payload.filter,
            action.payload.searchText,
            action.payload.groupId,
          )
          .pipe(
            map(users =>
              userActions.loadGroupedUsersSuccess({
                payload: {
                  body: users.body,
                  headers: users.headers,
                  sort: users.sort,
                  filter: users.filter,
                  searchText: users.searchText,
                },
              }),
            ),
            catchError(error => of(userActions.loadUsersFailure({ payload: error }))),
          );
      }),
    ),
  );

  // remove user from a  group
  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.removeUser),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .removeUser(action.payload.selectedUser, action.payload.groupId)
          .pipe(
            map(() => {
              return userActions.removeUserSuccess({
                payload: {
                  body: action.payload.selectedUser,
                },
              });
            }),
            catchError(error => of(userActions.removeUserFailure({ payload: error }))),
          );
      }),
    ),
  );

  // export All Search User Products
  exportAllGroupedUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.exportAllGroupedUsers),
      map(actions => actions),
      switchMap(action => {
        return this.userService
          .getAllGroupedUsers(action.payload.sort, action.payload.groupId)
          .pipe(
            map(users => {
              this.exportUserProductService.downloadFile(
                users,
                'UserList',
                action.payload.exportHeaderList,
              );
              return userActions.exportAllGroupedUsersSuccess();
            }),
            catchError(error => of(userActions.exportAllGroupedUsersFailure({ payload: error }))),
          );
      }),
    ),
  );

  // load all grouped users by group Id
  loadAllGroupedUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllGroupedUser),
      switchMap(action => {
        return this.userService.getAllGroupedUsersList(action.payload.groupId).pipe(
          map(users =>
            userActions.getAllGroupedUsersSuccess({
              payload: {
                body: users,
              },
            }),
          ),
          catchError(error => of(userActions.getAllGroupedUsersFailure({ payload: error }))),
        );
      }),
    ),
  );

  //load country List
  loadCountryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadCountryList),
      switchMap(action => {
        return this.userService.getCountryList().pipe(
          map(countries =>
            userActions.loadCountryListSuccess({
              payload: {
                body: countries,
              },
            }),
          ),
          catchError(error => of(userActions.loadCountryListFailure({ payload: error }))),
        );
      }),
    ),
  );

  //load state List
  loadStateList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadStateList),
      switchMap(action => {
        return this.userService.getStateList(action.payload).pipe(
          map(states =>
            userActions.loadStateListSuccess({
              payload: {
                body: states,
              },
            }),
          ),
          catchError(error => of(userActions.loadStateListFailure({ payload: error }))),
        );
      }),
    ),
  );

  //verify Company Code
  verifyUserCompanyCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.verifyUserCompanyCode),
      switchMap(action => {
        return this.userService.verifyCompanyCode(action.payload).pipe(
          map(tenantID =>
            userActions.verifyUserCompanyCodeSuccess({
              payload: tenantID,
            }),
          ),
          catchError(error => of(userActions.verifyUserCompanyCodeFailure({ payload: error }))),
        );
      }),
    ),
  );

  getTenantIdsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUserTenantIds),
      switchMap(action => {
        return this.userService.getUserTenantIds(action.payload.userId).pipe(
          map(tenant =>
            userActions.loadUserTenantIdsSuccess({
              payload: {
                body: tenant,
              },
            }),
          ),
          catchError(error => of(userActions.loadUserTenantIdsFailure({ payload: error }))),
        );
      }),
    ),
  );

  //activate users
  getDomainTenant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getDomainTenant),
      switchMap(action => {
        return this.userService.getDomainTenant(action.payload).pipe(
          map(tenantID =>
            //console.log(tenantID);
            userActions.getDomainTenantSuccess({
              payload: tenantID,
            }),
          ),
          catchError(error => of(userActions.getDomainTenantFailure({ payload: error }))),
        );
      }),
    ),
  );

  // load
  loadAddUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadAddUsers),
      switchMap(action => {
        return this.userService
          .getUsersList(
            action.payload.pagination,
            action.payload.sort,
            action.payload.filter,
            action.payload.searchText,
            action.payload.tenantId,
          )
          .pipe(
            map(users =>
              userActions.loadAddUsersSuccess({
                payload: {
                  body: users.body,
                  headers: users.headers,
                  sort: users.sort,
                  filter: users.filter,
                  searchText: users.searchText,
                  route: this.router.navigate([
                    'user/user-group-details/' + action.payload.groupId,
                    { outlets: { dialog: ['user-group-add-users', action.payload.groupId] } },
                  ]),
                },
              }),
            ),
            catchError(error => of(userActions.loadAddUsersFailure({ payload: error }))),
          );
      }),
    ),
  );
}
