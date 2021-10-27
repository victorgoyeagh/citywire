import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private taskUrl = 'http://localhost:3000/tasks'

  constructor(private _http: HttpClient) { }

  public getTasks() {
    // return this._http.get<Task[]>(this.taskUrl);

    return (of([
        {
          "id": 1,
          "label": "Kitchen Cleanup - Clean my dirty kitchen",
          "done": false
        },
        {
          "id": 2,
          "label": "Taxes - Start doing my taxes and contact my accountant jhon for advice",
          "done": true
        }
      ]
    ));
  }
}
