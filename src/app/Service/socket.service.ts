import { Subject } from 'rxjs/Subject';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:4444/';
  private socket;

  constructor(private cookieService: CookieService) {
    const user = this.cookieService.getObject('User');
    console.log(user);
    //this.socket = io('http://localhost:4444/', {query: "type=parent&token=" + ""});
  }

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
