import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/index';
import { ManageSearchService } from '../_services/managesearch.service'
import { User} from '../_models/index'

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-search-modal2-component',
    moduleId: module.id,
    templateUrl: 'manage-search.component.html',
})

export class ManageSearchComponent implements OnInit {
    private model: any  ; 
    private loading = false;
    private currentUser: User;

    constructor(
        private alertService: AlertService,
        private managesearchservice: ManageSearchService,
                ) {
             this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
                                    }
    ngOnInit() {
        this.model = {
            searches: 3,
            key: 3,
            regex: ''
        }

    }

    t(){
        setTimeout(()=> this.sendmanagesearch() , 1000);
    }
    
    sendmanagesearch(){
    this.managesearchservice.create(this.model).then(data => {
        this.alertService.success('managesearch sent successfully', false)
        this.loading = false
        this.model = {searches: 3,
            key: 3,
            regex: ''}

            }
        , error => {
        this.alertService.error(error);
                    this.loading = false;
                    this.model = {searches: 3,
            key: 3,
            regex: ''}
            }
         )
    
}


}