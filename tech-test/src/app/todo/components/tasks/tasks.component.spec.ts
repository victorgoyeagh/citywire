import { Task, Category } from './../model/task.dto';
import { TodoService } from './../../services/todo.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let task: Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      providers: [TodoService]
    })
    .compileComponents();

    task = new Task(1, 'task one', 'this is my first description', Category.bureaucracy, false);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    component.taskData = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle Mark Task As Done correctly', () => {
    expect(typeof component.taskData.done).toEqual('boolean');
    component.toggleMarkTaskAsDone();
    expect(typeof component.taskData.done).toEqual('object');
    component.toggleMarkTaskAsDone();
    expect(typeof component.taskData.done).toEqual('boolean');
  });

  it('should indicate isMarkasDone correctly', () => {
    const result1 = component.isMarkedAsDone;
    expect(result1).toEqual(false);
    component.taskData.done = new Date(1, 1, 2021);
    const result2 = component.isMarkedAsDone;
    expect(result2).toEqual(true);
  });

  it('should delete task emit correctly', () => {
    const emitSpy = spyOn(component.onDeleteTask, 'emit');
    component.deleteTask();
    fixture.detectChanges();
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(component.taskData.id);
  });

});
