import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisURI } from '../../../shared/apis-uri';
import { Factura } from '../_model/invoice';

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

  createInvoice(rfc: String, total: number){
    return this.http.post(this.apiURI +this.resource+"/"+rfc,total);
  }
}
