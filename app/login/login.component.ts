import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { UserService } from '../_services/user.service'

@Component({
    selector: 'my-login-component',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    private model: any = {};
    private loading = false;
    private admin: boolean = false;
    
     constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
                ) {}

    ngOnInit() {
        this.authenticationService.logout();
        }

    t(){
        setTimeout(()=> this.login() , 1000);
    }

    login() {
        this.loading = true;
        this.authenticationService.token().subscribe(data => { this.authenticationService.login(this.model.email, this.model.password, this.admin)
            .subscribe(
                data => {
                    this.alertService.success('login successful', false);
                    this.loading = false;
                    this.router.navigate(['/home']);
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
                }) }
}

