import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBulkFieldsMapComponent } from './user-bulk-fields-map.component';

import { MaterialLibModule } from '@nxl/material-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule, CdkStepper } from '@angular/cdk/stepper';

describe('UserBulkFieldsMapComponent', () => {
  let component: UserBulkFieldsMapComponent;
  let fixture: ComponentFixture<UserBulkFieldsMapComponent>;
  const mobilePhone = 'mobilePhone';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserBulkFieldsMapComponent],
      imports: [
        MaterialLibModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatStepperModule,
        CdkStepperModule,
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {}),
        },
        { provide: CdkStepper, useExisting: '' },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBulkFieldsMapComponent);
    component = fixture.componentInstance;
    component.mappingValues = {
      csvFields: ['*First Name', '*Last Name', 'Country', 'Mobile Phone*', 'Work Phone'],
      irsFields: [],
      fieldIndex: null,
    };
    component.parsedIrsValues = ['firstName','lastName']
    fixture.detectChanges();
    spyOn(component, 'onSelection').and.callThrough();
    spyOn(component, 'onSelectValue').and.callThrough();
    spyOn(component, 'onSelectWorkPhone').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call on click selection', () => {
    component.onSelection('firstName', 'FirstName', 1);
    expect(component.onSelection).toHaveBeenCalled();
  });

  it('should call on click select value', () => {
    const event = {
      value: 'work phone',
    };
    component.onSelectValue(event);
    expect(component.onSelectValue).toHaveBeenCalled();
  });

  it('should call on click select work phone', () => {
    const event = {
      value: 'work phone'
    }
    component.onSelectWorkPhone(event);
    expect(component.onSelectWorkPhone).toHaveBeenCalled();
  });
});
