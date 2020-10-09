import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupAddEditDialogComponent } from '../../components/user-group-add-edit-dialog/user-group-add-edit-dialog.component';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../store/index';
import { Store, select } from '@ngrx/store';
import { GroupList } from '../../models/group.model';
import { GroupPutRequest } from '../../models/group-put-request.model';

@Component({
  selector: 'lib-user-group-add-edit-page',
  templateUrl: './user-group-add-edit-page.component.html',
  styleUrls: ['./user-group-add-edit-page.component.scss'],
})
export class UserGroupAddEditPageComponent implements OnInit {
  dialogRef: any;
  selectedGroupId: string;
  groupDetail: GroupList;
  updatedGroupValue: GroupPutRequest;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.UserState>,
    private router: Router,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.selectedGroupId = params.groupId;
          this.store
            .pipe(select(fromStore.getSelectedGroupById(this.selectedGroupId)))
            .pipe(tap(groupDetail => (this.groupDetail = groupDetail)))
            .subscribe();
        }),
      )
      .subscribe();
    this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(UserGroupAddEditDialogComponent, {
      panelClass: 'dialog-style-one',
      data: this.groupDetail,
      disableClose: true,
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.componentInstance.onSaveGroup = this.onSaveGroup;
    this.dialogRef.componentInstance.onUpdateGroup = this.onUpdateGroup;
    this.dialogRef.componentInstance.onCancelGroup = this.onCancelGroup;
    this.dialogRef.componentInstance.groupDetail = this.groupDetail;
    this.dialogRef.componentInstance.store = this.store;
    this.dialogRef.componentInstance.updatedGroupValue = this.updatedGroupValue;
    this.dialogRef.componentInstance.dialogRef = this.dialogRef;
    this.dialogRef.componentInstance.router = this.router;
  }

  onSaveGroup(groupAddEditForm) {
    const tenantId = localStorage.getItem('nxl_active_tenantId');
    this.store.dispatch(
      fromStore.addGroup({
        payload: { tenantId: tenantId, body: groupAddEditForm.value },
      }),
    );
    this.dialogRef.close();
  }

  onUpdateGroup(groupAddEditForm) {
    this.dialogRef.close();
    const tenantId = localStorage.getItem('nxl_active_tenantId');
    this.updatedGroupValue = groupAddEditForm.value;
    this.updatedGroupValue.tenantId = tenantId;
    this.updatedGroupValue.groupId = this.groupDetail.groupId;
    this.store.dispatch(
      fromStore.updateGroup({
        payload: { body: this.updatedGroupValue },
      }),
    );
  }

  onCancelGroup() {
    this.dialogRef.close();
    this.router.navigate(['/user/user-group-management']);
  }
}
