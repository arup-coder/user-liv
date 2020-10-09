import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { UserDetailViewPageComponent } from './user-detail-view-page.component';
import { UserDetailViewComponent } from '../../components/user-detail-view/user-detail-view.component';
import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { StatusPipe, PhoneNumberPipe } from '../../pipes/user.pipe';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import * as testData from '../../data/test/user-test-data';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('UserDetailViewPageComponent', () => {
  let component: UserDetailViewPageComponent;
  let fixture: ComponentFixture<UserDetailViewPageComponent>;

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
      },
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserDetailViewPageComponent,
        UserDetailViewComponent,
        PhoneNumberPipe,
        StatusPipe,
      ],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        provideMockStore(),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailViewPageComponent);
    component = fixture.componentInstance;
    component.userId = '11';
    component.userDetail$ = of(testData.userDetail);
    fixture.detectChanges();

    spyOn(component, 'onCancelClick').and.callThrough();
    spyOn(component.router, 'navigate');
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on cancel click', () => {
    component.onCancelClick();
    fixture.detectChanges();
    expect(component.router.navigate).toHaveBeenCalledWith(['/user/user-list']);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
