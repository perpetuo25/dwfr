import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ArticuloComponent } from './component/articulo/articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceDetailComponent } from './component/invoice-detail/invoice-detail.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    ArticuloComponent,
    InvoiceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InvoiceComponent,
    ArticuloComponent,
    InvoiceDetailComponent
  ]
})
export class InvoiceModule { }
