import {Component, OnInit, ViewChild} from '@angular/core';
import {ConvertService} from '../services/convert.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  isRunning;

  @ViewChild('icon', {static: false}) icon;
  @ViewChild('text', {static: false}) text;

  constructor(private timerService: ConvertService) {
  }

  ngOnInit() {
    this.isRunning = false;
  }

  run() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
    this.timerService.initTimer(this.isRunning);
  }

  startTimer() {
    this.icon.nativeElement.classList.remove('fa-play');
    this.icon.nativeElement.classList.add('fa-pause');
    this.text.nativeElement.innerText = 'Pause';
    this.isRunning = !this.isRunning;
  }

  stopTimer() {
    this.icon.nativeElement.classList.add('fa-play');
    this.icon.nativeElement.classList.remove('fa-pause');
    this.text.nativeElement.innerText = 'Play';
    this.isRunning = !this.isRunning;
  }

  mark() {
    this.timerService.markTime();
  }

  reset() {
    this.stopTimer();
    this.timerService.resetTimer();
  }
}
