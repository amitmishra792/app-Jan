import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoginUser } from '../model/login-user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginUserService {

    loginUserUrl = 'http://localhost:2019/loginUser/loginAlreadyRegUser';
    constructor(private http: Http) {
    }

    // Login User JSON Data Creation and Sent request to server done here
    loginUser(loginUser: LoginUser): Observable<number> {
        let cpHeaders: Headers;
        let options: RequestOptions;
        cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.loginUserUrl, loginUser, options)
            .map(success => success.status);
    }

}
