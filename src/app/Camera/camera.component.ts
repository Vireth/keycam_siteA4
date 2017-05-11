import {Component, OnInit, OnDestroy} from '@angular/core';
import {SnackBar} from '../Information/snack-bar';
import { AppComponent } from '../app.component';
import { SocketService } from '../Service/socket.service';
import {PlaylistComponent} from './playlist.component';
import {MdDialog} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-camera',
  providers: [SnackBar, PlaylistComponent],
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
  private songPos = 0;
  dialogRefPlaylist;
  messageText = '';
  play = false;
  pause = false;
  stop= false;
  isPlaying = false;
  isPaused = false;
  isStopped = true;

  history = [];

  tiles = [
    {text: 'lights', cols: 2, rows: 1},
    {text: 'panel', cols: 1, rows: 3},
    {text: 'history', cols: 1, rows: 6},
    {text: 'camera', cols: 2, rows: 6},
    {text: 'blank', cols: 1, rows: 1},
    {text: 'buttonCamera', cols: 1, rows: 1},
    {text: 'buttonListen', cols: 1, rows: 1},
    {text: 'buttonSpeak', cols: 1, rows: 1},
    {text: 'messageSpeak', cols: 1, rows: 1}
  ];

  constructor(private socketService: SocketService,
              public dialog: MdDialog,
              private app: AppComponent,
              private snack: SnackBar,
              private  Plist: PlaylistComponent) {}

  ngOnInit() {
    this.app.connectSocket();
    this.textConnect = this.socketService.getText().subscribe(text => {
      if (text) {
        const historyItem = {
          name: 'Get Text',
          updated: new Date(),
        };
        this.Mypush(historyItem);
      }
    });
    this.askPictureConnect = this.socketService.getPicture().subscribe(data => {
      if (data) {
        const historyItem = {
          name: 'Receive Photo',
          updated: new Date(),
        };
        this.Mypush(historyItem);
        const image = document.getElementById('pictureviewer')
          .setAttribute('src', 'data:image/png;base64,' + this.arrayBufferToBase64(data));
      }
    });
    this.askSwitch = this.socketService.getSwitchCamera().subscribe(data => {
      if (data) {
        const historyItem = {
          name: 'Switch Photo',
          updated: new Date(),
        };
        this.Mypush(historyItem);
      }
    });
    this.getPlaylist = this.socketService.getPlaylist().subscribe(data => {
      this.playlist = data;
      this.Plist.set_playlist(data);
      if (data) {
        const historyItem = {
          name: 'Playlist load',
          updated: new Date(),
        };
        this.Mypush(historyItem);
      }
    });
    this.getPlayedSong = this.socketService.getPlayedSong().subscribe(data => {
      if (data) {
        const historyItem = {
          name: 'Played Song',
          updated: new Date(),
        };
        this.Mypush(historyItem);
      }
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
      this.Mypush(historyItem);
      this.socketService.sendText(this.messageText);
    }
  }

  askPicture() {
    const historyItem = {
        name: 'Picture asked',
        updated: new Date(),
      };
    this.Mypush(historyItem);
    this.socketService.askPicture();
  }

  playSong() {
    this.socketService.playSong({ action : 'play', song : this.songPos});
    this.play = true;
    this.pause = true;
    this.stop = true;
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = false;
  }

  pauseSong() {
    this.socketService.playSong({ action : 'pause', song : this.songPos});
    this.pause = false;
    this.play = false;
    this.isPlaying = false;
    this.isPaused = true;
    this.isStopped = false;
  }

  stopSong() {
    this.socketService.playSong({ action : 'stop', song : this.songPos});
    this.play = false;
    this.pause = false;
    this.stop = false;
    this.isPlaying = false;
    this.isPaused = false;
    this.isStopped = true;
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
    if (this.isPlaying || this.isPaused) {
      this.socketService.playSong({action : 'stop', song : this.songPos});
    }
  }

  getCurrentSong() {
    return this.playlist[this.songPos];
  }

  openPlaylist() {
    if (Object.keys(this.playlist).length !== 0) {
      this.dialogRefPlaylist = this.dialog.open(PlaylistComponent);
    } else {
      this.snack.open('PLAYLIST NOT FOUND');
    }
  }

  Mypush(historyItem) {
    if (this.history.length === 6) {
      this.history.shift();
    }
    this.history.push(historyItem);
  }

  ngOnDestroy() {
    this.askPictureConnect.unsubscribe();
    this.textConnect.unsubscribe();
    this.askSwitch.unsubscribe();
    this.getPlayedSong.unsubscribe();
    this.getPlaylist.unsubscribe();
  }
}
