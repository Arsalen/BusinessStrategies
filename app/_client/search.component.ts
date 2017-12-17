import { Component, OnInit } from '@angular/core';

import { SearchModalComponent } from './search-modal.component';

import { User, Message } from '../_models/index';
import {AuthenticationService, AlertService} from '../_services/index'
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';



@Component({
    moduleId: module.id,
    templateUrl: 'search.component.html',//styleUrls:['../accueil.component.css']
})

export class SearchComponent implements OnInit {
    model: any
    currentUser: User;
    constructor(
        private router: Router,
        private authenticationservice: AuthenticationService,
        ){}


    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    tohome(){
        this.router.navigate(['/home']);
    }
    
    signout(){
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }
    
    tohistory(){
        this.router.navigate(['/history', this.currentUser.id]);
    }
    
}