import { Subject } from 'rxjs/Subject';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://192.168.1.101:4444';
  private socket;
  private user;
  public connected = false;

  constructor(private cookieService: CookieService) {
    this.user = this.cookieService.getObject('User');
  }

  connect() {
    if (!this.connected) {
      this.socket = io(this.url, {query: 'type=parent&token=' + this.user['token']});
      this.connected = true;
    }
  }

  getBabyState() {
    const observable = new Observable(observer => {
      this.socket.on('babyState', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('babyState disconnected');
      };
    });
    return observable;
  }

  getBattery() {
    const observable = new Observable(observer => {
      this.socket.on('battery', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('battery disconnected');
      };
    });
    return observable;
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
    this.socket.emit('picture', this.getDataObject('picture', 'test'));
  }

  sendText(message) {
    if (message.length > 0) {
      this.socket.emit('text', this.getDataObject('text', message));
    }
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

  switchCamera() {
    this.socket.emit('switch', this.getDataObject('switch', 'test'));
  }

  getSwitchCamera() {
    const observable = new Observable(observer => {
      this.socket.on('switch', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('picture switch disconnected');
      };
    });
    return observable;
  }

  playSong(data: any) {
    this.socket.emit('player', this.getDataObject('player', data));
  }

  getPlayedSong() {
    const observable = new Observable(observer => {
      this.socket.on('player', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('player disconnected');
      };
    });
    return observable;
  }

  getPlaylist() {
    const observable = new Observable(observer => {
      this.socket.on('playlist', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('playlist disconnected');
      };
    });
    return observable;
  }

  askPlaylist() {
    this.socket.emit('playlist', {type: 'playlist', data: 'lel'});
  }

  getDataObject(event: string, data: any) : any {
    return { type: event, data: data };
  }

  deconnect() {
    if (this.connected) {
      this.socket.disconnect();
      this.connected = false;
    }
  }
}
