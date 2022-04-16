import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'https://recipecorner.herokuapp.com/api/v1/users';

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
  updateSettings(payload: any): Observable<any> {
    let fb = new FormData;
    if (payload.get('image').value) {
      fb.append('avatar', payload.get('image')!.value);
    }
    fb.append('bio',payload.get('bio')!.value)
    return this.http.put(`${URL}/profile/settings`, fb)
  }
}
