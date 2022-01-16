import { Component, OnInit } from '@angular/core';
import { Factura } from '../../_model/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '../../_service/invoice.service';
import { FormBuilder, Validators} from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

declare var $: any;

import Swal from 'sweetalert2';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices: Factura[] = [];
  invoice: Factura = new Factura();
  formulario = this.formBuilder.group({
    rate: ['', Validators.required]
  });

  constructor(
    private invoice_service: InvoiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

  }

  ngSubmit(){
    var rate = this.formulario.controls['rate'].value;
    //this.getInvoices(rate);
    this.getInvoice(rate);
  }

  getInvoice(rfc: string){
    this.invoices = this.invoice_service.getInvoice(rfc)
  }

  getInvoices(rfc: String){
    this.invoice_service.getInvoices(rfc).subscribe(
      res => {
        console.log(res);
        this.invoices = res;
      },
      err => console.log(err)
    )
  }

  invoiceDetail(rfc: string){
    this.router.navigate(['invoice-detail/'+rfc]);
  }
}
