import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDialogExportProductComponent } from '../../components/user-dialog-export-product/user-dialog-export-product.component';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { FilterValues } from '../../models/user-response.model';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserExportProductService } from '../../services/user.export-product.service';
import { TableColumns } from '../../models/user-table-column-model';
import { funGetUserActiveTenantId } from '../../functions';

@Component({
  selector: 'lib-user-export-product-page',
  templateUrl: './user-export-product-page.component.html',
  styleUrls: ['./user-export-product-page.component.scss'],
})
export class UserExportProductPageComponent implements OnInit {
  selectedExportType: string;
  selectedExportFileType: string;
  filterValues: FilterValues[];
  latestSortingOrder: string;
  searchText: string;
  exportUserList: User[];
  exportUserHeaderList: TableColumns[];
  groupId: string;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    private store: Store<fromStore.UserState>,
    private exportUserProductService: UserExportProductService,
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.groupId = params.groupId;
        }),
      )
      .subscribe();
    this.exportUserHeaderList = [];
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogExportProductComponent, {
      panelClass: 'dialog-style-two',
      disableClose: true,
    });
    dialogRef.componentInstance.onClickCancel = this.onClickCancel;
    dialogRef.componentInstance.onClickExport = this.onClickExport;
    dialogRef.componentInstance.selectedExportType = this.selectedExportType;
    dialogRef.componentInstance.selectedExportFileType = this.selectedExportFileType;
    dialogRef.componentInstance.exportCurrentPageUsers = this.exportCurrentPageUsers;
    dialogRef.componentInstance.exportSelectedUsers = this.exportSelectedUsers;
    dialogRef.componentInstance.exportFilteredUsers = this.exportFilteredUsers;
    dialogRef.componentInstance.exportAllUsers = this.exportAllUsers;
    dialogRef.componentInstance.router = this.router;
    dialogRef.componentInstance.store = this.store;
    dialogRef.componentInstance.dialog = this.dialog;
    dialogRef.componentInstance.exportUserProductService = this.exportUserProductService;

    // group management implementation
    dialogRef.componentInstance.groupId = this.groupId;
    dialogRef.componentInstance.getCoulmnList = this.getCoulmnList;
  }
  onClickCancel() {
    if (this.groupId) {
      this.dialog.closeAll();
      this.router.navigate(['user/user-group-details/', this.groupId]);
    } else {
      this.dialog.closeAll();
      this.router.navigate(['user/user-list']);
    }
  }
  onClickExport(selectedExportType: string) {
    this.getCoulmnList();
    if (selectedExportType === 'currentpage') {
      this.exportCurrentPageUsers();
    } else if (selectedExportType === 'alluser') {
      this.exportAllUsers();
    } else if (selectedExportType === 'selecteduser') {
      this.exportSelectedUsers();
    } else {
      this.exportFilteredUsers();
    }
  }

  exportCurrentPageUsers() {
    if (this.groupId) {
      this.store
        .pipe(select(fromStore.getSelectedGroupedUsersList))
        .pipe(tap(users => (this.exportUserList = users)))
        .subscribe();
    } else {
      this.store
        .pipe(select(fromStore.getSelectedUsersList))
        .pipe(tap(users => (this.exportUserList = users)))
        .subscribe();
    }
    this.exportUserProductService.downloadFile(
      this.exportUserList,
      'UserList',
      this.exportUserHeaderList,
    );
  }

  exportAllUsers() {
    if (this.groupId) {
      this.store.dispatch(
        fromStore.exportAllGroupedUsers({
          payload: {
            exportHeaderList: this.exportUserHeaderList,
            sort: this.latestSortingOrder,
            groupId: this.groupId,
          },
        }),
      );
    } else {
      this.store.dispatch(
        fromStore.exportAllUserProducts({
          payload: {
            exportHeaderList: this.exportUserHeaderList,
            sort: this.latestSortingOrder,
            tenantId: funGetUserActiveTenantId(),
          },
        }),
      );
    }
  }

  exportSelectedUsers() {
    if (this.groupId) {
      this.store
        .pipe(select(fromStore.getSelectedGrouppedUsers))
        .pipe(tap(users => (this.exportUserList = users)))
        .subscribe();
    } else {
      this.store
        .pipe(select(fromStore.getSelectedUsers))
        .pipe(tap(users => (this.exportUserList = users)))
        .subscribe();
    }

    this.exportUserProductService.downloadFile(
      this.exportUserList,
      'UserList',
      this.exportUserHeaderList,
    );
  }

  exportFilteredUsers() {
    if (this.groupId) {
      this.store
        .pipe(select(fromStore.getSelectedGroupedUsersSearchText))
        .pipe(tap(userSearchText => (this.searchText = userSearchText)))
        .subscribe();
    } else {
      this.store
        .pipe(select(fromStore.getSelectedFilterValues))
        .pipe(tap(filtervals => (this.filterValues = filtervals)))
        .subscribe();
      this.store
        .pipe(select(fromStore.getSelectedUserSearchText))
        .pipe(tap(userSearchText => (this.searchText = userSearchText)))
        .subscribe();
    }

    this.store.dispatch(
      fromStore.exportCurrentSearchUserProducts({
        payload: {
          filterValues: this.groupId ? null : this.filterValues,
          searchText: this.searchText,
          exportHeaderList: this.exportUserHeaderList,
          sort: this.latestSortingOrder,
          tenantId: funGetUserActiveTenantId(),
        },
      }),
    );
  }

  getCoulmnList() {
    if (this.groupId) {
      this.store
        .pipe(select(fromStore.getSelectedGropedExportUserColumnList))
        .pipe(tap(columns => (this.exportUserHeaderList = columns)))
        .subscribe();
      this.store
        .pipe(select(fromStore.getSelectedGroupedUsersSortingOrder))
        .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
        .subscribe();
    } else {
      this.store
        .pipe(select(fromStore.getSelectedExportUserColumnList))
        .pipe(tap(columns => (this.exportUserHeaderList = columns)))
        .subscribe();
      this.store
        .pipe(select(fromStore.getSelectedSortingOrder))
        .pipe(tap(sortedValues => (this.latestSortingOrder = sortedValues)))
        .subscribe();
    }
  }
}
