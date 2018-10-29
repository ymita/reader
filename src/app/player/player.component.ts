import { Word } from './../services/word';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SentenceService } from '../services/sentence.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  sentences;
  id;
  meaning: string = '';
  
  constructor(
    private sentenceService: SentenceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sentences = this.sentenceService.getData();

    let subscription = this.sentenceService.getCurrentSentence();
    subscription.subscribe((_word: Word) => {
      // console.log(_id);
      this.id = _word.id;
      this.meaning = _word.meaning;
      this.changeDetectorRef.detectChanges();
    });
  }

  play() {
    this.sentenceService.play();
  }

  resume() {
    this.sentenceService.resume();
  }

  pause() {
    this.sentenceService.pause();
  }
}
