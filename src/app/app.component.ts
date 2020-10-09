import { Component, OnInit, HostListener, Inject, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as authStore from '@nxl/auth-lib';
import { Observable, of } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs/operators';
import * as userStore from '@nxl/user-lib';
import * as tenantStore from '@nxl/tenant-lib';
import * as fromConfiguration from '@nxl/configuration-lib';
import { AppService } from './services/app.services';
import * as fromAuthorizationStore from '@nxl/authorization-lib';
import * as fromAppFunctions from './functions/index';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticatedUser$: Observable<boolean>;
  isRegisteredUser$: Observable<boolean>;
  ScreenWidthClass = 'expand';
  plartformSettings: any;
  tenantRequest: any;
  userTenantIds: string[];
  showOverlay: boolean;
  currentURl: any;
  displayProgressSpinner = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 30;
  @ViewChild(RouterOutlet, { static: true }) outlet: RouterOutlet;

  constructor(
    @Inject('env') private env,
    private router: Router,
    private store: Store<authStore.AuthState>,
    private fromTenantstore: Store<tenantStore.TenantState>,
    private fromUserStore: Store<userStore.UserState>,
    private fromConfigurationStore: Store<fromConfiguration.ConfigurationState>,
    private appService: AppService,
    private authorizationStore: Store<fromAuthorizationStore.AuthorizationState>,
  ) {
    this.store
      .pipe(select(authStore.getSelectedIsAuthenticationInProcess))
      .pipe(
        tap(isProcess => {
          if (isProcess) {
            this.displayProgressSpinner = true;
          } else {
            this.displayProgressSpinner = false;
          }
        }),
      )
      .subscribe();
    this.fromUserStore
      .pipe(
        select(userStore.getSelectedUserProfileLoaded),
        tap(loaded => {
          if (loaded) {
            this.setLoggedInUser();
          }
        }),
      )
      .subscribe();

    this.fromConfigurationStore
      .pipe(select(fromConfiguration.getSelectedPlatformSettings))
      .pipe(
        tap(settings => {
          this.plartformSettings = settings;
        }),
      )
      .subscribe();

    this.fromTenantstore
      .pipe(select(tenantStore.getSelectedNewTenant))
      .pipe(
        tap(newTenant => {
          if (newTenant) {
            this.createNewTenantConfiguration(newTenant);
          }
        }),
      )
      .subscribe();
  }
  ngOnInit() {
    this.showOverlay = false;
    this.isRegisteredUser$ = of(false);
    this.isAuthenticatedUser$ = of(false);
    this.ScreenWidthClass = window.innerWidth > 1200 ? 'expand' : 'collapsed';
    this.store
      .pipe(
        select(authStore.validateToken),
        tap(isUserAuthenticated => {
          this.isAuthenticatedUser$ = of(isUserAuthenticated);
          if (isUserAuthenticated) {
            this.loadUserDomainTenant();
            this.loadUserTenants();
            this.loadPermissions();
            this.loadTheme();
          } else {
            this.displayProgressSpinner = false;
            const routeName = this.checkFooterRoute();
            this.router.navigate([
              fromAppFunctions.funGetAppRoute(this.env.application, routeName),
            ]);
          }
        }),
      )
      .subscribe();
  }

  setLoggedInUser() {
    this.fromUserStore
      .pipe(select(userStore.getSelectedRegisteredUser))
      .pipe(
        tap(isRegisterUser => {
          this.store.dispatch(authStore.authenticationProcessComplete());
          this.isRegisteredUser$ = of(isRegisterUser);
          if (isRegisterUser === false) {
            this.getRegistrationFields();
          } else if (isRegisterUser === true || isRegisterUser !== null) {
            this.router.navigate([fromAppFunctions.funGetAppRoute(this.env.application, 'home')]);
          } else {
            this.getRegistrationFields();
          }
        }),
      )
      .subscribe();
  }

  checkFooterRoute() {
    if (window.location.href.includes('GPDR')) {
      return 'gpdr';
    } else if (window.location.href.includes('contact')) {
      return 'contact';
    } else if (window.location.href.includes('privacy')) {
      return 'privacy';
    } else if (window.location.href.includes('terms')) {
      return 'terms';
    } else {
      return 'landing';
    }
  }
  loadUserDomainTenant() {
    this.fromUserStore.dispatch(
      userStore.getDomainTenant({
        payload: 'amplify.com',
      }),
    );
    this.fromUserStore
      .pipe(select(userStore.getSelectedUserDomainTenantId))
      .pipe(
        tap(tenantId => {
          if (tenantId !== null) {
            this.loadUserProfile(tenantId);
          }
        }),
      )
      .subscribe();
  }
  loadUserProfile(tenantId) {
    this.fromUserStore.dispatch(
      userStore.userProfile({
        payload: {
          profileUserId: userStore.funGetUserId(),
          tenantId,
        },
      }),
    );
  }

  loadPermissions() {
    this.authorizationStore.dispatch(
      fromAuthorizationStore.loadPermissions({
        payload: { userId: userStore.funGetUserId() },
      }),
    );
  }

  loadUserTenants() {
    this.fromUserStore.dispatch(
      userStore.loadUserTenantIds({
        payload: {
          userId: userStore.funGetUserId(),
        },
      }),
    );

    this.fromUserStore
      .pipe(select(userStore.getSelectedUserTenantIds))
      .pipe(
        tap(tenantIds => {
          if (tenantIds != null) {
            const tenantRequest = { tenantIds: tenantIds };
            this.fromTenantstore.dispatch(
              tenantStore.loadTenantsByIds({
                payload: { tenantIds: tenantRequest },
              }),
            );
            this.loadConfigurationSettings();
          }
        }),
      )
      .subscribe(); 

    // const tenantPagination = {
    //   page: 0,
    //   pageSize: 0,
    //   pageCount: 0,
    //   recordCount: 0,
    // };
    // this.fromTenantstore.dispatch(
    //   tenantStore.loadTenant({
    //     payload: {
    //       tenantId: 'e970ddb9-d5fe-4e0f-8248-5771e7df679c',
    //       pagination: tenantPagination,
    //       sort: '',
    //       searchText: '',
    //       filter: [],
    //     },
    //   }),
    // );
    this.loadConfigurationSettings();
  }

  loadConfigurationSettings() {
    this.fromTenantstore
      .pipe(
        select(tenantStore.getSelectedActiveTenant),
        tap(tenantIds => {
          if (tenantIds != null) {
            // load color-palettes configuration settings by tenant Id
            this.fromConfigurationStore.dispatch(
              fromConfiguration.loadPlatformSetting({ payload: { tenantId: tenantIds.tenantId } }),
            );
            // load registration page fields configuration settings by tenant Id
            this.fromConfigurationStore.dispatch(
              fromConfiguration.loadRegistrationFieldsSetting({
                payload: { tenantId: tenantIds.tenantId },
              }),
            );
          }
        }),
      )
      .subscribe();
  }

  loadTheme() {
    this.fromConfigurationStore
      .pipe(
        select(fromConfiguration.getSelectedPlatformSettings),
        tap(settings => {
          if (settings != null && settings.generalSetting && settings.generalSetting.primaryColor) {
            this.appService.loadTheme(settings);
          }
        }),
      )
      .subscribe();
  }

  // Get registration fields names from configuration store
  getRegistrationFields() {
    this.fromConfigurationStore
      .pipe(
        select(fromConfiguration.getSelectedRegistrationFieldsSettings),
        tap(fieldsNames => {
          // load fields names
          if (fieldsNames !== null) {
            this.fromUserStore.dispatch(
              userStore.loadUserFieldsNames({
                payload: fieldsNames.registrationFields,
              }),
            );
            this.router.navigate(['/user/user-registration']);
          }
        }),
      )
      .subscribe();
  }

  createNewTenantConfiguration(newTenantId) {
    if (this.plartformSettings != null) {
      const PlatformSettingRequest = {
        tenantId: newTenantId.tenantId,
        generalSetting: this.plartformSettings.generalSetting,
        logoBanner: this.plartformSettings.logoBanner,
      };
      this.fromConfigurationStore.dispatch(
        fromConfiguration.addPlatformSetting({
          payload: {
            tenantId: newTenantId.tenantId,
            body: PlatformSettingRequest,
          },
        }),
      );
    }
  }
  // Sidebar postion as window size
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ScreenWidthClass = event.target.innerWidth > 1200 ? 'expand' : 'collapsed';
  }
  onClickSideNav(event: boolean) {
    this.ScreenWidthClass = this.ScreenWidthClass === 'expand' ? 'collapsed' : 'expand';
    this.showOverlay = true;
  }
  // Outside directive
  outSideClick() {
    this.ScreenWidthClass = window.innerWidth > 1200 ? 'expand' : 'collapsed';
  }
  onClickMenuOverlay() {
    this.showOverlay = false;
    this.ScreenWidthClass = window.innerWidth > 1200 ? 'expand' : 'collapsed';
  }
  onClickLogOut() {
    this.displayProgressSpinner = true;
    this.isAuthenticatedUser$ = of(false);
    this.isRegisteredUser$ = of(false);
    this.router.navigate(['/logout'], { skipLocationChange: true });
  }
  onManageTenantClick() {
    this.router.navigate(['/tenant/tenant-management']);
  }
  onTenantSelect() {}
}
