import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto {
    public id: number
    public nome:string
    public preco:number
    public observacao:string
    public categoria:Categoria
    public usuario:Usuario
    public foto:string
    public date:Date
}