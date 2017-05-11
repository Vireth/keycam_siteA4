import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent {
  playlists = [];

  constructor() {}

  set_playlist(playlist) {
    for (let i = 0; i < playlist.length; i++) {
      this.playlists.push(playlist[i]);
    }
    console.log('TEST', this.playlists);
  }
}
