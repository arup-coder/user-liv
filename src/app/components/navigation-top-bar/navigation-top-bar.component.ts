import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  Inject,
  Input,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as userStore from '@nxl/user-lib';
import { tap } from 'rxjs/operators';
import { User } from 'projects/nxl/user-lib/src/lib/models/user.model';
@Component({
  selector: 'lib-navigation-top-bar',
  templateUrl: './navigation-top-bar.component.html',
  styleUrls: ['./navigation-top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Output() onClickSideNav = new EventEmitter(); // for sidenav show/hide
  @Output() onClickTenant = new EventEmitter(); // for sidenav show/hide

  childNav = false; // For sub menu of settings menu
  profileConfiguration = false; // For Top nav configuration
  profileDropbox = false; // For Profile Menu
  searchBar = false; // for top Nav search
  userDetail: User[];
  appModules: any;
  @Input() isSideNavTenantShow: boolean;

  // Top nav configuration
  clickConfiguration() {
    this.profileConfiguration = !this.profileConfiguration;
    this.profileDropbox = false;
  }

  @HostListener('document:click', ['$event'])
  onclick(event) {
    if (event.target.matches('.config-dropdown a.menu-link')) {
      this.profileConfiguration = !this.profileConfiguration;
    } else if (event.target.matches('.topNav__items .profile-component .mat-menu-item')) {
      this.profileDropbox = !this.profileDropbox;
    }
  }

  // @HostListener('document:click', ['$event'])
  // onclick(event) {
  //   //debugger;
  //   if (event.target.matches('.config-dropdown a.menu-link')) {
  //     this.profileConfiguration = !this.profileConfiguration;
  //   } else if (event.target.matches('.topNav__items .profile-component .mat-menu-item')) {
  //     this.profileDropbox = !this.profileDropbox;
  //   } //if ((!event.target.matches('.topNav__items .user-pic') )|| (!event.target.matches('.seeting')))
  //   else {
  //     if (this.profileDropbox) {
  //       this.profileDropbox = false;
  //     }
  //     if (this.profileConfiguration) {
  //       this.profileConfiguration = false;
  //     }
  //   }
  // }

  // Profile Menu
  clickProfile() {
    this.profileDropbox = !this.profileDropbox;
    this.profileConfiguration = false;
  }

  // sidenav show/hide
  clickSideNav($event) {
    this.onClickSideNav.emit();
    $event.preventDefault();
  }

  // Child Nav show/hide
  clickSearchBar() {
    this.searchBar = !this.searchBar;
  }

  // Outside directive
  outSideClick() {
    this.profileConfiguration = false;
    this.profileDropbox = false;
  }

  // Child Nav show/hide
  clickChildNav() {
    this.childNav = !this.childNav;
  }

  constructor(private store: Store<userStore.UserState>) {
    this.store
      .pipe(select(userStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail = userData)))
      .subscribe();
  }

  ngOnInit() {}
  onTenantClick() {
    this.onClickTenant.emit();
  }
}
