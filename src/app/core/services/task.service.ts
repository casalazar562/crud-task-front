import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getTasks(filtro?: string): Observable<TaskModel[]> {
    let url = `${this.URL}api/Tasks`;
    if (filtro) {
      url += `?filtro=${filtro}`;
    }
    return this.http.get<TaskModel[]>(url);
  }

  public addTask(body: TaskModel): Observable<any> {

    return this.http.post(`${this.URL}api/Tasks`, body)

  }

  public deleteTask(id: number): Observable<any> {


    return this.http.delete(`${this.URL}api/Tasks/${id}`)

  }

  public updateStatus(id: number, status: number): Observable<any> {


    return this.http.put(`${this.URL}api/Tasks/${id}/estado`, status);

  }
}
