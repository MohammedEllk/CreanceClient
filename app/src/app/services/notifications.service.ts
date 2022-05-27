import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl ="http://127.0.0.1:3600/api/notifications";
@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
