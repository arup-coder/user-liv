import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';

import { PeriodicElement } from '../models/PeriodicElement.model';


@Injectable({
  providedIn: 'root'
})
export class MaterialTableService {

  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http
      .get<any>('assets/json/PeriodElement.json')
      .pipe(catchError(error => of(error)));
  }

}
