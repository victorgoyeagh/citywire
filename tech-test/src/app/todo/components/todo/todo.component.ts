import { Action, Category, Task } from './../model/task.dto';
import { TodoService } from './../../services/todo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public tasks: Task[];
  public tasksClone: Task[];
  public Category = Category;
  public newTaskForm: FormGroup;
  public currentAction = Action.Default;
  public Action = Action;

  @ViewChild('mymodal', { static: true }) public mymodal: ElementRef;

  constructor(
    private modalService: NgbModal,
    private todoService: TodoService,
  ) {
    this.newTaskForm = new FormGroup({
      id: new FormControl(),
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      done: new FormControl(),
    });
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.tasksClone = this.tasks;
    })
  }

  public initAddNewTask() {
    this.currentAction = Action.Add;
    this.newTaskForm.reset();
    this.openModal();
  }

  public addNewTask() {
    //TODO: ids would be auto generated, can implement on ui, but preferably on server side
    const ids = this.tasks.map((task) => task.id);
    const maxId = (ids.length === 0) ? 0 : Math.max(...ids);
    const newTask = new Task(maxId+1, this.newTaskForm.value.label, this.newTaskForm.value.description, this.newTaskForm.value.category, false);
    this.tasks.push(newTask);
    this.modalService.dismissAll();
    this.currentAction = Action.Default;
  }

  public onEditTask(taskIdForEdit: number) {
    this.currentAction = Action.Edit
    const taskToEdit: Task = this.tasks.find((task) => task.id === taskIdForEdit);
    this.newTaskForm.controls.id.setValue(taskToEdit.id);
    this.newTaskForm.controls.label.setValue(taskToEdit.label);
    this.newTaskForm.controls.description.setValue(taskToEdit.description);
    this.newTaskForm.controls.category.setValue(taskToEdit.category);
    this.newTaskForm.controls.done.setValue(taskToEdit.done);
    this.openModal();
  }

  public onEndEditTask() {
    const values: Task = this.newTaskForm.value;
    const taskToEdit: Task = this.tasks.find((task) => task.id === values.id);

    taskToEdit.label = this.newTaskForm.controls.label.value;
    taskToEdit.description = this.newTaskForm.controls.description.value;
    taskToEdit.category = this.newTaskForm.controls.category.value;
    taskToEdit.done = this.newTaskForm.controls.done.value;

    this.modalService.dismissAll();
    this.currentAction = Action.Default;
  }

  public onDeleteTask(taskIdForDeletion: number) {
    this.tasks = this.tasks.filter((value: Task) => value.id !== taskIdForDeletion);
  }

  public filterTasksByCategory(el: any) {
    const category = el.target.value;
    this.tasks = this.tasksClone;
    if (category !== '') {
      this.tasks = this.tasks.filter((task) => {
        return task.category === category
      });
    }
  }

  public openModal() {
    this.modalService.open(this.mymodal);
  }

  public getCategories() {
    return Object.keys(Category).map(key => Category[key]);
  }

  public saveTask() {
    //TODO: implement save method, service and server api
    console.log('Saved...', this.tasks);
  }
}
