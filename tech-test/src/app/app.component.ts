import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public keyword: string;
  public onHeaderSearch(searchParams: string) {
    this.keyword = searchParams;
  }
}
