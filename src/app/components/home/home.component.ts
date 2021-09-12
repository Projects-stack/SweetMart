import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public cartService: CartService) { }

  ngOnInit(): void {
  }

  public assignCart(): void {
    this.cartService.createCart(1).subscribe((cart)=> {
      this.cartService.cartId.next(cart.cartId);
      this.cartService.customerName.next(cart.customer.username);
    });

    this.router.navigate(['/dashboard']).then();
  }
}
