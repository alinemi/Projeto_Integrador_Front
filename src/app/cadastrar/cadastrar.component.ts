import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user:Usuario=new Usuario
  confirmarSenha:string
  campoNome:string
  campoEmail:string
  campoSenha:string
  campoCelular:string


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }
  confirmSenha(event: any){
    this.confirmarSenha= event.target.value
  }

  validaNome(event:any){
    this.campoNome= event.target.value
  }

  validaEmail(event:any){
    this.campoEmail= event.target.value
  }

  validaSenha(event:any){
    this.campoSenha= event.target.value
  }

  validaCelular(event:any){
    this.campoCelular= event.target.value
  }

  cadastrar(){
   if (this.user.senha != this.confirmarSenha) {
    this.alertas.showAlertDanger('As senhas devem ser iguais')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
    }
  }


}

  
