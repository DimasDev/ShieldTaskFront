import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {generateCounter, stringToLCD} from '../htmlHelper/htmlGenerator';
import {ConvertService} from '../services/convert.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  counterDiv;
  watchId;
  minDozensValue;
  minValue;
  secDozensValue;
  secValue;
  msDozensValue;
  msValue;

  lowerLimit = 6;
  upperLimit = 10;
  onClass = 'on';
  offClass = 'off';
  delimiterClass = 'on';

  initSubscription: any;
  markSubscription: any;
  resetSubscription: any;

  @ViewChild('container', {static: true}) container;

  constructor(private timerService: ConvertService) {
    this.initSubscription = this.timerService.getInitTimer().subscribe(initTimer => {
      initTimer.start ? this.startTimer() : this.stopTimer();
    });
    this.markSubscription = this.timerService.getMarkTime().subscribe(() => {
      this.timerService.sendTimeMark(this.getNumbersTime());
    });
    this.resetSubscription = this.timerService.getResetTimer().subscribe(() => {
      this.resetTimer();
    });
  }

  ngOnInit() {
    this.timeInit();
    this.counterDiv = generateCounter('counter', 'flex-boxes', 'off', 'on');
    this.container.nativeElement.appendChild(this.counterDiv);
  }

  ngOnDestroy(): void {
    this.initSubscription.unsubscribe();
    this.markSubscription.unsubscribe();
  }

  timeInit() {
    this.minDozensValue = 0;
    this.minValue = 0;
    this.secDozensValue = 0;
    this.secValue = 0;
    this.msDozensValue = 0;
    this.msValue = 0;
  }

  startTimer() {
    this.watchId = setInterval(() => {
      this.msValue++;
      if (this.msValue === this.upperLimit) {
        this.msValue = 0;
        this.msDozensValue++;
        if (this.msDozensValue === 5) {
          this.delimiterClass = 'off';
        }
        if (this.msDozensValue === this.upperLimit) {
          this.delimiterClass = 'on';
          this.msDozensValue = 0;
          this.secValue++;
          if (this.secValue === this.upperLimit) {
            this.secValue = 0;
            this.secDozensValue++;
            if (this.secDozensValue === this.lowerLimit) {
              this.secDozensValue = 0;
              this.minValue++;
              if (this.minValue === this.upperLimit) {
                this.minValue = 0;
                this.minDozensValue++;
                if (this.minDozensValue === this.lowerLimit) {
                  this.minDozensValue = 0;
                }
              }
            }
          }
        }
      }
      stringToLCD(this.counterDiv, this.getNumbersTime(), this.offClass, this.onClass, this.delimiterClass);
    }, 10);
  }

  stopTimer() {
    clearInterval(this.watchId);
  }

  resetTimer() {
    this.stopTimer();
    this.timeInit();
    stringToLCD(this.counterDiv, this.getNumbersTime(), this.offClass, this.onClass, 'off');
  }

  getNumbersTime() {
    return '' + this.minDozensValue + this.minValue + ':' +
      this.secDozensValue + this.secValue + '.' +
      this.msDozensValue + this.msValue;
  }
}
