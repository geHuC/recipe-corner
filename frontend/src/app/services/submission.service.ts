import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3030/api/v1/submissions'

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  getAll(type: string, page: number): Observable<any> {
    return this.http.get(`${URL}/?sortBy=${type}&page=${page}`);
  }

  submitView(id: string): Observable<any> {
    return this.http.get(`${URL}/view/${id}`);
  }

  getFeed(sort: string = 'newest'): Observable<any> {
    return this.http.get(`${URL}/feed?sort=${sort}`);
  }

  getSingle(author: string, slug: string): Observable<any> {
    return this.http.get(`${URL}/${author}/recipe/${slug}`);
  }

  search(term: string, sort: string): Observable<any> {
    return this.http.get(`${URL}/search?q=${term}&sort=${sort}`);
  }

  getCategory(category: string, sort: string): Observable<any> {
    return this.http.get(`${URL}/category/${category}?sortBy=${sort}`);
  }

  update(id: string, payload: any): Observable<any> {
    let np = { ...payload.value };
    np.ingredients = JSON.stringify(payload.value.ingredients);

    return this.http.post(`${URL}/${id}`, np);
  }

  submit(payload: any): Observable<any> {
    const formData: any = new FormData();
    formData.append('image', payload.get('image')!.value);
    formData.append('title', payload.get('title')!.value);
    formData.append('description', payload.get('description')!.value);
    formData.append('cooktime', payload.get('cooktime')!.value);
    formData.append('preptime', payload.get('preptime')!.value);
    formData.append('portions', payload.get('portions')!.value);
    formData.append('instructions', payload.get('instructions')!.value);
    formData.append('category', payload.get('category')!.value);
    formData.append('ingredients', JSON.stringify(payload.get('ingredients')!.value));
    return this.http.post(`${URL}/`, formData);
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
