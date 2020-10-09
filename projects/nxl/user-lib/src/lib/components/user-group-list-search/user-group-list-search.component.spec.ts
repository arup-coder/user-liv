import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListSearchComponent } from './user-group-list-search.component';
import * as testData from '../../data/test/user-test-data';

describe('UserGroupListSearchComponent', () => {
  let component: UserGroupListSearchComponent;
  let fixture: ComponentFixture<UserGroupListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupListSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupListSearchComponent);
    component = fixture.componentInstance;
    component.searchText = 'gr';
    fixture.detectChanges();
    spyOn(component, 'onGroupKeyUp').and.callThrough();
    spyOn(component.onGroupSearch, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onGroupKeyUp', () => {
    const event = { target: { value: testData.searchText } };
    component.onGroupKeyUp(event);
    expect(component.onGroupKeyUp).toHaveBeenCalled();
  });
});
