import { Usuario } from './usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { }

  fazerLogin(formValues: any) {
    let parametrosURL : HttpParams = new HttpParams({});
    parametrosURL = parametrosURL.append('email',formValues.email)
    parametrosURL = parametrosURL.append('senha',formValues.senha)

    return this.http.get(this.API, { params: parametrosURL })
    .pipe(
      tap(console.log)
    );
  }

  fazerLogout() {
    localStorage.removeItem('');
  }
}
