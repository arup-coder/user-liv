import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-user-dialog-export-product',
  templateUrl: './user-dialog-export-product.component.html',
  styleUrls: ['./user-dialog-export-product.component.scss'],
})
export class UserDialogExportProductComponent implements OnInit {
  router: any;
  store: any;
  dialog: any;
  exportUserProductService: any;
  constructor() {}
  selectedExportType: string;
  selectedExportFileType: string;
  exportUsersOption = {
    list: [
      { name: 'Current Page', value: 'currentpage', checked: true },
      { name: 'All User', value: 'alluser', checked: false },
      { name: 'Selected User', value: 'selecteduser', checked: false },
      { name: 'Current Search', value: 'currentsearch', checked: false },
    ],
  };

  exportFileTypeOption = {
    list: [
      {
        name: 'CSV for Excel,Numbers, or other spreadsheet programs',
        value: 'excel',
        checked: true,
      },
      { name: 'Plain CSV file', value: 'csv', checked: false },
    ],
  };

  groupId: string;

  ngOnInit() {
    this.selectedExportType = 'currentpage';
    this.selectedExportFileType = 'csv';
  }
  onClickCancel() {}
  onClickExport(selectedExportType: string) {}
  exportCurrentPageUsers() {}
  exportAllUsers() {}
  exportSelectedUsers() {}
  exportFilteredUsers() {}
  getCoulmnList() {}
}
