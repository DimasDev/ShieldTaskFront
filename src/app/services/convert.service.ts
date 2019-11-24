import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  private initTimerSubject = new Subject<any>();
  private resetTimerSubject = new Subject<any>();
  private getMarkSubject = new Subject<any>();
  private sendMarkSubject = new Subject<any>();

  constructor() {
  }

  initTimer(message: boolean): void {
    this.initTimerSubject.next({start: message});
  }

  getInitTimer(): Observable<any> {
    return this.initTimerSubject.asObservable();
  }

  markTime(): void {
    this.getMarkSubject.next();
  }

  getMarkTime(): Observable<any> {
    return this.getMarkSubject.asObservable();
  }

  sendTimeMark(timeMark: string): void {
    this.sendMarkSubject.next(timeMark);
  }

  receiveTimeMark(): Observable<any> {
    return this.sendMarkSubject.asObservable();
  }

  resetTimer(): void {
    this.resetTimerSubject.next();
  }

  getResetTimer(): Observable<any> {
    return this.resetTimerSubject.asObservable();
  }
}
