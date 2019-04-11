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

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    addr1: new FormControl('', [Validators.required]),
    addr2: new FormControl(''),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
    cardNum: new FormControl('', [Validators.required]),
    exipration: new FormControl('', [Validators.required]),
    ccv: new FormControl('', [Validators.required])

  });
  //returnUrl: string;
  submitted = false;
  //error: string;
  closeResult: string;

  constructor(public authenticationService: AuthenticationService, public apiService: ApiService, private cartService: CartService, private modalService: NgbModal) { }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    if (this.authenticationService.currentUserValue) {
      this.checkoutForm.setValue({
        firstName: `${this.authenticationService.currentUserValue.firstName}`,
        lastName: `${this.authenticationService.currentUserValue.lastName}`,
      });
      console.log(this.checkoutForm);
    }

    //this.titleService.setTitle('BagelDrops | Log In');
  }

  onSubmit() {
    console.log(this.checkoutForm.value);
  }

  open(content) {
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}