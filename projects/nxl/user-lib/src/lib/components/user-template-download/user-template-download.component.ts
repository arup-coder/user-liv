import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'lib-user-template-download',
  templateUrl: './user-template-download.component.html',
  styleUrls: ['./user-template-download.component.scss'],
})
export class UserDownloadTemplateComponent implements OnInit {
  @Output() onTemplateDownload = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClickTemplateDownload() {
    this.onTemplateDownload.emit();
  }
}
