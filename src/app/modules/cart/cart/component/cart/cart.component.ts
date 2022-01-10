import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/_model/product';
import { Cart } from '../../../../../shared/cart'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  total: number = 0;
  totalWithTaxes : number = 0;

  constructor() { }

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
    console.log(this.total);
    console.log(this.totalWithTaxes);
    return total;
  }

  getTaxes(){
    let taxes = this.getTotalPrice();
    taxes = taxes + (taxes * 0.16);
    this.totalWithTaxes = taxes;
    return taxes;
  }
}
