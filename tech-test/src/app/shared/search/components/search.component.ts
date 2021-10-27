import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() public onSearch: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchInput', { static: false }) public searchInput: HTMLInputElement;

  constructor() { }

  ngOnInit() {
    fromEvent(document.getElementById('searchInput'), 'keydown')
    .pipe(
      debounceTime(1000),
    )
    .subscribe((result) => {
      const value = (result.target as HTMLInputElement).value;
      this.onSearch.emit(value);
    })
  }

}
