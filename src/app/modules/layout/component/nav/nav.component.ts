import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../../shared/cart'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  updateCart(){
    let total = Cart.cart.length;
    return total;  
  }
}
