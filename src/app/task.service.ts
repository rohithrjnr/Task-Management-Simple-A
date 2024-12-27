
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://127.0.0.1:5000/tasks'; 
  private taskAddedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addTask(task: { title: string }): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  updateTask(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { status });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


    notifyTaskAdded(): void {
      this.taskAddedSubject.next();
    }
  

    onTaskAdded(): Observable<void> {
      return this.taskAddedSubject.asObservable();
    }
}
