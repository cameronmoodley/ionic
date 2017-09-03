import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
// import {test} from "../../www/build/cridentials/test";



@Injectable()
export class LoginService {
  constructor(private http: Http) {
  }

  getCridentials = (): Observable<Response> => {
    return this.http.get('/build/cridentials/cridentials.json').map(res => res.json());
  }
}
