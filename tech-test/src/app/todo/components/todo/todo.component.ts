import { Category } from './../model/task.dto';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public tasks: Task[];
  public Category = Category;
  public newTaskForm: FormGroup;

  constructor(
    private todoService: TodoService,
  ) {
    this.newTaskForm = new FormGroup({
      id: new FormControl(),
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    })
  }

  public addNewTask() {
    //TODO: ids would be auto generated, can implement on ui, but preferably on server side
    const ids = this.tasks.map((task) => task.id);
    const maxId = (ids.length === 0) ? 0 : Math.max(...ids);
    const newTask = new Task(maxId+1, this.newTaskForm.value.label, this.newTaskForm.value.description, this.newTaskForm.value.category, false);
    this.tasks.push(newTask);
  }

  public onDeleteTask(taskIdForDeletion: number) {
    this.tasks = this.tasks.filter((value: Task) => value.id !== taskIdForDeletion);
  }

  public getCategories() {
    return Object.keys(Category).map(key => Category[key]);
  }

  public saveTask() {
    //TODO: implement save method, service and server api
    console.log('Saved...', this.tasks);
  }

}
