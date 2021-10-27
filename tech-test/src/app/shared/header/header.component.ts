import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() public onHeaderSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public onSearch(searchData: string) {
    this.onHeaderSearch.emit(searchData);
  }
}
