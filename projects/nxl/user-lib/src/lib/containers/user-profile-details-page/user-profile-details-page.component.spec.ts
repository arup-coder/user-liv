import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import * as testData from '../../data/test/user-test-data';
import { UserProfileDetailsPageComponent } from './user-profile-details-page.component';
import { UserProfileDetailsComponent } from '../../components/user-profile-details/user-profile-details.component';

import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { PhoneNumberPipe } from '../../pipes/user.pipe';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
describe('UserProfileDetailsPageComponent', () => {
  let component: UserProfileDetailsPageComponent;
  let fixture: ComponentFixture<UserProfileDetailsPageComponent>;
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
        userProfile: null,
        country: {
          isLoaded: true,
          isLoading: false,
          errorMessage: null,
          countryList: testData.countryList
        },
        state: {
          isLoaded: true,
          isLoading: false,
          errorMessage: null,
          stateList: testData.stateList
        }
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
      declarations: [UserProfileDetailsPageComponent,
        UserProfileDetailsComponent,
        PhoneNumberPipe,
        DisableIfUnauthorizedDirective
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        provideMockStore(),
        MatDatepickerModule,
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { }),
        },
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedUserId = 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f';
    component.userDetail$ = [testData.userDetail]
    component.countryList = testData.countryList;
    component.stateList = testData.stateList;
    component.opened = true;
    spyOn(component, 'onSelectCountry').and.callThrough();
    spyOn(component, 'onUpdateUserData').and.callThrough();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call on update userProfile', () => {
    component.onUpdateUserData(testData.updateUser);
    expect(component.onUpdateUserData).toHaveBeenCalled();
  });

  it('should call on select country', () => {
    component.onSelectCountry('IN');
    expect(component.onSelectCountry).toHaveBeenCalled();
  });
});
