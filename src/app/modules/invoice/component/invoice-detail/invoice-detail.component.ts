import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../../_model/invoice';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Factura = new Factura();
  id_factura: any = null;

  constructor(
    private invoice_service: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.id_factura = this.route.snapshot.paramMap.get('id_invoice');
    //console.log(this.id_factura);
   this.getFactura(this.id_factura);
  }

  getFactura(id_invoice:number){
    this.invoice = this.invoice_service.getFactura(id_invoice);
  }
  
}
