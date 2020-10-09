import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User} from '../../models/user.model';

@Component({
  selector: 'lib-user-detail-view',
  templateUrl: './user-detail-view.component.html',
  styleUrls: ['./user-detail-view.component.scss']
})
export class UserDetailViewComponent implements OnInit {
  @Input() userDetail: User;
  @Output() onCancel = new EventEmitter();

  constructor() {}

  ngOnInit() { }

  onCancelClick() {
    this.onCancel.emit();
  }
}
