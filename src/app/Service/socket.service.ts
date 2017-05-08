import { Subject } from 'rxjs/Subject';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://192.168.1.100:4444/';
  private socket;

  constructor(private cookieService: CookieService) {
    const user = this.cookieService.getObject('User');
    this.socket = io(this.url, {query: 'type=parent&token=' + user['token']});
  }

  getPicture() {
    const observable = new Observable(observer => {
      this.socket.on('picture', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('Picture disconnected');

      };
    });
    return observable;
  }

  askPicture() {
    this.socket.emit('picture', 'toto');
  }

  sendText(message) {
    this.socket.emit('text', message);
  }

  getText() {
    const observable = new Observable(observer => {
      this.socket.on('text', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('Text disconnected');
      };
    });
    return observable;
  }

  deconnect() {
    this.socket.disconnect();
  }
}
