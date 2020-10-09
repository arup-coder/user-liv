import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadTemplateComponent } from './user-template-upload.component';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material';
import { By, HAMMER_LOADER } from '@angular/platform-browser';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { provideMockStore } from '@ngrx/store/testing';

import * as testData from '../../data/test/user-test-data';
describe('UserUploadTemplateComponent', () => {
  let component: UserUploadTemplateComponent;
  let fixture: ComponentFixture<UserUploadTemplateComponent>;

  const initialState = {
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
      declarations: [UserUploadTemplateComponent , DisableIfUnauthorizedDirective],
      imports: [
        MaterialLibModule,
        MatProgressBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUploadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onFileInput').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on file upload', () => {
    const input = fixture.debugElement.query(By.css('input[type=file]'))
      .nativeElement;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.onFileInput).toHaveBeenCalled();
  });
});
