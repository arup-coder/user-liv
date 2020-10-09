import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import * as testData from '../../data/test/user-test-data';

import { UserAddEditPageComponent } from './user-add-edit-page.component';
import { UserAddEditComponent } from '../../components/user-add-edit/user-add-edit.component';
import { UserSecondTopBarComponent } from '../../components';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { PhoneNumberPipe } from '../../pipes/user.pipe';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';

describe('UserAddEditPageComponent', () => {
  let component: UserAddEditPageComponent;
  let fixture: ComponentFixture<UserAddEditPageComponent>;
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
        country: {
          isLoaded: true,
          isLoading: false,
          countryList: testData.countryList,
          errorMessage : ''
        },
        state: {
          isLoaded: true,
          isLoading: false,
          stateList: testData.stateList,
          errorMessage: ''
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
      declarations: [
        UserAddEditPageComponent,
        UserAddEditComponent,
        UserSecondTopBarComponent,
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEditPageComponent);
    component = fixture.componentInstance;
    component.title = 'Add User';
    component.selectedUserId = '';
    fixture.detectChanges();
    spyOn(component, 'onLoadEditScreen').and.callThrough();
    spyOn(component, 'onCreateUser').and.callThrough();
    spyOn(component, 'onUpdateUser').and.callThrough();
    spyOn(component, 'onCancel').and.callThrough();
    spyOn(component, 'onSelectCountry').and.callThrough();
    spyOn(component.router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load update user screen', () => {
    component.selectedUserId = testData.userDetail.userId;
    component.onLoadEditScreen();
    component.userDetail$ = of(testData.userDetail);
    component.countryList = testData.countryList;
    component.stateList =testData.stateList;
    component.title = 'Edit User';
    expect(component.onLoadEditScreen).toHaveBeenCalled();
  });

  it('should call on Create User', () => {
    component.onCreateUser(testData.createADUser);
    expect(component.onCreateUser).toHaveBeenCalled();
  });

  it('should call on update User', () => {
    component.onUpdateUser(testData.updateUser);
    expect(component.onUpdateUser).toHaveBeenCalled();
  });
  it('should call on select country', () => {
    component.onSelectCountry('IN');
    expect(component.onSelectCountry).toHaveBeenCalled();
  });
  it('should call on cancel', () => {
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['/user/user-list']);
  });
});
