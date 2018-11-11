import { DialogComponent } from './../dialog/dialog.component';
import { Word } from './../services/word';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SentenceService } from '../services/sentence.service';
import { MatDialog } from '@angular/material';

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
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    // sentenceService.getData() 呼び出し後にデータを受け取る
    const sub = this.sentenceService.getCurrentData();
    sub.subscribe((_words: Word[]) => {
      this.sentences = _words;
    });

    this.sentenceService.getData();

    const subscription = this.sentenceService.getCurrentSentence();
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

  addWord() {
    // this.sentenceService.addWord();
  }

  edit() {
    alert('edit');
  }
  add() {
    const dialogRef = this.dialog.open(DialogComponent,
      {
        data: {
          // data can be selected word item when in edit mode.
        },
        width: '450px'
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      debugger;
      this.sentenceService.addWord(result);
    });
  }
}
