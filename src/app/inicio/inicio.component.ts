import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

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
    private http: HttpClient
  ) { }

  token = {
    headers:new HttpHeaders().set('Authorization', environment.token)
  }

  ngOnInit(): void {
  }

  getAllProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produto', this.token)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produto', produto, this.token)
  }

  publicar(){
    this.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp

    alert('Tema cadastrado com sucesso!')
    this.produto = new Produto()
    } )
  }

}
