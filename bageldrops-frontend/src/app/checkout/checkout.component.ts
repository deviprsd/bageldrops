import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ApiService } from '../_services/api.service';
import { CartService } from '../_services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbdModalBasic } from '../modal-basics';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm = new FormGroup({ //Retrieving checkout form input
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    addr1: new FormControl('', [Validators.required]),
    addr2: new FormControl(''),
    state: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    zip: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    cardNum: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    expiration: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    ccv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)])
  });
  submitted = false;
  closeResult: string;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService, private modalService: NgbModal) { }

  ngOnInit() {
    
  }

  onSubmit() {
  }

  open(content) { //Opening modal for checkout completion
    this.apiService.get('billings').subscribe((billings) => {
    })
    console.log(content);
    this.cartService.tax_state = this.checkoutForm.get('state').value;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (`${result}` == 'Confirm click') { //Order is completed
        if(this.authenticationService.currentUserValue) {
          this.apiService.post('addresses', {
            street_one: this.checkoutForm.value.addr1,
            street_two: this.checkoutForm.value.addr2,
            city: this.checkoutForm.value.city,
            state: this.checkoutForm.value.state,
            zip: this.checkoutForm.value.zip
          }).subscribe((data) => {
            this.apiService.post('billing', { //Posts new billing info
              delivery_address: data.id,
              card_number: this.checkoutForm.value.cardNum,
              card_security_code: this.checkoutForm.value.ccv,
              card_exp_date: this.checkoutForm.value.expiration,
              customer: this.authenticationService.currentUserValue.customer_id
            }).subscribe((bill) => {
              this.cartService.completed = true;
              this.cartService.clearCart(bill.id);
            })
          })
        } else {
          this.cartService.completed = true;
          this.cartService.clearCart(-1);
        }
    }

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string { //Seeing if checkout was actually completed or if the modal window was simply closed
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
