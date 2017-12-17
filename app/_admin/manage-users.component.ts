import { Component, OnInit} from '@angular/core';
import { User} from '../_models/index';
import { UserService} from '../_services/index';

import {AuthenticationService, AlertService } from '../_services/index'
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    templateUrl: 'manage-users.component.html',styleUrls:['../accueil.component.css']
})

export class ManageUsersComponent implements OnInit {

    private loading = false;
    private currentUser: User;
    private users: any[] = []
    private allusers: any[] = [];

    constructor(private userService: UserService,
                private authenticationservice: AuthenticationService,
                private router: Router,
                private alertService: AlertService,
                ) {}

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getAll().subscribe(data => {
            this.allusers = data;
        })

    }

    editdetails(user: User){
        this.userService.edit(this.currentUser,user)
        .subscribe( data =>{ 
                        this.alertService.success('Edit successful', false);
                        localStorage.setItem('users', JSON.stringify(this.users));
                        this.router.navigate(['/home']);
                            },
                            error => {
                    this.alertService.error(error);
                    this.loading = false;
                    
                });
    }


    deleteUser(usr: any) {
        this.allusers.splice( this.allusers.indexOf(usr) ,1)
        this.userService.delete(usr.id).subscribe( () => {
            this.alertService.success('Delete successful', false);
            } )
    }
    
    user_history(id: number){
        this.router.navigate(['/history', id]);
    }

    users_waiting(){
        this.router.navigate(['/users-waiting']);
    }


    check_history(){
        this.router.navigate(['/user-history']);
    }

    check_messages(){
        this.router.navigate(['/check-messages']);
    }

    signout(){
        this.loading = false;
        this.authenticationservice.logout();
        this.router.navigate(['/accueil']);
    }
}