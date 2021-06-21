import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  usuario: Usuario = new Usuario()

  idUsuario: number = environment.id

  categoria: Categoria = new Categoria()
  idCategoria: number
  listaCategoria: Categoria[]

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private alertas:AlertasService,
    private produtoService: ProdutoService,
    private categoriaService:CategoriaService,
    private usuarioService: AuthService
  ) { }

  ngOnInit( ){
    window.scroll(0,0)
    if(environment.token==''){
      this.alertas.showAlertDanger('Sua sessão expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdProduto (id)
    this.findByIdUsuario (this.idUsuario)
  }

  findByIdProduto(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
    })
  }

  findByIdUsuario(idUser: number){
    this.usuarioService.getByIdUser(idUser).subscribe((resp:Usuario)=>{
      this.usuario = resp
    })
  }

  findAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  editar(){
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp

      this.alertas.showAlertSuccess('Produto atualizado com sucesso!')
      this.router.navigate([''])
    })

  }

  autor(){
    let ok:boolean = false

    if(this.produto.usuario.id==this.idUsuario){
    ok = true
      
    }

    return ok
  }
  
}