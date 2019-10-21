import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  preserveWhitespaces: true
})
export class ListComponent implements OnInit {

  lista = [];
  baseUrl: 'http://localhost:3000/produtos';

  constructor(private service: ListService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.service.list().subscribe(dados => this.lista = dados);
  }

  onEdit(id) {
    this.router.navigate(['editar', id]);
  }

  onDelete(id) {
    this.service.deleteProduct(id).subscribe(res => {
      console.log(res);
    });
  }

}
