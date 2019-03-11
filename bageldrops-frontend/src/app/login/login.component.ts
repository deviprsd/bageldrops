import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  constructor(private modalService: NgbModal) { }
  
  open(content) {
    //this.modalService.open(content, { centered: true });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      // this.userLogIn();
    }, (reason) => {

    });
  }
  ngOnInit() {
  }

  userLogIn(event) {
    event.preventDefault();
    const target = event.target;
    const email = target.getElementById('email');
    const pass = target.getElementById('pass');
    console.log(email);
  }

}
