import { Component, OnInit} from '@angular/core';
import { User } from '../../_models/index';
import { UserService } from '../../_services/index';
import {AuthenticationService, AlertService } from '../../_services/index'
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: 'users-waiting.component.html',styleUrls:['../../accueil.component.css']
})

export class UsersWaitingComponent implements OnInit {

    private loading = false;
    private currentUser: User;
    private userswaiting: any[] = [];
    
    constructor(private userService: UserService,
                private authenticationservice: AuthenticationService,
                private router: Router,
                private alertService: AlertService 
                ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getAllWaiting().subscribe(userswaiting => { this.userswaiting = userswaiting; });
    }
    
    add_userwaiting(user: User){
            user.held = false;
            this.userService.edit(this.currentUser,user)
            .subscribe(
                data => {
                    this.alertService.success('Registration Client successful', false);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    delete_userwaiting(usr: any){
            this.userswaiting.splice( this.userswaiting.indexOf(usr) ,1)
            this.userService.delete(usr.id)
            .subscribe(
                data => {
                    this.alertService.success('Deleted Client successful', false);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    signout(){
        this.loading = false;
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }
    
}
