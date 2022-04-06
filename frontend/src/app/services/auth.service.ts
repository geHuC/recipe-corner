import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const URL = 'http://localhost:3030/api/v1/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${URL}/login`, { username, password }).pipe(shareReplay());
  }
  register(username: string, email: string, password: string, repeatPassword: string, fullname: string): Observable<any> {
    return this.http.post(`${URL}/register`, { username, email, password, repeatPassword, fullname }).pipe(shareReplay());
  }
  isLogged(): boolean {
    return this.tokenStorage.getUser()._id ? true : false;
  }
}
