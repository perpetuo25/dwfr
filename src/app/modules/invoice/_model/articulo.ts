export class Articulo{
    id_item_: number;
    id_invoice: number;
    gtin: String;
    quantity: number;
    unit_price: number;
    taxes: number;
    subtotal: number;
    total: number;

    constructor(
        id_item_: number,
        id_invoice: number,
        gtin: String,
        quantity: number,
        unit_price: number,
        taxes: number,
        subtotal: number,
        total: number
    ){
        this.id_item_ = id_item_;
        this.id_invoice = id_invoice;
        this.gtin = gtin;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.taxes = taxes;
        this.subtotal = subtotal;
        this.total = total;
    }
}