import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alert.service';

@Component({
  selector: 'app-somos',
  templateUrl: './somos.component.html',
  styleUrls: ['./somos.component.css']
})
export class SomosComponent implements OnInit {

  constructor(
    private router:Router,
    private alertas:AlertasService,
  ) { }

  ngOnInit( ){
    window.scroll(0,0)
    if(environment.token==''){
      this.alertas.showAlertDanger('Sua sessão expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
    }
  }
}