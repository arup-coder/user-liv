import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeAmplifyComponent } from './app-home-amplify.component';

describe('AppHomeAmplifyComponent', () => {
  let component: AppHomeAmplifyComponent;
  let fixture: ComponentFixture<AppHomeAmplifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeAmplifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeAmplifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
