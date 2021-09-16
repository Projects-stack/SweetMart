import { Cart, CartItems } from './../../models/ICustomer';
import { CartService } from './../../services/cart.service';
import { Sweet } from './../../models/ISweet';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public sweetItems: Sweet[] = []
  public customerName!: string;
  public cart!: Cart;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.customerName.subscribe((customerName) => {
      this.customerName = customerName;
    });

    this.cartService.cartId.subscribe((cartId) => {
      this.cartService.getCart(cartId).subscribe((cart) => {
        this.cart = cart;
        for(let i=0; i<cart.cartItems.length; i++) {
          this.sweetItems.push(cart.cartItems[i].sweetItem)
          this.sweetItems[i].quantity = cart.cartItems[i].quantity;
        }
      });
    });
    
  }

  onDelete(id: number, i: number): void {
    this.cartService.delete(id).subscribe();
    // this.sweetItems.splice(i);
  }

}
