import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]

  constructor(
    private router: Router,
    private produtoService:ProdutoService

  ) { }

  token = {
    headers:new HttpHeaders().set('Authorization', environment.token)
  }

  ngOnInit(){
    if(environment.token==''){
      alert('Sua sessão expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.findAllProdutos()
  }

  findAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp:Produto[])=>{
      this.listaProdutos = resp
    })
  } 

  publicar(){
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp

    alert('Tema cadastrado com sucesso!')
    this.produto = new Produto()
    this.findAllProdutos()
    this.produto=new Produto()

    } )
  }

}
