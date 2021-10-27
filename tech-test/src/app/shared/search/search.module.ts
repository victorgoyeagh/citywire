import { FilterPipe } from './pipes/filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchComponent, FilterPipe],
  exports: [SearchComponent, FilterPipe],
})
export class SearchModule { }
