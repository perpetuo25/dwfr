import { Product } from "../../product/_model/product";
import { Articulo } from "./articulo"

export class Factura{
    id_invoice: number;
    rfc: String;
    subtotal: number;
    taxes: number;
    total: number;
    created_at: Date;
    articles : Product [];

    constructor(        ){
            this.id_invoice = 0;
            this.rfc = "";
            this.subtotal = 0.0;
            this.taxes = 0.0;
            this.total = 0.0;
            this.articles = []
            this.created_at = new Date();
        }
}