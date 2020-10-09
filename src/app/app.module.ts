import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigurationLibModule } from '@nxl/configuration-lib';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TenantLibModule } from '@nxl/tenant-lib';
import { UserLibModule } from '@nxl/user-lib';
import { MaterialLibModule } from '@nxl/material-lib';
import * as userStore from '@nxl/user-lib';
import * as authStore from '@nxl/auth-lib';
import { AuthorizationLibModule } from '@nxl/authorization-lib';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as fromComponents from './components/index';
import * as fromContainers from './containers/index';
import { environment } from '../environments/environment';
import { NotificationInterceptor } from 'src/app/notification-interceptor/notification.interceptor';
import { OutsideDirective } from './menu.directive';
import * as fromServices from './services/index';
import { AddHeaderInterceptor } from './subscription-interceptor/subscription-interceptor';
import { HashLocationStrategy , LocationStrategy } from '@angular/common';

const rootReducer = {
  router: routerReducer,
  auth: authStore.reducers.auth,
  user: userStore.reducers.user,
};

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.components,
    ...fromContainers.containers,
    OutsideDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialLibModule,
    TenantLibModule,
    AuthorizationLibModule,
    ConfigurationLibModule,
    UserLibModule,
    FlexLayoutModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(userStore.effects),
    EffectsModule.forRoot(authStore.effects),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ...fromServices.services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authStore.TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authStore.Error401Interceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    { provide: 'env', useValue: environment },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
