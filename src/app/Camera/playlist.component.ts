import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent {
  playlists;

  constructor() {}

  set_playlist(playlist) {
    this.playlists = playlist;
    console.log('playlist', this.playlists.length);
  }
}
