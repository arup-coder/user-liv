import { Component, OnInit, Output, Input } from '@angular/core';
import { User } from '../../models/user.model';
@Component({
  selector: 'lib-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss'],
})
export class UserProfileMenuComponent implements OnInit {

  constructor() { }
  @Input() userDetail: User[];
  ngOnInit() { }

}
