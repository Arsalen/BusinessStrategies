import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

import { UserService } from '../_services/user.service'
import { SearchService } from '../_services/search.service'
import { User, Search } from '../_models/index'

// import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-search-modal-component',
    moduleId: module.id,
    templateUrl: 'search-modal.component.html'
})

export class SearchModalComponent implements OnInit {
    @Input() 
    private model: any  ;
    private loading = false;
    private currentUser: User;

    private analysis: any
    private period: any
    private plateforms: any
    private selectedfb: any
    private selectedtw: any
    private selectedfd: any
    private fb: any
    private tw: any
    private fd: any
    
    constructor(
        private alertService: AlertService,
        private searchservice: SearchService,
                ) {
             this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
                    }
ngOnInit(){
 this.model = {
     client_id: this.currentUser.id,
    expression: '',
    plateform: [],
    plateform_1: '',
    plateform_2: '',
    plateform_3: '',
    FbUrl: '',
    period: this.period,
    analysis: [],
    analysis_1: '',
    analysis_2: '',
    analysis_3: '',
    analysis_4: '',
 }

 this.analysis = ['lc','gd','rv', 'ag']
    this.period = ['lg','md','sh']
    this.plateforms = [
       {id: 'fb', name: "Facebook"},
       {id: 'tw', name: "Twitter"},
       {id: 'fd', name: "Foodly"},
        ]
 
    this.selectedfb = false
    this.selectedtw = false
    this.selectedfd = false
    this.fb = 0
    this.tw = 0
    this.fd = 0

}
    

    t(){
        setTimeout(()=> this.search() , 1000);
    }

    check(ch: any){
    if(ch.name == 'Facebook')
     {  this.fb += 1
         if(this.fb % 2 != 0)
         {
            this.model.plateform.push(this.plateforms[0].id); this.model.plateform_1 = 'fb'
            this.selectedfb = true
         }else{
             let index: number = this.model.plateform.indexOf(this.plateforms[0].id);
             if (index !== -1) {
             this.model.plateform.splice(index, 1); this.model.plateform_1 = ''
                        }    
             this.selectedfb = false}
         
        }

        if(ch.name == 'Twitter')
     {  this.tw += 1
         if(this.tw % 2 != 0)
         {
            this.model.plateform.push(this.plateforms[1].id); this.model.plateform_2 = 'tw'
            this.selectedtw = true
         }else{
             let index: number = this.model.plateform.indexOf(this.plateforms[1].id);
             if (index !== -1) {
             this.model.plateform.splice(index, 1); this.model.plateform_2 = 'tw'
                        }    
             this.selectedtw = false}
         
        }

        if(ch.name == 'Foodly')
     {  this.fd += 1
         if(this.fd % 2 != 0)
         {
            this.model.plateform.push(this.plateforms[2].id); this.model.plateform_3 = 'fd'
            this.selectedfd = true
         }else{
             let index: number = this.model.plateform.indexOf(this.plateforms[2].id);
             if (index !== -1) {
             this.model.plateform.splice(index, 1); this.model.plateform_3 = ''
                        }    
             this.selectedfd = false}
         
        }

}


search(){
    
if(this.model.location == true)
{let exist = false
    for(let elmt in this.model.analysis )
    {
        if (this.model.analysis[elmt] == 'lc')
            {exist = true;continue}
    }
    if(exist == false)
    {this.model.analysis.push(this.analysis[0]); this.model.analysis_1 = this.analysis[0]  }}
    else{
    let index: number = this.model.analysis.indexOf(this.analysis[0]);
             if (index !== -1) {
             this.model.analysis.splice(index, 1); this.model.analysis_1 = ''
                        }
    }
    if(this.model.gender == true)
    {let exist = false
    for(let elmt in this.model.analysis )
    {
        if (this.model.analysis[elmt] == 'gd')
            {exist = true;continue}
    }
    if(exist == false)
    {this.model.analysis.push(this.analysis[1]); this.model.analysis_2 = this.analysis[1] }
    }
    else{
    let index: number = this.model.analysis.indexOf(this.analysis[1]);
             if (index !== -1) {
             this.model.analysis.splice(index, 1); this.model.analysis_2 = ''
                        }
    }
    if(this.model.review == true)
    {let exist = false
    for(let elmt in this.model.analysis )
    {
        if (this.model.analysis[elmt] == 'rv')
            {exist = true;continue}
    }
    if(exist == false)
    {this.model.analysis.push(this.analysis[2]); this.model.analysis_3 = this.analysis[2]  }}
    else{
    let index: number = this.model.analysis.indexOf(this.analysis[2]);
             if (index !== -1) {
             this.model.analysis.splice(index, 1); this.model.analysis_3 = ''
                        }
    }
    if(this.model.age == true)
    {let exist = false
    for(let elmt in this.model.analysis )
    {
        if (this.model.analysis[elmt] == 'ag')
            {exist = true;continue}
    }
    if(exist == false)
    {this.model.analysis.push(this.analysis[3]); this.model.analysis_4 = this.analysis[3]  }}
    else{
    let index: number = this.model.analysis.indexOf(this.analysis[3]);
             if (index !== -1) {
             this.model.analysis.splice(index, 1); this.model.analysis_4 = ''
                        }

    }
    this.searchservice.create(this.model).then(data => {  } )
    }
}
