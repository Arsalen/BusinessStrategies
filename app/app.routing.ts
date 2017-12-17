﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

import {AccueilComponent} from './accueil.component'

import {UserDetailsComponent} from './user-details.component'

import {HistoryComponent} from './_client/history.component'
import {SearchComponent} from './_client/search.component'
import {ResultatComponent} from './_client/resultat.component'
import { ManageUsersComponent } from './_admin/index';
import { ManageSearchComponent } from './_admin/index';
import { NotificationsComponent } from './_admin/index';

import { UserHistoryComponent } from './_admin/_manageusers/index';
import { UsersWaitingComponent } from './_admin/_manageusers/index';
import { CheckMessagesComponent } from './_admin/_manageusers/index';



const appRoutes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    
    { path: 'user-details/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
    
    { path: 'history/:id', component: HistoryComponent, canActivate: [AuthGuard]},
    { path: 'search/:id', component: SearchComponent, canActivate: [AuthGuard]},
    { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard]},
    { path: 'manage-search', component: ManageSearchComponent, canActivate: [AuthGuard]},
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
    { path: 'resultat', component: ResultatComponent, canActivate: [AuthGuard]},

    { path: 'user-history', component: UserHistoryComponent, canActivate: [AuthGuard]},
    { path: 'users-waiting', component: UsersWaitingComponent, canActivate: [AuthGuard]},
    { path: 'check-messages', component: CheckMessagesComponent, canActivate: [AuthGuard]},

    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // otherwise redirect to accueil
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);