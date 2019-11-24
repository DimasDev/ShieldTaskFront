import {Component, OnInit} from '@angular/core';
import {generateCounter, stringToLCD} from '../htmlHelper/htmlGenerator';
import {ConvertService} from '../services/convert.service';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  counterClass = 'counter-in-list';
  flexBoxesClass = 'flex-boxes-in-list';
  offClass = 'off-in-list';
  onClass = 'on-in-list';
  list;
  timeItem;
  button;

  timeMarkSubscription: any;
  resetSubscription: any;

  constructor(private timerService: ConvertService, private apiService: HttpService) {
    this.timeMarkSubscription = this.timerService.receiveTimeMark().subscribe(timeMark => {
      this.apiService.sendAPITimeMark(timeMark).subscribe();
      this.addTimeMark(timeMark);
    }, error => {
      console.log(error);
    });
    this.resetSubscription = this.timerService.getResetTimer().subscribe(() => {
      this.clearTimeMarks();
    });
  }

  ngOnInit() {
    this.button = this.createButtonRemove();
    this.apiService.getAPITimeMarks().subscribe((timeMarks: any) => {
        timeMarks.forEach(timeMark => {
          this.addTimeMark(timeMark.time);
        });
      },
      error => {
        console.log(error);
      });
  }

  addTimeMark(timeMark) {
    this.list = document.querySelector('.timesList');
    this.timeItem = document.createElement('div');
    this.timeItem.classList.add('timeItem');
    this.timeItem.timeMark = timeMark;
    this.timeItem.appendChild(stringToLCD(generateCounter(this.counterClass, this.flexBoxesClass,
      this.offClass, this.onClass), timeMark, this.offClass, this.onClass, this.onClass));
    this.list.appendChild(this.timeItem);
    this.timeItem.addEventListener('mouseenter',
      () => {
        const target: any = event.target;
        if (target.classList.contains('timeItem')) {
          target.appendChild(this.button);
        }
      });
    this.timeItem.addEventListener('mouseleave',
      () => {
        const target: any = event.target;
        if (target.classList.contains('timeItem')) {
          target.removeChild(this.button);
        }
      });
  }

  createButtonRemove() {
    this.button = document.createElement('div');
    this.button.innerText = 'REMOVE';
    this.button.classList.add('btn-remove');
    this.button.addEventListener('click',
      () => {
        const btnTarget: any = event.target;
        const parent = btnTarget.parentNode;
        this.apiService.removeAPITimeMark(parent.timeMark).subscribe();
        parent.parentNode.removeChild(parent);
      });
    return this.button;
  }

  clearTimeMarks() {
    this.apiService.clearAPITimeMarks().subscribe();
    while (this.list.childElementCount > 0) {
      this.list.removeChild(this.list.childNodes[0]);
    }
  }
}
