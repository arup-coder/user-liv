import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListFilterComponent } from './user-group-list-filter.component';
import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
describe('UserGroupListFilterComponent', () => {
  let component: UserGroupListFilterComponent;
  let fixture: ComponentFixture<UserGroupListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupListFilterComponent],
      imports: [MaterialLibModule, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'onClickHideFilter').and.callThrough();
    spyOn(component, 'onClickClearFilter').and.callThrough();
    spyOn(component, 'onSelectFilter').and.callThrough();
    spyOn(component, 'onSelectDateFilter').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on click hide filter', () => {
    component.onClickHideFilter();
    expect(component.onClickHideFilter).toHaveBeenCalled();
  });

  it('should call on click clear filter', () => {
    component.onClickClearFilter();
    expect(component.onClickClearFilter).toHaveBeenCalled();
  });

  it('should call on select filter', () => {
    component.onSelectFilter('title', { value: 'true', displayValue: 'Active' });
    expect(component.onSelectFilter).toHaveBeenCalled();
  });
  it('should call on select Date filter', () => {
    component.onSelectDateFilter('Created', '02/02/2020');
    expect(component.onSelectDateFilter).toHaveBeenCalled();
  });
});
