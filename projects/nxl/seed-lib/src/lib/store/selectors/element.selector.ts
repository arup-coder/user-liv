import { createSelector } from '@ngrx/store';

// import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromElements from '../reducers/element.reducer';

export const getElementsState = createSelector(
  fromFeature.getSeedState,
  (state: fromFeature.SeedState) => state.elements
);


export const getSelectedElements = createSelector(
  getElementsState,
  fromElements.getSelectedElements
);

export const getSelectedElementsLoaded = createSelector(
  getElementsState,
  x => x.isLoaded
);


// export const getToppingsLoaded = createSelector(
//   getToppingsState,
//   fromToppings.getToppingsLoaded
// );

// export const getToppingsLoading = createSelector(
//   getToppingsState,
//   fromToppings.getToppingsLoading
// );
