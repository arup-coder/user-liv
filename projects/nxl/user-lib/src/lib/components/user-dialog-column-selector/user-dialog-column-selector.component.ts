import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TableColumns } from '../../models/user-table-column-model';
@Component({
  selector: 'lib-user-dialog-column-selector',
  templateUrl: './user-dialog-column-selector.component.html',
  styleUrls: ['./user-dialog-column-selector.component.scss'],
})
export class UserColumnSelectorDialogComponent implements OnInit {
  userColumnList: TableColumns[];
  UserSelectColumnList: TableColumns[];
  userDragandDropColumnList: TableColumns[];
  router: any;
  store: any;
  dialog: any;
  groupId: string;

  // userColumnList = [
  //   'User Name',
  //   'EmployeeId',
  //   'Login Name',
  //   'Mobile Phone',
  //   'Country',
  //   'Created',
  //   'Status',
  // ];

  // newUserColumnList = [
  //   'User Name',
  //   'EmployeeId',
  //   'Login Name',
  //   'Mobile Phone',
  //   'Country',
  //   'Created',
  //   'Status',
  // ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    // this.data.userColumnList.map(x => { Object.assign({}, this.userColumnList, x) });

    this.userColumnList = this.data.userColumnList.map(x => Object.assign({}, x));
    //   this.userColumnList = this.data.userColumnList
    this.userDragandDropColumnList = this.userColumnList.filter(x => x);
    this.UserSelectColumnList = this.userColumnList;
    //this.userColumnList = this.data.userColumnList;
  }
  // drop(event) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
  onColumnVisableChange($event: any, selectedColumn: TableColumns, allColumnList) {}
  onClickApply() {}
  onClickCancel() {}
  onClickDeleteItem($event: any, selectedColumn: TableColumns, allColumnList) {}
  onClickReset(allColumnList) {}
  drop(event) {}
}

