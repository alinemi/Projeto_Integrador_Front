import { Usuario } from "./Usuario"

export class Mensagem{
    public id:number
    public texto:string
    public date:Date
    public remetente:Usuario
    public destinatario:Usuario
}