import { Component } from '@angular/core';
import { AlertService} from './_services/index';

import { User } from './_models/user'
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'accueil',
    templateUrl: 'accueil.component.html',styleUrls:['accueil.component.css']
})

export class AccueilComponent { 

    private errormessage: any
    private successmessage: any
    private subscription: Subscription;

    constructor(
        private alertService: AlertService,
                ) {
            this.subscription = this.alertService.getMessage().subscribe(message => {
                 if(message != undefined)
                 {
                     if(message.type == 'success')
                        {this.errormessage = false ;this.successmessage = message}
                    else if(message.type == 'error')
                        {this.successmessage = false ;this.errormessage = message}}
                })
            ;
        }

        reset(){
            this.errormessage = false; this.successmessage = false
        }
}