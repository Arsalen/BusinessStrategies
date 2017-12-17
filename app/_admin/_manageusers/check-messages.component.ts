import { Component, OnInit, Input } from '@angular/core';

import { User, Message } from '../../_models/index';
import {  MessageService } from '../../_services/index';
import {AuthenticationService, AlertService } from '../../_services/index'
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    templateUrl: 'check-messages.component.html',styleUrls:['../../accueil.component.css']
})

export class CheckMessagesComponent implements OnInit {

    private currentUser: User;
    private messages: any[] = [];

    constructor(
                private messageService: MessageService,
                private authenticationservice: AuthenticationService,
                private alertService: AlertService,
                private router: Router,
                ) {}
    
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.messageService.getAll().then(data => this.messages = data) 
    }

    to_sender_history(msg: Message){
        this.router.navigate(['/history', msg.id_sender]);
    }

    delete_msg(msg: any){
        this.messages.splice( this.messages.indexOf(msg) ,1)
        this.messageService.delete(msg.id).then(data => {this.alertService.success('message deleted successfully', false)})
    }

    signout(){
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }

}