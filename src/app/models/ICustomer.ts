import { Sweet } from './ISweet';
export interface Customer {
    userId: number;
    cart?: number;
    username: string;
}

export class Cart {
    cartId!: number;
    customer!: Customer;
    cartItems!: CartItems[];
}

export interface CartItems {
    cartItemId: number;
    quantity: number;
    sweetItem: Sweet;
}