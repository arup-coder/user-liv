import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { UserProfileMenuSettingsComponent } from '../user-profile-menu-settings/user-profile-menu-settings.component';

describe('UserProfileMenuSettingsComponent', () => {
  let component: UserProfileMenuSettingsComponent;
  let fixture: ComponentFixture<UserProfileMenuSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileMenuSettingsComponent],
      imports: [
        MaterialLibModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileMenuSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
