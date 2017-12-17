import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private regURL = 'http://localhost:8000/Client/'
    private apiURL = 'http://localhost:8000/ClientAuth/'
    private authURL = 'http://localhost:8000/api-token-auth/'
    private headers = new Headers({'Content-Type':'application/json'});
    private postheaders = new Headers({'Content-Type':'application/json'});
    constructor(private http: Http) { }
user: any
p: any
s: any
r: any
    login(email: string, password: string, admin: any) {
            return this.http.post(this.apiURL, JSON.stringify({ email: email, password: password, admin: admin }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                this.r = response.json();
                this.r.token = this.user.token
                if (this.r && this.r.token )
                {
                    // alert(JSON.stringify(this.r))
                    localStorage.setItem('currentUser', JSON.stringify(this.r));
                }
            });
    }
cc = 0
    register(model: any) {
      this.cc += 1
      if(this.cc == 1)      
            {this.postheaders.append('Authorization', 'Bearer ' + this.user.token)}
            return this.http.post(this.regURL, model, {headers: this.postheaders})
            .map((response: Response) => {
            });
    }
    
    token(){
        return this.http.post(this.authURL, JSON.stringify({ username: 'admin', password: 'arsalenhagui' }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                this.user = response.json();
                // alert(this.user.token)
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
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