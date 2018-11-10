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
  spelling: string = '';
  separator: string = ' : ';
  
  constructor(
    private sentenceService: SentenceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    const sub = this.sentenceService.getCurrentData();
    sub.subscribe((_words: Word[]) => {
      this.sentences = _words;
    });

    this.sentenceService.getData();

    let subscription = this.sentenceService.getCurrentSentence();
    subscription.subscribe((_word: Word) => {
      this.id = _word.id;
      this.meaning = _word.meaning;
      this.spelling = _word.spelling;
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
