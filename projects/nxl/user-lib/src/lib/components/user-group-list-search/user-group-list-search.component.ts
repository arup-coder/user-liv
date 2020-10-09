import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'lib-user-group-list-search',
  templateUrl: './user-group-list-search.component.html',
  styleUrls: ['./user-group-list-search.component.scss']
})
export class UserGroupListSearchComponent implements OnInit {
 @Output() onGroupSearch = new EventEmitter<{ searchText: string }>();
  subject: Subject<any> = new Subject();
  searchText: string;
  constructor() { }

  ngOnInit() {
    this.subject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.onGroupSearch.emit({ searchText: this.searchText });
      }
      );
  }

  onGroupKeyUp($event) {
    this.searchText = $event.target.value;
    this.subject.next();
  }
}

