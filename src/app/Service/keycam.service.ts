import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class KeycamService {
  private url = 'http://163.5.84.197:3000/api/'; // 'http://192.168.1.102:3333/api/'
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
