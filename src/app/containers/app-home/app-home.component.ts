import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as userStore from '@nxl/user-lib';
import * as configurationStore from '@nxl/configuration-lib';
import * as fromAppFunctions from '../../functions/index';
@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss'],
})
export class AppHomeComponent implements OnInit {
  userTenantIds: string[];
  tenantRequest: any;
  logoBanner: any;
  platformSettings: any;
  userDetail: any;
  constructor(
    @Inject('env') private env,
    private router: Router,
    private fromUserStore: Store<userStore.UserState>,
    private fromConfigurationStore: Store<configurationStore.ConfigurationState>
  ) {
    this.fromConfigurationStore
      .pipe(select(configurationStore.getSelectedPlatformSettings))
      .pipe(tap(settings => (this.platformSettings = settings)))
      .subscribe();
  }

  ngOnInit() {
    this.fromUserStore
      .pipe(select(userStore.getSelectedUserProfile))
      .pipe(tap(userData => (this.userDetail = userData)))
      .subscribe();
    if (this.userDetail !== null) {
      if (this.userDetail[0].isRegistered === false) {
        this.router.navigate(['/user/user-registration']);
      } else if (this.userDetail[0].isRegistered === true) {
        const routeName = this.checkIsFooterRoute();
        this.router.navigate([fromAppFunctions.funGetAppRoute(this.env.application, routeName)]);
      } else if (this.userDetail[0].firstName === undefined) {
        this.router.navigate(['/user/user-registration']);
      }
    }
    window.scroll(0, 0);
  }

  checkIsFooterRoute() {
    if (window.location.href.includes('GPDR')) {
      return 'gpdr';
    } else if (window.location.href.includes('contact')) {
      return 'contact';
    }  else if (window.location.href.includes('privacy')) {
      return 'privacy';
    } else if (window.location.href.includes('terms')) {
      return 'terms';
    }  else {
      return 'home';
    }
  }

  onUsers() {
    this.router.navigate(['/user/user-list']);
  }
}
