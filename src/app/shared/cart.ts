import { Factura } from "../modules/invoice/_model/invoice";
import { Product } from "../modules/product/_model/product";

export class Cart{
    public static cart: Product[] = [];
    public static invoices: Factura[] = [];
}