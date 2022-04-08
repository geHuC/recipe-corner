import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030/api/v1/submissions'

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  submit(payload: any): Observable<any> {
    return this.http.post(`${URL}/`, payload);
  }
}
