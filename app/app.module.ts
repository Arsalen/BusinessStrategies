import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, MessageService, SearchService, ManageSearchService, PreferenceService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { AccueilComponent } from './accueil.component';

import { UserDetailsComponent } from './user-details.component';

import { ResultatComponent } from './_client/resultat.component';
import { EditComponent } from './edit.component';
import { SearchModalComponent } from './_client/search-modal.component';
import { HistoryComponent } from './_client/index';
import { SearchComponent } from './_client/index';
import { PreferenceModalComponent } from './_client/preference-modal.component'
import { DeleteModalComponent } from './delete-modal.component'
import { ManageUsersComponent } from './_admin/index';
import { ManageSearchComponent } from './_admin/index';
import { NotificationsComponent } from './_admin/index';

import { UserHistoryComponent } from './_admin/_manageusers/index';
import { UsersWaitingComponent } from './_admin/_manageusers/index';
import { CheckMessagesComponent } from './_admin/_manageusers/index';



import { ContactComponent } from './contact.component';

import { User, Message, Search, ManageSearch, Preference } from './_models/index'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AccueilComponent,
        
        UserDetailsComponent,
        ResultatComponent,
        DeleteModalComponent,
        PreferenceModalComponent,
        EditComponent,
        SearchModalComponent,
        HistoryComponent,
        SearchComponent,
        ContactComponent,
        ManageUsersComponent,
        ManageSearchComponent,
        NotificationsComponent,
        UserHistoryComponent,
        UsersWaitingComponent,
        CheckMessagesComponent,      
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        MessageService,
        SearchService,
        PreferenceService,
        ManageSearchService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }