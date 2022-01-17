import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisURI } from '../../../shared/apis-uri';
import { Factura } from '../_model/invoice';
import { Cart } from '../../../shared/cart';
import { Product } from '../../product/_model/product';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiURI = ApisURI.dwf20221apiURI;
  private resource = "/invoice";
  
  constructor(
    private http: HttpClient
  ) { }

  getInvoices(rfc: String){
    return this.http.get<Factura[]>(this.apiURI + this.resource+"/"+rfc);
  }

  getInvoice(rfc: String){
    var fac: Factura[] = []
    for(let factura of Cart.invoices){
      if(factura.rfc == rfc){
        fac.push(factura);
      }
    }
    return fac;
  }

  getFactura(id_invoice: number){
    var fas: Factura = new Factura();
    for(let factura of Cart.invoices){
      if(factura.id_invoice == id_invoice){
        return factura;
      }
    }
    console.log("Factura no encontrada");
    return fas;
  }

  createInvoice(rfc: String, total: number){
    return this.http.post(this.apiURI +this.resource+"/"+rfc,total);
  }
}
