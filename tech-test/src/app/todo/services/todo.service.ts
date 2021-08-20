import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../components/model/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private taskUrl = 'http://localhost:3000/tasks'

  constructor(private _http: HttpClient) { }

  public getTasks() {
    return this._http.get<Task[]>(this.taskUrl);
  }
}
