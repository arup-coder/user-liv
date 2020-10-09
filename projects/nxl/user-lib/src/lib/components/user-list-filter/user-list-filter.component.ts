import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterValues, FilterValueDataSource } from '../../models/user-response.model';
import { FormBuilder } from '@angular/forms';
import { Country } from '../../models/user-country.model';

@Component({
  selector: 'lib-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.scss'],
})
export class UserListFilterComponent implements OnInit {
  @Input() clearOn: boolean;
  @Input() today: Date;
  @Input() showFilters: boolean;
  @Input() filters: FilterValues[];
  @Input() countries: Country[];
  @Input() filterHeaderValue: string;
  @Output() onClearFilter = new EventEmitter();
  @Output() onHideFilter = new EventEmitter();
  @Output() onFilter = new EventEmitter<{
    title: string;
    value: FilterValueDataSource;
  }>();
  filterForm = this.fb.group({
    createdDate: [{ value: null, disabled: true }],
    w9ReceiveDate: [{ value: null, disabled: true }],
  });
  constructor(private fb: FormBuilder) { }
  ngOnInit() { }

  onClickClearFilter() {
    this.filterForm.patchValue({
      createdDate: [null],
      w9ReceiveDate: [null]
    });
    this.onClearFilter.emit();
  }
  onClickHideFilter() {
    this.onHideFilter.emit();
  }
  onSelectFilter(title: string, value: FilterValueDataSource) {
    this.onFilter.emit({ title, value });
  }
  onSelectDateFilter(title: string, value: string) {
    this.onFilter.emit({ title, value: { value, displayValue: value } });
  }
}
