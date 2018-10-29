import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {

  @Output() play:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() resume:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() pause:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {
  }
  startButtonClick() {
    this.play.emit();
  }
  resumeButtonClick() {
    this.resume.emit();
  }
  pauseButtonClick() {
    this.pause.emit();
  }
}
