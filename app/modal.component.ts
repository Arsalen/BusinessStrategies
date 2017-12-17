import {Component, Input} from '@angular/core';

import { LoginComponent } from './login/index'
import { RegisterComponent } from './register/index'

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


export class NgbdModalContent {
}

@Component({
    moduleId: module.id,
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  
  
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}

  openlogin() {
    const modalRef = this.modalService.open(LoginComponent);
    // modalRef.componentInstance.name = 'World';
  }
  opensignup(){
    const modalRef = this.modalService.open(RegisterComponent);
  }
}



/*@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Hello, {{name}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})*/

