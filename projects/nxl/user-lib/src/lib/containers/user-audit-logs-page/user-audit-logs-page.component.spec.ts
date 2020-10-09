import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuditLogsPageComponent } from './user-audit-logs-page.component';
import { HAMMER_LOADER } from '@angular/platform-browser';


describe('UserAuditLogsPageComponent', () => {
  let component: UserAuditLogsPageComponent;
  let fixture: ComponentFixture<UserAuditLogsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserAuditLogsPageComponent,
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
    fixture = TestBed.createComponent(UserAuditLogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
