import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import {HomeComponent} from '../home/index'

@Component({
    selector: 'my-signup-component',
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    private model: any = {} ;
    private loading = false;
    private admin: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
        ) { }

    ngOnInit(){
    this.authenticationService.logout();
    }

    t(){
        setTimeout(()=> this.register() , 1000);
    }

    register() {
        this.loading = true;
        this.model.admn = this.admin
        this.model.held = true;
        
        this.authenticationService.token().subscribe(data =>  { this.authenticationService.register(this.model).subscribe(data => {
                    this.alertService.success('Registration successful', false);
                    this.router.navigate(['']);
                    this.loading = false;
                    this.model = {}
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.model = {}

                }) }
                ,
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.model = {}
                }
                )

}
}
