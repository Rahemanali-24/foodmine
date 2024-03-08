import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartitem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart! :Cart;

  constructor(private cartServices:CartService){

      this.cartServices.getCartObservable().subscribe((cart)=>{
        this.cart = cart;
      })
  }


  removeFromCart(cartItem:CartItem){
    this.cartServices.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartServices.changeQuantity(cartItem.food.id,quantity);
  }
}
