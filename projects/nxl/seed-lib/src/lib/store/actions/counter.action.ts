import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
// just parm
// export const reset = createAction('[Counter Component] Reset', props<{ resetCount: number }>());
// specify default
export const reset = createAction('[Counter Component] Reset', (resetCount = 0) => ({ payload: { resetCount }}));


// create success, failure
// failure has { error: }

// load, add, remove, change

