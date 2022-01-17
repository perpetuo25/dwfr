import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { NavComponent } from './component/nav/nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { ExchangeRateComponent } from '../exchange-rate/component/exchange-rate/exchange-rate.component';
import { RegionComponent } from '../customer/component/region/region.component';
import { CategoryComponent } from '../product/component/category/category.component';
import { CustomerComponent } from '../customer/component/customer/customer.component';
import { CustomerDetailComponent } from '../customer/component/customer-detail/customer-detail.component';
import { ProductComponent } from '../product/component/product/product.component';
import { CartComponent } from '../cart/cart/component/cart/cart.component';
import { ProductDetailComponent } from '../product/component/product-detail/product-detail.component';
import { InvoiceComponent } from '../invoice/component/invoice/invoice.component';
import { InvoiceDetailComponent } from '../invoice/component/invoice-detail/invoice-detail.component';

const routes: Routes = [
  {path: 'exchange-rate', component: ExchangeRateComponent},
  {path: 'region', component: RegionComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer-detail/:rfc', component: CustomerDetailComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product-detail/:gtin', component: ProductDetailComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'cart', component: CartComponent},
  {path: 'invoice-detail/:id_invoice', component: InvoiceDetailComponent}
];

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
