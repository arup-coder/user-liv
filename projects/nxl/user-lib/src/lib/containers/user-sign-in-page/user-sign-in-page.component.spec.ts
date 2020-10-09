import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignInPageComponent } from './user-sign-in-page.component';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('UserSignInPageComponent', () => {
  let component: UserSignInPageComponent;
  let fixture: ComponentFixture<UserSignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignInPageComponent],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
