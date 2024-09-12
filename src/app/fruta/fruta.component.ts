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
  selector: 'app-fruta',
  templateUrl: './fruta.component.html',
  styleUrls: ['./fruta.component.css']
})
export class FrutaComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number = environment.id

  categoria: Categoria = new Categoria
  idCategoria: number
  listaCategoria: Categoria[]
  nomeCategoria: string = 'Frutas'
  alertas:AlertasService

  produto: Produto = new Produto
  listaProdutos: Produto[]
  tituloProd: string =''

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)
    if(environment.token==''){
      this.alertas.showAlertDanger('Sua sessão expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    this.findByNomeCategoria()
    this.getAllProduto()
  }

  categoriaProduto(event: any){
    this.categoria = event.target.value
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria=resp
    })
  }

  getAllProduto() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByNomeCategoria() {
    this.categoriaService.getByNomeCategoria(this.nomeCategoria).subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByNomeProduto() {
    if (this.tituloProd == '') {
      this.getAllProduto()
    } else {
      this.produtoService.getByNomeProduto(this.tituloProd).subscribe((resp: Produto[]) => {
        this.listaProdutos = resp
      })
    }
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
      this.getAllProduto()
    })
  }
}