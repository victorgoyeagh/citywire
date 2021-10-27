import { SearchModule } from './../shared/search/search.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    SearchModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TodoService, HttpClient],
  declarations: [TodoComponent],
  exports: [TodoComponent]
})
export class TodoModule { }
