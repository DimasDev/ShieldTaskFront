import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAPITimeMarks() {
    // return this.http.get('http://localhost:8080/timeMarks');
    return this.http.get('https://shield-task-back.herokuapp.com/timeMarks');
  }

  sendAPITimeMark(timeMark) {
    const body = {time: timeMark};
    return this.http.post('https://shield-task-back.herokuapp.com/timeMark', body);
  }

  clearAPITimeMarks() {
    return this.http.delete('https://shield-task-back.herokuapp.com/timeMarks');
  }

  removeAPITimeMark(timeMark) {
    return this.http.delete('https://shield-task-back.herokuapp.com/timeMark?timeMark=' + timeMark);
  }
}
