import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { SearchService } from '../../_services/index';
import {AuthenticationService } from '../../_services/index'
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    templateUrl: 'user-history.component.html',styleUrls:['../../accueil.component.css']
})

export class UserHistoryComponent implements OnInit {

private allsearches: any[] = [];
private loading = false;
private currentUser: User;
    constructor(
                private searchService: SearchService,
                private authenticationservice: AuthenticationService,
                private router: Router,
                ) {}

    ngOnInit() {   
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.searchService.getAll().subscribe(data => {
            this.allsearches = data; 
        })
    }

    signout(){
        this.loading = false;
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }    
}