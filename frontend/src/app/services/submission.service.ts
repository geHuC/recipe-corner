import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030/api/v1/submissions'

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${URL}/`);
  }

  getFeed(): Observable<any> {
    return this.http.get(`${URL}/feed`);
  }

  getSingle(author: string, slug: string) {
    return this.http.get(`${URL}/${author}/recipe/${slug}`);
  }

  submit(payload: any): Observable<any> {
    const formData: any = new FormData();
    formData.append('image', payload.get('image')!.value);
    formData.append('title', payload.get('title')!.value);
    formData.append('description', payload.get('description')!.value);
    formData.append('cooktime', payload.get('cooktime')!.value);
    formData.append('preptime', payload.get('preptime')!.value);
    formData.append('portions', payload.get('portions')!.value);
    formData.append('ingredients', JSON.stringify(payload.get('ingredients')!.value));
    formData.append('steps', JSON.stringify(payload.get('steps')!.value));
    return this.http.post(`${URL}/`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

  favourite(id: string): Observable<any> {
    return this.http.get(`${URL}/favourite/${id}`);
  }

  unfavourite(id: string): Observable<any> {
    return this.http.get(`${URL}/unfavourite/${id}`);
  }



}
