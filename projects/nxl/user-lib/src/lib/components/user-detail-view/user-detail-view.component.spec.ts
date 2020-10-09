import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailViewComponent } from './user-detail-view.component';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { PhoneNumberPipe, StatusPipe } from '../../pipes/user.pipe';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
describe('UserDetailViewComponent', () => {
  let component: UserDetailViewComponent;
  let fixture: ComponentFixture<UserDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailViewComponent, PhoneNumberPipe, StatusPipe],
      imports: [
        MaterialLibModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UserDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'onCancelClick').and.callThrough();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on check active user', () => {
    component.onCancelClick();
    fixture.detectChanges();
    expect(component.onCancelClick).toHaveBeenCalled();
  });


});
