import {
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { PeriodicElement } from '../models/PeriodicElement.model';

import * as seedValidators from '../validators/index';


@Component({
  selector: 'lib-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {

  @Output() create = new EventEmitter<PeriodicElement>();

  form = this.fb.group({
    name: ['', Validators.required],
    weight: ['', [Validators.required, seedValidators.ElementValidators.elementWeightThreshold]],
    symbol: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get weightControl() {
    return this.form.get('weight') as FormControl;
  }

  get symbolControl() {
    return this.form.get('symbol') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  get weightControlInvalid() {
    return this.weightControl.hasError('required') && this.weightControl.touched;
  }

  get weightControlThresholdInvalid() {
    return this.weightControl.hasError('thresholdExceeded') && this.weightControl.touched;
  }

  get symbolControlInvalid() {
    return this.symbolControl.hasError('required') && this.symbolControl.touched;
  }

  createElement(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }



}
