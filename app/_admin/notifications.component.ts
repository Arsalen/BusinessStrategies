import { Component, OnInit} from '@angular/core';
import { User} from '../_models/index';
import {  PreferenceService } from '../_services/index';

import {AuthenticationService, AlertService } from '../_services/index'

import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: 'notifications.component.html',styleUrls:['../accueil.component.css']
})

export class NotificationsComponent implements OnInit {

    currentUser: User;
    preferences: any[] = [];

    constructor(
                private preferenceService: PreferenceService,
                private authenticationservice: AuthenticationService,
                private alertService: AlertService,
                private router: Router,
                ) {}


    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.preferenceService.getAll().then(data => this.preferences = data)
    }

    delete_notif(notif: any){
        this.preferences.splice( this.preferences.indexOf(notif) ,1)
        this.preferenceService.delete(notif.id).then(data => {this.alertService.success('Preference deleted successfully', false)})
    }

    signout(){
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }
}