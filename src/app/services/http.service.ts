import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAPITimeMarks() {
    return this.http.get('http://localhost:8080/timeMarks');
  }

  sendAPITimeMark(timeMark) {
    const body = {time: timeMark};
    return this.http.post('http://localhost:8080/timeMark', body);
  }

  clearAPITimeMarks() {
    return this.http.delete('http://localhost:8080/timeMarks');
  }

  removeAPITimeMark(timeMark) {
    return this.http.delete('http://localhost:8080/timeMark?timeMark=' + timeMark);
  }
}
