import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSearchComponent } from './user-list-search.component';

import * as testData from '../../data/test/user-test-data';

describe('UserListSearchComponent', () => {
  let component: UserListSearchComponent;
  let fixture: ComponentFixture<UserListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListSearchComponent);
    component = fixture.componentInstance;
    spyOn(component, 'onUserKeyUp').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onUserKeyUp', () => {
    const event = { target: { value: testData.searchText } }
    component.onUserKeyUp(event);
    expect(component.onUserKeyUp).toHaveBeenCalled();
  });
});
