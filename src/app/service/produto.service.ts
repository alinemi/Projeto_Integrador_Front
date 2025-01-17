import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>('https://projetoefas.herokuapp.com/produto', this.token)
  }

  getByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`https://projetoefas.herokuapp.com/produto/${id}`, this.token)
  }

  getByNomeProduto(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`https://projetoefas.herokuapp.com/produto/${nome}`, this.token)
  }

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('https://projetoefas.herokuapp.com/produto', produto, this.token)
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>('https://projetoefas.herokuapp.com/produto', produto, this.token)
  }

  deleteProduto(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`https://projetoefas.herokuapp.com/produto/${id}`, this.token)
  }
}
