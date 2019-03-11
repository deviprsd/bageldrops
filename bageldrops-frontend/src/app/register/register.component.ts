import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Sign Up';
  public input: any;

  
  constructor(private modalService: NgbModal) {
    
   }

   open(content) {
    //this.modalService.open(content, { centered: true });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      
    }, (reason) => {

    });
  }

  ngOnInit() {
  }

}
