import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  idTema: number

  user: Usuario = new Usuario()
  idUser = environment.id

  constructor(
    private router: Router,
    private produtoService:ProdutoService,
    private authService: AuthService,
    private alertas: AlertasService

  ) { }

  token = {
    headers:new HttpHeaders().set('Authorization', environment.token)
  }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token==''){
      this.alertas.showAlertDanger('Sua sessão expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
    }
  }

  findAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp:Produto[])=>{
      this.listaProdutos = resp
    })
  } 

  publicar(){
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp

    this.alertas.showAlertSuccess('Produto cadastrado com sucesso!')
    this.produto = new Produto()
    this.findAllProdutos()
    this.produto=new Produto()
    } )
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

}