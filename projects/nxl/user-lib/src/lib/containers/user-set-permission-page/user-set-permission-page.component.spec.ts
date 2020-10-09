import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialLibModule } from '@nxl/material-lib';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { UserSetPermissionPageComponent } from './user-set-permission-page.component';
import { UserDialogSetPermissionsComponent } from '../../components/user-dialog-set-permissions/user-dialog-set-permissions.component';
import * as testData from '../../data/test/user-test-data';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../store/reducers';

describe('UserSetPermissionPageComponent', () => {
  let component: UserSetPermissionPageComponent;
  let fixture: ComponentFixture<UserSetPermissionPageComponent>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSetPermissionPageComponent, UserDialogSetPermissionsComponent],
      imports: [
        RouterTestingModule,
        MaterialLibModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatNativeDateModule,
        StoreModule.forRoot({ user: fromRoot.reducers.user }),
      ],
      providers: [
        provideMockStore(),
        MatDialogModule,
        MatNativeDateModule,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore({ initialState }),
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [UserDialogSetPermissionsComponent] },
      })
      .compileComponents();
    router = TestBed.get(Router);
  }));
  const initialState = {
    user: {
      user: {
        isLoaded: false,
        isLoading: false,
        errorMessage: null,
        permissionSetting: testData.userPermission,
      },
    },
  };
  beforeEach(() => {
    fixture = TestBed.createComponent(UserSetPermissionPageComponent);
    component = fixture.componentInstance;
    component.setPermissions$ = testData.userPermission;
    component.userId = 'dc5fd822-cf4f-48ab-ab77-3aab1b42661f';
    component.selectedUserData = testData.userDetail;
    fixture.detectChanges();
    spyOn(component, 'onClickCancel').and.callThrough();
    spyOn(component, 'onClickSave').and.callThrough();
    spyOn(component, 'openDialog').and.callThrough();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onClickSave', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const event = testData.userPermission;
    component.onClickSave(event);
    fixture.detectChanges();
    expect(component.onClickSave).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['user/user-list']);
  });
  it('should call onClickCancel', () => {
    component.onClickCancel();
    fixture.detectChanges();
    expect(component.onClickCancel).toHaveBeenCalled();
  });
  it('should call openDialog', () => {
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });
  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
