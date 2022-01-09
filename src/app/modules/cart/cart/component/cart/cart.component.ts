import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/_model/product';
import { Cart } from '../../../../../shared/cart'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  getCart(){
    let cart1: Product[] = [];
    cart1 = Cart.cart;
    return cart1;
  }
}
