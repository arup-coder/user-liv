import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTablePageComponent } from './material-table-page.component';

describe('MaterialTablePageComponent', () => {
  let component: MaterialTablePageComponent;
  let fixture: ComponentFixture<MaterialTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
