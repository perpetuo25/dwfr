import { Product } from "../modules/product/_model/product";

export class ApisURI{
    public static exchangeRateURI: string = "https://api.exchangerate-api.com/v4/latest/{rate}";
    public static dwf20221apiURI: string = "http://localhost:8080";
    public static cart: Product[] = [];
}