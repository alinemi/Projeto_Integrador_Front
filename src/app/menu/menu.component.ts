import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alert.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number = environment.id

  produto: Produto = new Produto()

  categoria: Categoria = new Categoria()
  idCategoria: number
  listaCategoria: Categoria[]
  alertas:AlertasService

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService:CategoriaService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    this.getAllCategoria()
  }

  categoriaProduto(event: any){
    this.categoria = event.target.value
  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria = resp
    })
  } 

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria=resp
    })
  }

  publicar(){
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
    
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      alert('Postagem realizada com sucesso!')
      this.produto = new Produto()
    })
  }

  sair(){
    environment.celular=0
    environment.email=''
    environment.id=0
    environment.nome=''
    environment.senha=''
    environment.token=''
    this.router.navigate(['/entrar'])
  }

}
