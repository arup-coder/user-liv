
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { MaterialLibModule } from '@nxl/material-lib';

import * as fromComponents from './components/index';
import * as fromContainers from './containers/index';
import * as fromServices from './services/index';
import * as fromPipes from './pipes/index';
import * as fromResolvers from './resolvers/index';

import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/reducers/counter.reducer';
// import { reducers, effects } from './store';
import * as store from './store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// import { ElementsRoutingModule } from './elements-routing.module';
// import { environment } from 'projects/test-app/src/environments/environment';


const routes: Routes = [
  {
    path: 'table',
    pathMatch: 'full',
    component: fromContainers.MaterialTablePageComponent,
    resolve: { element: fromResolvers.ElementsResolver}
  },
  {
    path: 'test',
    pathMatch: 'full',
    component: fromContainers.TestRouteComponent
  }
];


@NgModule({
  imports: [
    MaterialLibModule,
    ReactiveFormsModule,
    FormsModule,
  RouterModule.forChild(routes),
  StoreModule.forFeature('seed', store.reducers),
  EffectsModule.forFeature(store.effects)
  ],
  providers: [...fromServices.services,  ...fromResolvers.resolvers],
  declarations: [...fromComponents.components, ...fromContainers.containers, ...fromPipes.pipes],
  bootstrap: [],
  exports: [RouterModule, ...fromComponents.components, ...fromContainers.containers]
})
export class SeedLibModule { }
