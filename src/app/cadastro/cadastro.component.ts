import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from './cadastro.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  preserveWhitespaces: true
})
export class CadastroComponent implements OnInit {

  formLeilao: FormGroup;
  baseUrl: 'http://localhost:3000/produtos';

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private service: CadastroService) { }

  ngOnInit() {

    this.route.params.pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id)),
    )
    .subscribe(produto => { this.updateForm(produto);
      }
    );


    this.formLeilao = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      indicador: ['', Validators.required],
      responsavel: ['', Validators.required],
      data: ['', Validators.required],
      finalizado: ['', Validators.required],
    });
  }

  updateForm( produto ) {
    this.formLeilao.patchValue({
      nome: produto.nome,
      preco: produto.preco,
      indicador: produto.indicador,
      responsavel: produto.responsavel,
      data: produto.data,
      finalizado: produto.finalizado
    });
  }

  submit() {

      if (this.formLeilao.value.id) {
        this.service.update(this.formLeilao.value).subscribe(
          success => console.log('sucesso'),
          error => console.log(error),
          () => console.log('update completo')
        );
      } else {
        this.service.create(this.formLeilao.value).subscribe(
          success => console.log('sucesso'),
          error => console.log(error),
          () => console.log('create completo')
        );
      }
  }
}
