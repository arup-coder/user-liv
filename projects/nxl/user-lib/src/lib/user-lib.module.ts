import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialLibModule } from '@nxl/material-lib';
import { AuthorizationLibModule } from '@nxl/authorization-lib';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PhoneNumberPipe, StatusPipe, FilterSearchTextPipe } from '../lib/pipes/user.pipe';
import * as fromComponents from './components/index';
import * as fromContainers from './containers/index';
import * as fromServices from './services/index';
import * as fromResolvers from './resolvers/index';
import * as store from './store';
import { PermGuard } from '@nxl/authorization-lib';
import { Permissions, ModuleName } from './enums/user-permission-values-enums';

const routes: Routes = [
  {
    path: 'profile',
    redirectTo: 'profile/user-profile',
    canActivate: [PermGuard],
  },
  {
    path: 'profile',
    component: fromContainers.UserProfilePageComponent,
    resolve: { user: fromResolvers.UserResolver, country: fromResolvers.UserCountryResolver },
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    children: [
      {
        path: 'user-profile',
        component: fromContainers.UserProfileDetailsPageComponent,
        resolve: { user: fromResolvers.UserResolver },
        pathMatch: 'full',
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-password-reset',
        component: fromContainers.UserPasswordRestPageComponent,
        resolve: { user: fromResolvers.UserResolver },
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
    ],
  },
  {
    path: 'user-registration',
    pathMatch: 'full',
    component: fromContainers.UserRegistrationPageComponent,
    resolve: { country: fromResolvers.UserCountryResolver },
  },
  {
    path: 'user-add',
    component: fromContainers.UserAddEditPageComponent,
    pathMatch: 'full',
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    resolve: { country: fromResolvers.UserCountryResolver },
  },
  {
    path: 'user-edit/:userId',
    component: fromContainers.UserAddEditPageComponent,
    pathMatch: 'full',
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    resolve: { country: fromResolvers.UserCountryResolver },
  },
  {
    path: 'user-list',
    component: fromContainers.UserMainPageComponent,
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    resolve: { users: fromResolvers.UserListResolver, country: fromResolvers.UserCountryResolver },
    children: [
      {
        path: 'user-detail-view/:userId',
        component: fromContainers.UserDetailViewPageComponent,
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-column-selection',
        component: fromContainers.UserColumnSelectorPageComponent,
        outlet: 'dialog',
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-export-csv',
        component: fromContainers.UserExportProductPageComponent,
        outlet: 'dialog',
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-setpermissions/:userId',
        component: fromContainers.UserSetPermissionPageComponent,
        outlet: 'dialog',
      },
    ],
  },
  {
    path: 'user-sign-in/:userId',
    pathMatch: 'full',
    component: fromContainers.UserSignInPageComponent,
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
  },
  {
    path: 'user-audit-logs/:userId',
    pathMatch: 'full',
    component: fromContainers.UserAuditLogsPageComponent,
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
  },
  {
    path: 'user-import',
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    component: fromContainers.UserImportPageComponent,
    children: [
      {
        path: ':label',
        pathMatch: 'full',
        component: fromContainers.UserImportPageComponent,
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
    ],
  },
  {
    path: 'user-group-import/:groupId',
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    component: fromContainers.UserImportPageComponent,
    children: [
      {
        path: ':label',
        pathMatch: 'full',
        component: fromContainers.UserImportPageComponent,
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
    ],
  },
  {
    path: 'user-group-management',
    component: fromContainers.UserGroupManagementPageComponent,
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    children: [
      {
        path: 'user-group-add',
        component: fromContainers.UserGroupAddEditPageComponent,
        outlet: 'dialog',
      },
      {
        path: 'user-group-edit/:groupId',
        component: fromContainers.UserGroupAddEditPageComponent,
        outlet: 'dialog',
      },
    ],
  },
  {
    path: 'user-group-details/:groupId',
    component: fromContainers.UserGroupDetailsPageComponent,
    canActivate: [PermGuard],
    data: { permission: [Permissions.read, ModuleName.User] },
    children: [
      {
        path: 'user-group-add-users/:groupId',
        component: fromContainers.UserGroupAddUsersPageComponent,
        outlet: 'dialog',
      },
      {
        path: 'user-detail-view/:userId/:groupId',
        component: fromContainers.UserDetailViewPageComponent,
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-column-selection/:groupId',
        component: fromContainers.UserColumnSelectorPageComponent,
        outlet: 'dialog',
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-export-csv/:groupId',
        component: fromContainers.UserExportProductPageComponent,
        outlet: 'dialog',
        canActivate: [PermGuard],
        data: { permission: [Permissions.read, ModuleName.User] },
      },
      {
        path: 'user-group-edit/:groupId',
        component: fromContainers.UserGroupAddEditPageComponent,
        outlet: 'dialog',
      },
    ],
  },
];

@NgModule({
  imports: [
    MaterialLibModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatNativeDateModule,
    AuthorizationLibModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('user', store.reducers),
    EffectsModule.forFeature(store.effects),
    DragDropModule,
  ],
  entryComponents: [
    fromComponents.UserColumnSelectorDialogComponent,
    fromComponents.UserDialogExportProductComponent,
    fromComponents.UserDialogSetPermissionsComponent,
    fromComponents.UserGroupAddEditDialogComponent,
    fromComponents.UserGroupAddUsersDialogComponent,
  ],
  providers: [...fromServices.services, ...fromResolvers.resolvers],
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    PhoneNumberPipe,
    FilterSearchTextPipe,
    StatusPipe,
  ],
  bootstrap: [],
  exports: [RouterModule, ...fromComponents.components, ...fromContainers.containers],
})
export class UserLibModule { }
