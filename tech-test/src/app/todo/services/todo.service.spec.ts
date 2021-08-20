import { Category, Task } from './../components/model/task.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let httpTestingController: HttpTestingController;
  let service: TodoService;
  let tasks: Task[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientTestingModule]
    });

    tasks = [
      new Task(2, 'task two', 'this is my second description', Category.house, new Date(1, 1, 2021)),
      new Task(1, 'task one', 'this is my first description', Category.bureaucracy, false),
    ];

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Tasks correctly', () => {
    const mockData = tasks;

    service.getTasks().subscribe((result) => {
      expect(result.length).toEqual(2);
      expect(result).toEqual(mockData);
      expect(result[0].id).toEqual(mockData[0].id);
      expect(result[1].id).toEqual(mockData[1].id);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(mockData);
  });
});
