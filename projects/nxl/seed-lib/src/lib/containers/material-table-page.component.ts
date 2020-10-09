import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MaterialTableService } from '../services/material-table.service';
import { PeriodicElement } from '../models/PeriodicElement.model';
// import { loadElements } from '../store/actions';
// import * as fromStore from '../store/reducers/element.reducer';
// import * as Selectors from '../store/selectors/index';
import * as fromStore from '../store';


@Component({
  selector: 'lib-material-table-page',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './material-table-page.component.html',
  styleUrls: ['./material-table-page.component.css']
})
export class MaterialTablePageComponent implements OnInit {
  // elements: PeriodicElement[];
  elements$: Observable<PeriodicElement[]>;
  count: number;

  constructor(private materialTableService: MaterialTableService, private store: Store<fromStore.SeedState>) {
    this.elements$ = store.pipe(select(fromStore.getSelectedElements));
  }

  ngOnInit() {
    this.count = 15;
    // this.materialTableService.getElements().subscribe(result => {
    //   this.elements = result;
    // });
    this.store.dispatch(fromStore.loadElements());
  }

  onCreate(event: PeriodicElement) {
   this.store.dispatch(fromStore.createElements({payload: event}));
  }

}
