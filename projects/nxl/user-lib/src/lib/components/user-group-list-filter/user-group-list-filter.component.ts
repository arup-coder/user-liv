import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterValues, FilterValueDataSource } from '../../models/group-response.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-user-group-list-filter',
  templateUrl: './user-group-list-filter.component.html',
  styleUrls: ['./user-group-list-filter.component.scss'],
})
export class UserGroupListFilterComponent implements OnInit {
  @Input() clearOn: boolean;
  @Input() today: Date;
  @Input() showFilters: boolean;
  @Input() filters: FilterValues[];
  @Input() filterHeaderValue: string;
  @Output() onClearFilter = new EventEmitter();
  @Output() onHideFilter = new EventEmitter();
  @Output() onFilter = new EventEmitter<{
    title: string;
    value: FilterValueDataSource;
  }>();
  filterForm = this.fb.group({
    createdDate: [{ value: null, disabled: true }],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onClickClearFilter() {
    this.filterForm.patchValue({
      createdDate: [null],
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
