import { Action, createReducer, on, State } from '@ngrx/store';
import { PeriodicElement } from '../../models/PeriodicElement.model';
import { loadElements, loadElementsFailure, loadElementsSuccess } from '../actions/element.actions';

export const elementFeatureKey = 'element';

export interface MaterialTableState {
   elements: PeriodicElement[];
   isLoaded: boolean;
   isloading: boolean;
   errorMessage: string;
}

export const initialState: MaterialTableState = {
  elements: null,
  isLoaded: false,
  isloading: false,
  errorMessage: null
};

const elementReducer = createReducer(
  initialState,
  on(loadElements, state => ({ ...state, isLoading: true, isLoaded: false })),
  on(loadElementsSuccess, (state, {payload} ) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    elements: payload.map( element => element) })),
  on(loadElementsFailure, state => ({ ...state, isLoading: false, errorMessage: 'error' }))
);

export function reducer(state: MaterialTableState | undefined, action: Action) {
  return elementReducer(state, action);
}

export const getSelectedElements = (state: MaterialTableState) =>
  state.elements;
