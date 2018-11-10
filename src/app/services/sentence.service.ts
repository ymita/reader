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
  
  // wordList: Word[] = [
  //   {
  //     id: 1,
  //     spelling: "ameliorate",
  //     meaning: "改善する",
  //     text: "They offered some compromises in an effort to ameliorate the situation."
  //   },
  //   {
  //     id: 2,
  //     spelling: "atrophy",
  //     meaning: "萎縮",
  //     text: "Atrophy is the partial or complete wasting away of a part of the body."
  //   },
  //   {
  //     id: 3,
  //     spelling: "precinct",
  //     meaning: "選挙区、境界",
  //     text: "A precinct is a space enclosed by the walls or other boundaries of a particular place or building, or by an arbitrary and imaginary line drawn around it."
  //   },
  //   {
  //     id: 4,
  //     spelling: "allay",
  //     meaning: "静める、和らげる",
  //     text: "Usually you can allay the negativity by providing (or asking members to provide) clear and concise instructions and documentation."
  //   },
  //   {
  //     id: 5,
  //     spelling: "endemic",
  //     meaning: "特有の、土着の",
  //     text: "This isn't a platform thing, it's a problem that is endemic to the web."
  //   },
  //   {
  //     id: 6,
  //     spelling: "hydrolysis",
  //     meaning: "加水分解",
  //     text: "Usually hydrolysis is a chemical process in which a molecule of water is added to a substance. Sometimes this addition causes both substance and water molecule to split into two parts."
  //   },
  //   {
  //     id: 7,
  //     spelling: "debacle",
  //     meaning: "総崩れ、大失敗",
  //     text: "These include the White House’s U.S. Digital Service 18F taskforce, launched in response to the healthcare.gov debacle."
  //   },
  //   {
  //     id: 8,
  //     spelling: "opulent",
  //     meaning: "贅沢な、豊富な",
  //     text: "She was also known for her opulent lifestyle."
  //   },
  //   {
  //     id: 9,
  //     spelling: "stout",
  //     meaning: "丈夫な、頑丈な",
  //     text: "Campers prefer stout vessels, sticks and cloth."
  //   },
  //   {
  //     id: 10,
  //     spelling: "circumvent",
  //     meaning: "回避する",
  //     text: "If the destination server filters content based on the origin of the request, the use of a proxy can circumvent this filter."
  //   },
  //   {
  //     id: 11,
  //     spelling: "circumvent",
  //     meaning: "回避する",
  //     text: "The concept of a weak reference was developed to circumvent these situations in Perl 5."
  //   },
  //   {
  //     id: 12,
  //     spelling: "boulder",
  //     meaning: "大きな石",
  //     text: "In geology, a boulder is a rock fragment with size greater than 25.6 centimetres (10.1 in) in diameter."
  //   },
  //   {
  //     id: 13,
  //     spelling: "scour",
  //     meaning: "(不要なものを)取り除く、こすって洗う",
  //     text: "We scoured the web for some of this week's most interesting open source-related news stories so you don't have to."
  //   }

  // ];

  constructor(private http: Http) {
    this.initMessage();
   }

  initMessage() {
    this.message = new SpeechSynthesisUtterance();
    this.message.lang = 'en-US';
  }

  getData() {
    this.http.get('https://localhost:5001/api/words').subscribe(res => {
      this.wordList = JSON.parse(res.text());
      this.words.next(this.wordList);
    });
  }

  words: Subject<Word[]> = new Subject<Word[]>();
  wordsState = this.words.asObservable();
  getCurrentData(): Observable<Word[]> {
    return this.wordsState;
  }

  wordSubject :Subject<Word> = new Subject<Word>();
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
      
      if(isStillPlayig){
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
}
