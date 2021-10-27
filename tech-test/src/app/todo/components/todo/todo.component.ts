import { Task } from './../../model/task.dto';
import { TodoService } from './../../services/todo.service';
import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() searchParams: string;
  public tasks: Task[];
  public tasksClone: Task[];
  public taskForm: FormGroup;
  public showDelete: boolean = false;

  @ViewChild('modal', { static: true }) public modal: ElementRef;

  constructor(
    private todoService: TodoService,
  ) {
    this.taskForm = new FormGroup({
      id: new FormControl(),
      label: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      done: new FormControl(false, []),
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchParams) {
      this.searchParams = changes.searchParams.currentValue;
    }
  }

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(){
    this.todoService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  public addNewTask() {
    const ids = this.tasks.map((task) => task.id);
    const maxId = (ids.length === 0) ? 0 : Math.max(...ids);
    const newTask = new Task(maxId+1, this.taskForm.value.label, false);
    this.tasks.push(newTask);
    this.taskForm.reset();
  }

  public deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((value: Task) => value.id !== taskId);
  }

  public toggleMarkAsDone(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks[index].done = !this.tasks[index].done;
  }

}
