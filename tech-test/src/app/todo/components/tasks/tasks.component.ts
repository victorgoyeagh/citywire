import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Category, Task } from '../model/task.dto';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  public Category = Category;

  @Input() public taskData: Task;
  @Output() public onDeleteTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onEditTask: EventEmitter<number> = new EventEmitter<number>();

  public toggleMarkTaskAsDone() {
    const isMarkedAsDone = this.isMarkedAsDone;
    this.taskData.done = (isMarkedAsDone) ? false : new Date();
  }

  public get isMarkedAsDone() {
    return typeof this.taskData.done !== 'boolean';
  }

  public deleteTask() {
    this.onDeleteTask.emit(this.taskData.id);
  }

  public initEditTask(id: number) {
    this.onEditTask.emit(id);
  }
}
