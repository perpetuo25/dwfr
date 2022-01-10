import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisURI } from '../../../shared/apis-uri';
import { Articulo } from '../_model/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private apiURI = ApisURI.dwf20221apiURI;
  private resource = "/invoice/item";

  constructor(
    private http: HttpClient
  ) { }

  getArticulos(id_invoice: number){
    return this.http.get<Articulo []>(this.apiURI + this.resource + "/"+id_invoice)
  }


}
