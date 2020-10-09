import { createAction, props } from '@ngrx/store';
import { PeriodicElement } from '../../models/PeriodicElement.model';

// load
export const loadElements = createAction(
  '[Element] Load Elements'
);
export const loadElementsSuccess = createAction(
  '[Element] Load Elements Success', props<{payload: PeriodicElement[]}>()
);
export const loadElementsFailure = createAction(
  '[Element] Load Elements Failure', props<{payload: string}>()
);

// create
export const createElements = createAction(
  '[Element] Create Elements', props<{payload: PeriodicElement}>()
);
export const createElementsSuccess = createAction(
  '[Element] Create Elements Success', props<{payload: PeriodicElement[]}>()
);
export const createElementsFailure = createAction(
  '[Element] Create Elements Failure', props<{payload: string}>()
);





