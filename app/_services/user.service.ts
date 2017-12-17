import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AlertService } from './';
import { User } from '../_models/index';
import {Observable}     from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService {
    private usersURL = '/api/users'
    private userswaitingURL = '/api/userswaiting'
    private adminsURL = '/api/admins'
    private apiURL = 'http://localhost:8000/Client/'
    
    private headers = new Headers({'Content-Type':'application/json'});
    private postheaders = new Headers({'Content-Type':'application/json'});
    
    constructor(private http: Http) { }
    currentUser: any
    cc = 0 
    getAll() { 
        return this.http.get(this.apiURL, this.jwt()).map((response: Response) => response.json());
    }

    getAllWaiting() {
        return this.http.get(this.apiURL, this.jwt()).map((response: Response) => response.json())
    }

    getById(id: number) {
        return this.http.get(this.apiURL+ '/' + id , this.jwt()).map((response: Response) => response.json());
    }

    create(user: any) {
this.cc += 1
        if(this.cc ==1)
        {this.postheaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)}
        return this.http.post(this.apiURL, user, {headers: this.postheaders}).map((response: Response) => response.json());
    }

    edit(editor: any, edited: any) {
        this.cc += 1;
        if(this.cc ==1)
        {this.postheaders.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token)}
        return this.http.put(this.apiURL + editor.id + '/'  , edited, {headers: this.postheaders}).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.apiURL + id + '/' , this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}