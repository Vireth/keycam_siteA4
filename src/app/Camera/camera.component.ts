import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {SnackBar} from '../Information/snack-bar';
import { AppComponent } from '../app.component';
import { SocketService } from '../Service/socket.service';
import { KeycamService } from '../Service/keycam.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-camera',
  providers: [SnackBar],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit, OnDestroy {

  private textConnect;
  private askPictureConnect;
  private askSwitch;
  private getPlayedSong;
  private getPlaylist;
  private playlist = {};
  private currentSong = '';
  private songPos = 0;
  messageText = '';
  play = false;
  pause = false;
  stop= false;
  isPlaying = false;

  history = [];

  tiles = [
    {text: 'panel', cols: 1, rows: 3},
    {text: 'lights', cols: 2, rows: 3, color: 'lightgreen'},
    {text: 'options', cols: 1, rows: 1, color: '#DDBDF1'},
    {text: 'history', cols: 1, rows: 5},
    {text: 'blank', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: 'camera', cols: 2, rows: 3},
    {text: 'buttonCamera', cols: 1, rows: 1},
    {text: 'buttonListen', cols: 1, rows: 1},
    {text: 'buttonSpeak', cols: 1, rows: 1},
    {text: 'messageSpeak', cols: 1, rows: 1}
  ];

  constructor(private socketService: SocketService,
              private KeycamService: KeycamService,
              private router: Router,
              private app: AppComponent) {}

  ngOnInit() {
    this.app.connectSocket();
    this.textConnect = this.socketService.getText().subscribe(text => {
      console.log(text);
    });
    this.askPictureConnect = this.socketService.getPicture().subscribe(data => {
      if (data) {
        const image = document.getElementById('pictureviewer')
          .setAttribute('src', 'data:image/png;base64,' + this.arrayBufferToBase64(data));
      }
    });
    this.askSwitch = this.socketService.getSwitchCamera().subscribe(data => {
      console.log(data);
    });
    this.getPlaylist = this.socketService.getPlaylist().subscribe(data => {
      this.playlist = data;
    });
    this.getPlayedSong = this.socketService.getPlayedSong().subscribe(data => {
      console.log(data);
    });
    this.socketService.askPlaylist();
  }

  arrayBufferToBase64( buffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  sendText() {
    if (this.messageText !== '') {
      const historyItem = {
        name: 'Message sent to baby',
        updated: new Date(),
      };
      this.history.push(historyItem);
      this.socketService.sendText(this.messageText);
    }
  }

  askPicture() {
    const historyItem = {
        name: 'Picture asked',
        updated: new Date(),
      };
    this.history.push(historyItem);
    this.socketService.askPicture();
  }

  playSong() {
    this.socketService.playSong({ action : 'play', song : this.songPos});
    this.play = true;
    this.pause = true;
    this.stop = true;
    this.isPlaying = false;
  }

  pauseSong() {
    this.socketService.playSong({ action : 'pause', song : this.songPos});
    this.pause = false;
    this.play = false;
    this.isPlaying = false;
  }

  stopSong() {
    this.socketService.playSong({ action : 'stop', song : this.songPos});
    this.play = false;
    this.pause = false;
    this.stop = false;
    this.isPlaying = false;
  }

  playBefore() {
    this.checkMoveSong();
    this.songPos = this.songPos === 0 ? Object.keys(this.playlist).length - 1 : this.songPos - 1;
    console.log(this.songPos);
    if (this.play) {
      this.socketService.playSong({action : 'play', song : this.songPos}); 
    }
  }

  playNext() {
    this.checkMoveSong();
    this.songPos = this.songPos === (Object.keys(this.playlist).length - 1) ? 0 : this.songPos + 1;
    console.log(this.songPos);
    if (this.isPlaying) {
      this.socketService.playSong({action : 'play', song : this.songPos}); 
    }
  }

  switchCamera() {
    this.socketService.switchCamera();
  }

  checkMoveSong() {
    if (this.isPlaying || !this.pause) {
      this.socketService.playSong({action : 'stop', song : this.songPos});
    }
  }

  getCurrentSong() {
    return this.playlist[this.songPos];
  }

  ngOnDestroy() {
    this.askPictureConnect.unsubscribe();
    this.textConnect.unsubscribe();
    this.askSwitch.unsubscribe();
    this.getPlayedSong.unsubscribe();
    this.getPlaylist.unsubscribe();
  }

}
