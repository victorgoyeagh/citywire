import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TodoService, HttpClient, NgbModal],
  declarations: [TodoComponent, TasksComponent],
  exports: [TodoComponent]
})
export class TodoModule { }
