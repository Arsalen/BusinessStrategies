import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertService } from './_services/index';
import { UserService } from './_services/user.service'
import { User} from './_models/index'
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-delete-modal-component',
    moduleId: module.id,
    templateUrl: 'delete-modal.component.html'
})

export class DeleteModalComponent implements OnInit {
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private userservice: UserService,
                ) {
             this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
                                    }
        ngOnInit(){
        }

        t(){
        setTimeout(()=> this.deleteaccount(this.currentUser.id) , 1000);
        }

        deleteaccount(id: number){
        this.userservice.delete(id).subscribe(() => {
            this.alertService.success('Delete successful', false);
            this.router.navigate(['']);
           });
        }

}
