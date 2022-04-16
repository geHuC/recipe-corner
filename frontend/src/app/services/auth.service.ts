import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const URL = 'https://recipecorner.herokuapp.com/api/v1/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${URL}/login`, { username, password }).pipe(shareReplay());
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${URL}/register`, { username, email, password }).pipe(shareReplay());
  }
  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
  isLogged(): boolean {
    return this.tokenStorage.getUser()._id ? true : false;
  }
  isAuthenticated: boolean = this.isLogged();
}
