import { Injectable } from '@angular/core';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

let storedUser: any = {};
let storedToken: string = '';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    storedToken = token;
  }
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    storedUser = { ...user };
  }
  public signOut(): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    storedToken = '';
    storedUser = {};
  }
  public getToken(): string | null {
    if (storedToken) return storedToken;
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public getUser(): any {
    if (storedUser._id) return storedUser;
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      this.loadFromStorage();
      return JSON.parse(user);
    }
    return {};
  }
  public loadFromStorage(): void {
    const user = window.localStorage.getItem(USER_KEY);
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (user) {
      storedToken = token || '';
      storedUser = JSON.parse(user);
    }
  }
}

