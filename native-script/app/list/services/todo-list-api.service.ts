import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { ToDoList } from '../models/todo-list';

@Injectable()
export class ToDoListApiService {
  private readonly url = 'http://10.0.2.2:1111/api/lists';
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", "application/json");
  }

  public getToDoLists(): Observable<ToDoList[]> {
    return this.http.get(this.url, { headers: this.headers }).pipe(
      map(data => data as any[]),
      map(data => data.map(list => new ToDoList(this, list.id, list.entries || [], list.title)))
    );
  }

  public getToDoListById(listId: string): Observable<ToDoList> {
    const listUrl = `${this.url}/${listId}`;

    return this.http.get(listUrl, { headers: this.headers }).pipe(
      map(data => data as any),
      map(data => new ToDoList(this, data.id, data.entries || [], data.title))
    );
  }

  public updateToDoListEntries(listId: string, entries: any[]): Observable<any> {
    const listUrl = `${this.url}/${listId}`;

    return this.http.put(listUrl, { entries: entries }, { headers: this.headers });
  }
}
