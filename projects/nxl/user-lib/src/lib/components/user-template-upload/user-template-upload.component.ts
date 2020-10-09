import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import * as fromPermissions from '../../enums/user-permission-values-enums';
@Component({
  selector: 'lib-user-template-upload',
  templateUrl: './user-template-upload.component.html',
  styleUrls: ['./user-template-upload.component.scss'],
})
export class UserUploadTemplateComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter<File>();
  @Output() fileUploadCancel = new EventEmitter();
  @Input() fileName: string;
  @ViewChild('fileInput', { static: true }) fileUpload: ElementRef;
  moduleName: any;
  permissions: any;
  constructor() {
    this.moduleName = fromPermissions.ModuleName;
    this.permissions = fromPermissions.Permissions;
  }

  ngOnInit() { }

  onFileInput(files: FileList) {
    this.onFileUpload.emit(files.item(0));
  }
  onCancelFileUpload() {
    this.fileUpload.nativeElement.value = '';
    this.fileUploadCancel.emit();
  }
}
