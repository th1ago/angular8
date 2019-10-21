import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lista } from './list';
import { tap, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  list() {
    return this.http.get<Lista[]>(this.API)
      .pipe(
        tap(console.log)
      );
  }

  deleteProduct(id) {
    return this.http.delete<Lista>(this.API + '/' + id, this.options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // pega o erro do cliente
      errorMessage = error.error.message;
    } else {
      // pega o erro do serve
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
