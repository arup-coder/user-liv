import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDownloadTemplateComponent } from './user-template-download.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialLibModule } from '@nxl/material-lib';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('UserDownloadTemplateComponent', () => {
  let component: UserDownloadTemplateComponent;
  let fixture: ComponentFixture<UserDownloadTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDownloadTemplateComponent],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDownloadTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onClickTemplateDownload').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on click template download', () => {
    component.onClickTemplateDownload();
    fixture.detectChanges();
    expect(component.onClickTemplateDownload).toHaveBeenCalled();
  });
});
