import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.action';

export const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  // on(reset, state => 0),
  // on(reset, (state, { payload: {resetCount} }) => state + resetCount),
  // on(reset, (state, { payload: {resetCount} }) =>
  // {
  //   if (true) {
  //     return state + resetCount;
  //   }
  // }
  on(reset, (state, { payload: {resetCount} }) => {
    if (true) {
      return state + resetCount;
    }
  }
  ),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
