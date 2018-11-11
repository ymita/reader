import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Word } from './word';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {
  idInPlay = 1;//start from 1 since the first item in the wordList starts from id:1
  message: SpeechSynthesisUtterance;
  wordList: Word[];

  constructor(private http: Http) {
    this.initMessage();
  }

  initMessage() {
    this.message = new SpeechSynthesisUtterance();
    this.message.lang = 'en-US';
  }

  words: Subject<Word[]> = new Subject<Word[]>();
  wordsState = this.words.asObservable();
  getCurrentData(): Observable<Word[]> {
    return this.wordsState;
  }

  getData() {
    this.http.get('https://localhost:5001/api/words').subscribe(res => {
      //this.http.get('https://ym.azurewebsites.net/api/words').subscribe(res => {
      this.wordList = JSON.parse(res.text());
      this.words.next(this.wordList);
    });
  }


  wordSubject: Subject<Word> = new Subject<Word>();
  idState = this.wordSubject.asObservable();

  getCurrentSentence(): Observable<Word> {
    return this.idState;
  }

  play() {

    const word = this.wordList.find(word => word.id == this.idInPlay);
    this.wordSubject.next(word);
    this.message.text = word.text;

    this.message.onend = (e) => {

      const isStillPlayig = this.wordList.find(word => word.id > this.idInPlay);

      if (isStillPlayig) {
        this.idInPlay++;
        this.play();
      }
    };

    speechSynthesis.speak(this.message);
  }

  pause() {
    speechSynthesis.pause();
  }

  resume() {
    speechSynthesis.resume();
  }

  addWord(word: Word) {
    debugger;
    let value = {
      // id: 7,
      spelling: word.spelling,
      meaning: word.meaning,
      text: word.text
    };
    this.http.post(
      'https://localhost:5001/api/words',
      value).subscribe(res => {
        //this.http.get('https://ym.azurewebsites.net/api/words').subscribe(res => {
        debugger;
        this.wordList.push(JSON.parse(res.text()));
        this.words.next(this.wordList);
      });
  }
}
