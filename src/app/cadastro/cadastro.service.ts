import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from '../cadastro/cadastro';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  formLeilao: FormGroup;
  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cadastro[]>(this.API);
  }

  loadById(id) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }

  create(form: any) {

    let body: string = `{
      "nome": "${form.nome} ",
      "preco": ${form.preco},
      "indicador": "${form.indicador}",
      "responsavel": "${form.responsavel}",
      "data": "${form.data}",
      "finalizado": "${form.finalizado}"
    }`;

    return this.http.post(this.API, form);
  }

  update(form: any) {
    return this.http.put(`${this.API}/${form.id}`, form).pipe(take(1));
  }
}
