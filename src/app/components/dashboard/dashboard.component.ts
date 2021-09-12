import { CartService } from './../../services/cart.service';
import { Sweet } from './../../models/ISweet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public sweetItems!: Sweet[];
  public quantityForm:FormGroup = new FormGroup({});
  public customerName: string = '';
  public isHavingCart: boolean = false;
  public cartId!: number;
  public sweet!: Sweet;

  constructor( public cartService: CartService,
    public fb: FormBuilder, public modalService: NgbModal) { }

  ngOnInit(): void { 
    this.quantityForm = this.fb.group({
      name: [''],
      quantity: ['']
    });

    this.cartService.get().subscribe((sweetItems) => {
      this.sweetItems = sweetItems;
    });

    this.cartService.cartId.subscribe((cartId) => {
      this.cartId = cartId;
    });
  }

  public addSweetItem(targetModal: any, index: number) {
    this.sweet = this.sweetItems[index];

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.quantityForm.patchValue({
      name: this.sweetItems[index].name
    });
      
    this.cartService.post(this.cartId, this.sweet.sweetItemId).subscribe();
  }

  public onQuantityFormSubmit(sweet: Sweet): void {
    if(this.cartId) {
      this.cartService.putQuantity(this.cartId, this.sweet.sweetItemId, sweet.quantity).subscribe((error) => {
        console.log(error);
      });
    }
    this.modalService.dismissAll();
  }
}
