import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TableColumns } from '../../models/user-table-column-model';
import { UserColumnSelectorDialogComponent } from '../../components/user-dialog-column-selector/user-dialog-column-selector.component';
import {
  userTableColumnList,
  groupedUsersTableColumnList,
} from '../../data/defaults/user-default-values';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/index';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'lib-user-column-selector-page',
  templateUrl: './user-column-selector-page.component.html',
  styleUrls: ['./user-column-selector-page.component.scss'],
})
export class UserColumnSelectorPageComponent implements OnInit {
  userColumnList$: TableColumns[];
  userTableColumnVisableList: TableColumns[];
  groupId: string;
  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    private store: Store<fromStore.UserState>,
  ) {}
  ngOnInit() {
    this.userColumnList$ = [];
    this.route.params
      .pipe(
        tap(params => {
          this.groupId = params.groupId ? params.groupId : null;
          if (this.groupId) {
            this.store
              .pipe(select(fromStore.getSelectedIsGroupTableColumnList))
              .pipe(tap(columns => (this.userColumnList$ = columns)))
              .subscribe();
          } else {
            this.store
              .pipe(select(fromStore.getIsVisableTableColumnList))
              .pipe(tap(columns => (this.userColumnList$ = columns)))
              .subscribe();
          }
          this.openColumnSelectorDialog();
        }),
      )
      .subscribe();
  }
  openColumnSelectorDialog(): void {
    const dialogRef = this.dialog.open(UserColumnSelectorDialogComponent, {
      data: {
        userColumnList: this.userColumnList$,
      },
      panelClass: 'dialog-column-selector',
      width: '400px',
      disableClose: true,
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.onColumnVisableChange = this.onColumnVisableChange;
    dialogRef.componentInstance.onClickApply = this.onClickApply;
    dialogRef.componentInstance.onClickCancel = this.onClickCancel;
    dialogRef.componentInstance.onClickDeleteItem = this.onClickDeleteItem;
    dialogRef.componentInstance.onClickReset = this.onClickReset;
    dialogRef.componentInstance.drop = this.drop;
    dialogRef.componentInstance.router = this.router;
    dialogRef.componentInstance.store = this.store;
    dialogRef.componentInstance.dialog = this.dialog;
    dialogRef.componentInstance.groupId = this.groupId;
  }

  onColumnVisableChange($event: any, selectedColumn: TableColumns, allColumnList) {
    const selected = allColumnList.find(c => c.columnName === selectedColumn.columnName);
    if (this.userTableColumnVisableList) {
      allColumnList = this.userTableColumnVisableList;
    }
    if (selected) {
      selected.visible = $event.checked;
      this.userTableColumnVisableList = allColumnList;
    }
  }

  onClickApply() {
    if (!this.groupId) {
      this.store.dispatch(
        fromStore.userTableColumnsVisableChange({
          payload: { tableColumnsChange: this.userTableColumnVisableList },
        }),
      );
      this.dialog.closeAll();
      this.router.navigate(['user/user-list']);
    } else {
      this.store.dispatch(
        fromStore.groupedUserTableColumnsChange({
          payload: { tableColumnsChange: this.userTableColumnVisableList },
        }),
      );
      this.dialog.closeAll();

      this.router.navigate(['/user/user-group-details/', this.groupId]);
    }
  }

  onClickCancel() {
    if (!this.groupId) {
      this.router.navigate(['user/user-list']);
    } else {
      this.router.navigate(['/user/user-group-details/', this.groupId]);
    }
    this.dialog.closeAll();
  }

  onClickDeleteItem($event: any, selectedColumn: TableColumns, allColumnList) {
    const selected = allColumnList.find(c => c.columnName === selectedColumn.columnName);
    if (this.userTableColumnVisableList) {
      allColumnList = this.userTableColumnVisableList;
    }
    if (selected) {
      selected.visible = false;
      this.userTableColumnVisableList = allColumnList;
    }
  }

  onClickReset(allColumnList) {
    if (this.groupId) {
      const resetvalue = groupedUsersTableColumnList.map(x => Object.assign({}, x));
      this.store.dispatch(
        fromStore.groupedUserTableColumnsChange({ payload: { tableColumnsChange: resetvalue } }),
      );
      allColumnList = resetvalue;
      this.dialog.closeAll();
      this.router.navigate(['user/user-list']);
    } else {
      const resetvalue = userTableColumnList.map(x => Object.assign({}, x));
      this.store.dispatch(
        fromStore.userTableColumnsVisableChange({ payload: { tableColumnsChange: resetvalue } }),
      );
      allColumnList = resetvalue;
      this.dialog.closeAll();
      this.router.navigate(['user/user-list']);
    }
  }

  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.userTableColumnVisableList = event.previousContainer.data;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
