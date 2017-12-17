import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

import { UserService } from '../_services/user.service'
import { SearchService } from '../_services/search.service'
import { User, Search } from '../_models/index'

import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'resultat-component',
    moduleId: module.id,
    templateUrl: 'resultat.component.html'
})

export class ResultatComponent implements OnInit {
    @Input() 
     model: any  ;
    loading = false;
    currentUser: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userservice: UserService,
        private searchservice: SearchService,
        private location: Location) {
             this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
                                    }
ngOnInit(){

 }

 }

