import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ElementEffects } from './element.effects';

describe('ElementEffects', () => {
  let actions$: Observable<any>;
  let effects: ElementEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElementEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ElementEffects>(ElementEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
