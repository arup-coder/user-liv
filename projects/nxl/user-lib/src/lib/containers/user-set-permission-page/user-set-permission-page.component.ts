import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDialogSetPermissionsComponent } from '../../components/user-dialog-set-permissions/user-dialog-set-permissions.component';
import { UserPermissionResponse } from '../../models/user-permission-response.model';
import { UserPermissionsPostRequest } from '../../models/user-permission-post-request.model';
import * as fromStore from '../../store';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'lib-user-set-permission-page',
  templateUrl: './user-set-permission-page.component.html',
  styleUrls: ['./user-set-permission-page.component.scss'],
})
export class UserSetPermissionPageComponent implements OnInit {
  setPermissions$: UserPermissionResponse[];
  dialogRef: any;
  selectedUserData: any;
  userId: string;
  userPermissionRequest: UserPermissionsPostRequest[];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public router: Router,
    private store: Store<fromStore.UserState>,
  ) {
    this.store
      .pipe(select(fromStore.getSelectedPermissionsSettings))
      .pipe(tap(SettingData => (this.setPermissions$ = SettingData)))
      .subscribe();
    this.route.params
      .pipe(
        tap(params => {
          this.userId = params.userId;
        }),
      )
      .subscribe();
    this.store
      .pipe(select(fromStore.getSelectedUserById(this.userId)))
      .pipe(tap(SettingData => (this.selectedUserData = SettingData)))
      .subscribe();
  }
  ngOnInit() {
    this.openDialog();
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(UserDialogSetPermissionsComponent, {
      data: {
        setPermissions: this.setPermissions$,
        setname: this.selectedUserData ? this.selectedUserData.firstName : '',
      },
      panelClass: 'dialog-style-lg',
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.componentInstance.onClickCancel = this.onClickCancel;
    this.dialogRef.componentInstance.onClickSave = this.onClickSave;
    this.dialogRef.componentInstance.router = this.router;
    this.dialogRef.componentInstance.store = this.store;
    this.dialogRef.componentInstance.dialog = this.dialog;
    this.dialogRef.componentInstance.userId = this.userId;
  }

  onClickCancel() {
    this.store.dispatch(fromStore.clearUserPermissionsSetting());
    this.dialog.closeAll();
    this.router.navigate(['user/user-list']);
  }
  onClickSave(selectedPermissions) {
    this.userPermissionRequest = [];
    selectedPermissions.forEach(module => {
      let permission = '';
      permission += (module.create ? 'AC,' : '');
      permission += (module.read ? 'AR,' : '');
      permission += (module.update ? 'AU,' : '');
      permission += (module.delete ? 'AD,' : '');
      const modulePermission: UserPermissionsPostRequest = {
        moduleName: module.moduleName,
        permission: permission.slice(0, -1)
      };
      this.userPermissionRequest.push(modulePermission);
    });
    this.store.dispatch(
      fromStore.updateUserPermissionsSetting({
        payload: { body: this.userPermissionRequest, userId: this.userId },
      }),
    );
    this.dialog.closeAll();
    this.router.navigate(['user/user-list']);
  }
}
