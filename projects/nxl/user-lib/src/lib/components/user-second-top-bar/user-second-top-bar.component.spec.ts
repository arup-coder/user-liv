import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecondTopBarComponent } from './user-second-top-bar.component';
import { DisableIfUnauthorizedDirective } from '@nxl/authorization-lib';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserSecondTopBarComponent', () => {
  let component: UserSecondTopBarComponent;
  let fixture: ComponentFixture<UserSecondTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSecondTopBarComponent, DisableIfUnauthorizedDirective],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSecondTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
