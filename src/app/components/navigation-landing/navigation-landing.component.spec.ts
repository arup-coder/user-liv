import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLandingComponent } from './navigation-landing.component';

describe('TopBarLandingComponent', () => {
  let component: TopBarLandingComponent;
  let fixture: ComponentFixture<TopBarLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
