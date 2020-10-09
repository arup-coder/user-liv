import { Injectable } from '@angular/core';

@Injectable()
export class UserExportProductService {
  downloadFile(data, filename = 'UserList', userExportHeaderList) {
    const csvData = this.ConvertToCSV(data, userExportHeaderList);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser =
      navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
  ConvertToCSV(userList, headerList) {
    let str = '';
    let row = '';
    headerList.forEach((item, index) => {
      row += headerList[index].displayColumn + ',';
    });
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < userList.length; i++) {
      let line = '';
      headerList.forEach((item, index) => {
        const head = headerList[index];
        line += userList[i][head.columnName] + ',';
      });
      line = line.endsWith(',') ? line.slice(0, -1) : line;
      str += line + '\r\n';
    }
  }
}
