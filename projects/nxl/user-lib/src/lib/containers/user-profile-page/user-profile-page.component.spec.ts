import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import * as testData from '../../data/test/user-test-data';

import { UserProfilePageComponent } from './user-profile-page.component';
import { UserProfileMenuComponent } from '../../components/user-profile-menu/user-profile-menu.component';
import { UserSecondTopBarComponent } from '../../components';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';

describe('UserProfilePageComponent', () => {
  let component: UserProfilePageComponent;
  let fixture: ComponentFixture<UserProfilePageComponent>;
  const initialState = {
    user: {
      user: {
        users: null,
        usersTablePage: null,
        usersTableSort: null,
        usersTableFilter: null,
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        userProfile: [testData.userDetail],
      },
    },
    authorization: {
      authorization: {
        isLoaded: false,
        isLoading: false,
        errorMessage: '',
        permissions: testData.userPermission
      },
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserProfilePageComponent,
        UserProfileMenuComponent,
        UserSecondTopBarComponent,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedUserId = 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f'
    component.userDetail$ = [testData.userDetail];
    component.opened = true;
    component.title = "Profile";

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
