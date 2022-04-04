import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${URL}/api/v1/auth`, { username, password }).pipe(shareReplay());
  }
  register(username: string, password: string, email: string) {
    return this.http.post(`${URL}/api/v1/auth`, { username, password, email }).pipe(shareReplay());
  }
}
