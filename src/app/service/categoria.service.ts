import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  token = {

    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('https://projetoefas.herokuapp.com/categoria', this.token)
  }

  getByNomeCategoria(nome: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`https://projetoefas.herokuapp.com/categoria/nome/${nome}`, this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`https://projetoefas.herokuapp.com/categoria/${id}`, this.token)
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('https://projetoefas.herokuapp.com/categoria', categoria, this.token)
  }
}
