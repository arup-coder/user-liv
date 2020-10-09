import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-user-list-search',
  templateUrl: './user-list-search.component.html',
  styleUrls: ['./user-list-search.component.scss']
})
export class UserListSearchComponent implements OnInit {

  @Output() onUserSearch = new EventEmitter<{ searchText: string }>();
  subject: Subject<any> = new Subject();
  searchText: string;
  @Input() latestSearchText: string;
  constructor() {

  }

  ngOnInit() {
    this.subject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.onUserSearch.emit({ searchText: this.searchText });
      }
      );
  }

  onUserKeyUp($event) {
    this.searchText = $event.target.value;
    this.subject.next();
  }
}
