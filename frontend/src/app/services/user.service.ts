import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030/api/v1/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getByUsername(username: string): Observable<any> {
    return this.http.get(`${URL}/get/${username}`);
  }
  getOneById(id: string): Observable<any> {
    return this.http.get(`${URL}/getById/${id}`);
  }
  getSmall(id: string): Observable<any> {
    return this.http.get(`${URL}/getSmall/${id}`);
  }

  follow(username: string): Observable<any> {
    return this.http.get(`${URL}/follow/${username}`);
  }
  unfollow(username: string): Observable<any> {
    return this.http.get(`${URL}/unfollow/${username}`);
  }

}
