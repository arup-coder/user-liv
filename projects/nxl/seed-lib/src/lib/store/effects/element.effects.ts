import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as elementActions from '../actions/index';
import { MaterialTableService } from '../../services/material-table.service';


@Injectable()
export class ElementEffects {

  constructor(private actions$: Actions, private materialTableService: MaterialTableService) {}
  // test
  loadElements$ = createEffect(() =>
  this.actions$.pipe(
    ofType(elementActions.loadElements),
    switchMap(action =>
      this.materialTableService.getElements().pipe(
        map(elements => elementActions.loadElementsSuccess({ payload: elements })),
        catchError(error => of(elementActions.loadElementsFailure({ payload: error })))
      )
    )
  )
);

}
