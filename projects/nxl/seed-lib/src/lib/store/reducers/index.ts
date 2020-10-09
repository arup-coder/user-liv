import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCounts from './counter.reducer';
import * as fromElements from './element.reducer';


export interface SeedState {
  count: number;
  elements: fromElements.MaterialTableState;
}

export const reducers: ActionReducerMap<SeedState> = {
  count: fromCounts.counterReducer,
  elements: fromElements.reducer
};

export const getSeedState = createFeatureSelector<SeedState>(
  'seed'
);
