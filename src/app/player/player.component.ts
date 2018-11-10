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
    // const sub = this.sentenceService.getDataSubscription();
    // sub.subscribe(res => {
    //   debugger;
    //   console.log(JSON.parse(res.text()));
    //   this.sentences = JSON.parse(res.text());
    // });
    // this.sentenceService.initData().subscribe(res => {
    //   console.log(res);
    //   this.sentences = JSON.parse(res.text());
    // })
    const sub = this.sentenceService.getCurrentData();
    sub.subscribe((_words: Word[]) => {
      this.sentences = _words;
    });

    this.sentenceService.getData();

    let subscription = this.sentenceService.getCurrentSentence();
    subscription.subscribe((_word: Word) => {
      // console.log(_id);
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
