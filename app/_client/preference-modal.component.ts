import { Component, OnInit } from '@angular/core';
import { AlertService} from '../_services/index';
import { PreferenceService } from '../_services/preference.service'
import { User } from '../_models/index'
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-preference-modal-component',
    moduleId: module.id,
    templateUrl: 'preference-modal.component.html'
})

export class PreferenceModalComponent implements OnInit { 
    private model: any  ; 
    private loading = false;
    private currentUser: User;

    constructor(
        private alertService: AlertService,
        private preferenceservice: PreferenceService,
        ) {}



    ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model = {client_id: this.currentUser.id, sector: '', url: ''}
    }

    t(){
        setTimeout(()=> this.sendpreference() , 1000);
    }

    sendpreference(){
    this.preferenceservice.create(this.model).then(data => {this.alertService.success('preference sent successfully', false)}
    ,
    error => {
        this.alertService.error(error);
        this.loading = false;            
                }
     )
    }

}
