import { TodoService } from './../../services/todo.service';
import { TasksComponent } from './../tasks/tasks.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { Category, Task } from '../model/task.dto';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let service: TodoService;
  let fixture: ComponentFixture<TodoComponent>;
  let tasks: Task[];
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent, TasksComponent],
      providers: [TodoService],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();

    form = new FormGroup({
      id: new FormControl(),
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });

    tasks = [
      new Task(2, 'task two', 'this is my second description', Category.house, new Date(1, 1, 2021)),
      new Task(1, 'task one', 'this is my first description', Category.bureaucracy, false),
    ];

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TodoService);
    component.tasks = tasks;
    component.newTaskForm = form;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
    expect(component.newTaskForm).toBeDefined();
  });

  it('can onInit correctly', () => {
    const tasksSpy = spyOn(service, 'getTasks').and.returnValue(of(tasks));
    component.ngOnInit();
    fixture.detectChanges();
    expect(tasksSpy).toHaveBeenCalled();
    tasksSpy().subscribe(arg => {
      expect(arg).toEqual(tasks);
      expect(component.tasks).toBeDefined();
    })
  });

  it('can add New Task correctly', () => {
    component.newTaskForm.controls.id.setValue(3);
    component.newTaskForm.controls.label.setValue('task three');
    component.newTaskForm.controls.description.setValue('this is my third description');
    component.addNewTask();
    fixture.detectChanges();
    expect(component.tasks.length).toEqual(3);
    expect(component.tasks[2].id).toEqual(3);
  });

  it('can run onDeleteTask correctly', () => {
     spyOn(service, 'getTasks').and.returnValue(of(tasks));
    const filterSpy = spyOn(component.tasks, 'filter');
    component.onDeleteTask(1);
    expect(filterSpy).toHaveBeenCalled();
  });

  it('can run getCategories correctly', () => {
    const result = component.getCategories();
    expect(result).toEqual(['House', 'Bureaucracy']);
  });
});
