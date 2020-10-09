import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap, filter, first } from 'rxjs/operators';
import * as fromStore from '../store';



@Injectable()
export class ElementsResolver implements Resolve<boolean> {
  constructor(private store: Store<fromStore.SeedState>) { }

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getSelectedElementsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromStore.loadElements());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
