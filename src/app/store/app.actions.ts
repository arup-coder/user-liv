import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action  } from '@ngrx/store';
import { filter } from 'rxjs/operators';
@Injectable()
export class AppActions {
    _actions = new Subject<Action>();

    ofType(type: string) {
        return this._actions.pipe(filter((action: Action) => action.type === type));
    }

    nextAction(action: Action) {
        this._actions.next(action);
    }

}
