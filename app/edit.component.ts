import { Component,Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertService} from './_services/index';
import { UserService } from './_services/user.service'
import { User } from './_models/user'

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-edit-component',
    moduleId: module.id,
    templateUrl: 'edit.component.html'
})

export class EditComponent implements OnInit {
    @Input() 
    private model: any  ; 
    private loading = false;
    private currentUser: User;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private userservice: UserService,
                ) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
                    }
    ngOnInit(){
    this.model = this.currentUser;
    }


    t(){
        setTimeout(()=> this.editdetails() , 1000);
    }

    editdetails(){
    this.userservice.edit(this.currentUser,this.model)
        .subscribe( data =>{ 
                        this.alertService.success('Edit successful', false);
                        localStorage.setItem('currentUser', JSON.stringify(data));
                        this.router.navigate(['']);
                            },
                            error => {
                    this.alertService.error(error);
                    this.loading = false;
                    
                });
}

}
