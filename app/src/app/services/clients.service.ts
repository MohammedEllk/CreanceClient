import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl ="http://127.0.0.1:3600/api/clients";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl, data);
  }


  
  update(id : number, data : any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id : number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  /*
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  */

}
