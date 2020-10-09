import { TestBed } from '@angular/core/testing';

import { MaterialTableService } from './material-table.service';

describe('MaterialTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialTableService = TestBed.get(MaterialTableService);
    expect(service).toBeTruthy();
  });
});
