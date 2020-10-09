import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupDetailsComponent } from './user-group-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialLibModule } from '@nxl/material-lib';

describe('UserGroupDetailsComponent', () => {
  let component: UserGroupDetailsComponent;
  let fixture: ComponentFixture<UserGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupDetailsComponent],
      imports: [MaterialLibModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDetailsComponent);
    component = fixture.componentInstance;

    component.groupDetail = {
      groupName: 'Group1',
      groupId: '123',
      groupDescription: 'test group1',
      totalUsers: 1,
      createdDate: '12 Dec 2012',
      isActive: true
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
