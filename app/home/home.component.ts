// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { User, Message } from '../_models/index';
import { UserService, MessageService } from '../_services/index';

import {AuthenticationService, AlertService } from '../_services/index'
import { Router } from '@angular/router';

import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginComponent } from '../login/index'
import { RegisterComponent } from '../register/index'

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',styleUrls:['../accueil.component.css']
})

export class HomeComponent implements OnInit {
    @Input()
    private loading = false;
    private currentUser: User;
    users: any[] = []
    constructor(
                private authenticationservice: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                
                private userService: UserService
                ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getAll().subscribe(users => { this.users = users;
        });
    }

    to_user_details(){
            this.router.navigate(['/user-details', this.currentUser.id])
    }

    signout(){
        this.loading = true;
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }
}