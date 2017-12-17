import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, MessageService } from './_services/index';
import { User} from './_models/index'

import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-contact-component',
    moduleId: module.id,
    templateUrl: 'contact.component.html'
})

export class ContactComponent implements OnInit{

     private loading = false;
     private currentUser: User;
     private model: any;
    constructor(
        private alertService: AlertService,
        private messageservice: MessageService,
        ) {}

        ngOnInit(){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
             if(this.currentUser.admn == false)
              {this.model= {id_sender: this.currentUser.id , mail: this.currentUser.email , content: 'message'}  ;}
              else{
                  this.model= {id_sender: this.currentUser.id , mail: '' , content: 'message'}
              }
        }

        t(){
        setTimeout(()=> this.sendmessage() , 1000);
        }

        sendmessage(){
        this.loading = true ;
        if(this.currentUser.admn == false)
        {this.messageservice.create(this.model).then(data => {
        this.alertService.success('message sent successfully', false)
        this.loading = false;
        }, error => {
        this.alertService.error(error);
                    this.loading = false;
                    this.model = {}})}
        }
}