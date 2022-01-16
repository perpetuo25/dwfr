import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/_model/product';
import { Cart } from '../../../../../shared/cart'
import { Factura } from '../../../../../modules/invoice/_model/invoice'
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InvoiceService } from 'src/app/modules/invoice/_service/invoice.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  RFCglobal : string = "";
  total: number = 0;
  totalWithTaxes : number = 0;
  invoice: Factura = new Factura();
  post_category = false;
  submitted = false;

  constructor(private invoice_service: InvoiceService,
    private formBuilder: FormBuilder,
    private router: Router, ) { }

  ngOnInit(): void {
    this.getTotalPrice();
  }

  getCart(){
    let cart1: Product[] = [];
    cart1 = Cart.cart;
    return cart1;
  }

  cartCount(){
    return Cart.cart.length;
  }

  getTotalPrice(){
    let total: number = 0;
    for(let prod of Cart.cart){
      total = total + prod.price;
    }
    this.total = total;   
    //console.log(this.total);
    //console.log(this.totalWithTaxes);
    return total;
  }

  getTaxes(){
    let taxes = this.getTotalPrice();
    taxes = taxes + (taxes * 0.16);
    this.totalWithTaxes = taxes;
    return taxes;
  }

  fieldEmpty(){
    if((<HTMLInputElement>document.getElementById("rfc")).value == "")  return true;
    if((<HTMLInputElement>document.getElementById("direccion")).value == "")  return true;
    if((<HTMLInputElement>document.getElementById("tarjeta")).value == "")  return true;
    if((<HTMLInputElement>document.getElementById("nameCard")).value == "")  return true;
    if((<HTMLInputElement>document.getElementById("fecha")).value == "")  return true;
    if((<HTMLInputElement>document.getElementById("cvv")).value == "")  return true;
    return false; 
  }

  rfcIsValid(){
    if((<HTMLInputElement>document.getElementById("rfc")).value.length<13)  return false;
    return true;
  }

  cardIsValid(){
    if((<HTMLInputElement>document.getElementById("direccion")).value.length < 16)  return false;
    return true;
  }

  createInvoicePost(){
    this.invoice.rfc= (<HTMLInputElement>document.getElementById("rfc")).value;
    this.RFCglobal = (<HTMLInputElement>document.getElementById("rfc")).value;
    this.invoice.subtotal = this.getTotalPrice();
    this.invoice.total= this.getTaxes(); 
    this.invoice.taxes = this.invoice.total - this.invoice.subtotal;
    this.invoice.articles = Cart.cart;   
    console.log(this.invoice)    
    if (this.fieldEmpty() == false){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
      if (Cart.invoices.length == 0){
        this.invoice.id_invoice = 0;
        Cart.invoices.push(this.invoice);
      }
      else{
        this.invoice.id_invoice = Cart.invoices.length;
        Cart.invoices.push(this.invoice);
      }
      Cart.cart = [];
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Hay campos vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }     
    console.log(Cart.invoices);   
  }
  onSubmit(){
    this.submitted = true;
    this.post_category = true;
    this.invoice.rfc= "SAIV920101A00";
    this.RFCglobal = "SAIV920101A00";
    this.invoice.subtotal = 20;
    this.invoice.taxes = 2;
    this.invoice.total=21;
    
    /*if(this.post_category){
      this.invoice_service.createInvoice(this.RFCglobal,thi,this.invoice).subscribe(
        res => {
          console.log("Creada")          
          this.closeModal();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro exitoso!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La categoría no puede ser registrada',
          })
        }
      )
    }
    else{
      console.log("No está entrando esta madrweee");
    }
    */
  }

  createInvoice(){
    this.post_category = true;
    $("#invoice_modal").modal("show");
  }



  closeModal(){
    $("#invoice_modal").modal("hide");
    this.submitted = false;
  }
}
