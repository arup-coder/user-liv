
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, MsalService, TokenService } from '@nxl/auth-lib';
import { NotificationComponent } from './notification-component/notification.component';
import * as fromResolvers from './resolvers/index';
import * as fromContainers from './containers/index';
import * as fromComponents from './components/index';
import * as fromEnums from './enums/index';
// lazy routes
const routes: Routes = [
  {
    path: fromEnums.DefaultRoutes.home,
    component: fromContainers.AppHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: fromEnums.AmplifyRoutes.home,
    component: fromContainers.AppHomeAmplifyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('@nxl/user-lib').then(mod => mod.UserLibModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tenant',
    loadChildren: () => import('@nxl/tenant-lib').then(mod => mod.TenantLibModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@nxl/auth-lib').then(mod => mod.AuthLibModule),
  },
  {
    path: 'configuration',
    loadChildren: () => import('@nxl/configuration-lib').then(mod => mod.ConfigurationLibModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: {
      home: fromResolvers.HomeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    MsalService,
    TokenService,
    NotificationComponent,
    ...fromResolvers.resolvers,
  ],
})
export class AppRoutingModule {}
