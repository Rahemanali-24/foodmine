import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit{
  
  @Input()
order!:Order
   
constructor(private router:Router,private tosterservice:ToastrService,private cartService:CartService) { }
handler:any = null;
ngOnInit() {
  this.loadStripe();
}

pay(amount: any) {    
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51OzdqBSHjxn9NUdMpcDN2Cb7PUNDumbrENAx0HhryimrXvKRIgnB85kWENTp3Nn2EFtV3WKcWLzVho04cxG2sDNj000LyYds1C',
    locale: 'auto',
    token: (token: any) => { // Use arrow function here
      console.log(token);
 // Use array syntax and ensure `this` refers to the component instance
      // alert('success');
      this.tosterservice.success('Payment successfull')
      this.router.navigate(['/home']); 
      this.cartService.clearCart();
    }
    
  });


  handler.open({
    name: 'Pyament Gateway',
    description: 'Pay Your Food Bill',
    amount: amount * 100
  });

}

loadStripe() {
   
  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://checkout.stripe.com/checkout.js";
    s.onload = () => {
      this.handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51OzdqBSHjxn9NUdMpcDN2Cb7PUNDumbrENAx0HhryimrXvKRIgnB85kWENTp3Nn2EFtV3WKcWLzVho04cxG2sDNj000LyYds1C',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          alert('Payment Success!!');
        }
      });
    }
     
    window.document.body.appendChild(s);
  }
}

}
