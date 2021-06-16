import { Produto } from "./Produto"

export class Categoria {
    public id: number
    public nome: string
    public organico: boolean
    public industrial: boolean
    public postagem: Produto[]
}