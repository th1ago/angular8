import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  status: [];

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: [''],
      senha: ['']
    });
  }

  fazerLogin() {
    this.authService.fazerLogin(this.formLogin.value).subscribe(res => {
        if (res.length > 0) {
            if (res[0].status == 'ativo') {
                window.localStorage.setItem('loginAtivo', 'Sim');
                alert('Login efetuado')
            } else {
                window.localStorage.setItem('loginAtivo', 'Não');
                alert('Login inativo');
            }
        } else {
            alert('Login informado não encontrado!');
        }
    });

  }

  fazerLogout() {
    this.authService.fazerLogout();
    this.router.navigate(['/login']);
  }

}
