import { Articulo } from "./articulo"

export class Factura{
    id_invoice: number;
    rfc: String;
    subtotal: number;
    taxes: number;
    total: number;
    created_at: Date;

    constructor(
        id_invoice: number,
        rfc: String,
        subtotal: number,
        taxes: number,
        total: number,
        created_at: Date
        ){
            this.id_invoice = id_invoice;
            this.rfc = rfc;
            this.subtotal = subtotal;
            this.taxes = taxes;
            this.total = total;
            this.created_at = created_at;
        }
}