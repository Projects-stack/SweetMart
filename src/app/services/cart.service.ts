import { Cart } from './../models/ICustomer';
import { Sweet } from './../models/ISweet';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public baseUrl: string = "http://localhost:9001/";
  public cartId: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public customerName: BehaviorSubject<string> = new BehaviorSubject<string>('Ankita');

  constructor(public httpClient: HttpClient) { 
  }

  public get(): Observable<Sweet[]> {
    return this.httpClient.get<Sweet[]>(this.baseUrl + "SweetItem/showallsweetitems");
  }

  public getCart(cartId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.baseUrl + 'cart/' + cartId);
  }

  public createCart(userId: number): Observable<Cart> {
    return this.httpClient.post<Cart>(this.baseUrl + 'cart/create/' + userId, {});
  }

  public post(cartId: number, sweetId: number): Observable<Sweet> {
    return this.httpClient.post<Sweet>(this.baseUrl + 'cart/' + cartId + '/add/' + sweetId, {});
  }

  public putQuantity(cartId: number, sweetId: number, quantity: number): Observable<Cart> {
    return this.httpClient.put<Cart>(this.baseUrl + 'cart/' + cartId + '/update/' + sweetId
     + '/quantity/' + quantity, {})
  }

  public delete(sweetId: number) {
    // return this.httpClient.delete<CartItem>(this.baseUrl + sweetId);
  }
}
