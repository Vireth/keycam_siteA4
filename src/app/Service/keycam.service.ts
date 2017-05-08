import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {CookieService} from 'ngx-cookie';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class KeycamService {
  private url = 'http://192.168.1.100:3333/api/'; // 'http://163.5.84.197:3000/api/'; // 'http://10.0.1.10:3333/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private cookieService: CookieService) { }

  connection(email: string, password: string): Promise<any> {
    const url = `${this.url + 'authenticate'}`;
    const data = {email: email, password: password};

    return this.http.post(url, data, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(response => false);
  }

  create(email: string, password: string): Promise<any> {
    const url = `${this.url + 'register'}`;
    const data = {email: email, password: password};

    return this.http.post(url, data, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(response => false);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.getObject('User');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
