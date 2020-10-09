import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges,
  Output,
  EventEmitter } from '@angular/core';
import { MaterialTableService } from '../services/material-table.service';
import { PeriodicElement } from '../models/PeriodicElement.model';


@Component({
  selector: 'lib-material-table',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // elementss: any;
 // count;

  @Input() count: number;
  @Input() elements: PeriodicElement[];

  // @Input()
  // set elements(elements: PeriodicElement[]) {
  //   // this.elementss = elements;
  // }

  constructor() { }

  ngOnInit() {
    // this.count = 2;
  }



}
