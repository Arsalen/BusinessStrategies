
import { User } from './_models/index';
import { UserService } from './_services/index';
import { Component,OnInit } from '@angular/core';
import {AuthenticationService,AlertService} from './_services/index'
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    templateUrl: 'user-details.component.html',styleUrls:['accueil.component.css']
})

export class UserDetailsComponent implements OnInit {

    private loading= false;
    private subscription: any
    private errormessage: any
    private successmessage: any
    private currentUser: any

    constructor(
                private authenticationservice: AuthenticationService,
                private router: Router,          
                private alertService: AlertService,
                ) {
                this.subscription = this.alertService.getMessage().subscribe(message => {
                    if(message != undefined)
                    {
                        if(message.type == 'success')
                            {this.errormessage = false ; this.successmessage = message }
                        else if(message.type == 'error')
                            {this.successmessage = false ; this.errormessage = message }}
                    });
                }

    ngOnInit() {
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    reset(){
            this.errormessage = false; this.successmessage = false
        }

    to_history(){
        this.router.navigate(['/history', this.currentUser.id]);
    }

    to_manageusers(){
        this.router.navigate(['/manage-users'])
    }

    to_notifications(){
        this.router.navigate(['/notifications'])
    }
    
    signout(){
        this.loading = false;
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }

}