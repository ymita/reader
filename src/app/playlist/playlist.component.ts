import { SentenceService } from './../services/sentence.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Input() sentences;
  @Input() idInPlay;

  constructor() { }

  ngOnInit() {
  }
}
