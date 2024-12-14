import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScheduleResponse } from '../models/schedule-response';
import { StudentSubjectDetailResponse } from '../models/subject-response';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = 'https://stag-ws.utb.cz/ws/services/rest2/';


  constructor(private http: HttpClient, private storage: Storage ) {}


  getSchedule(osCislo:string, semestr:string, rok:string ): Observable<ScheduleResponse> {
    const url = `${this.corsProxyUrl}${this.apiUrl}rozvrhy/getRozvrhByStudent??stagUser=${osCislo}&semestr=${semestr}&jenRozvrhoveAkce=true&lang=cs&outputFormat=JSON&osCislo=${osCislo}&rok=${rok}`;

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
      'X-Requested-With': 'XMLHttpRequest'
    });

    console.log('Request URL:', url);
    console.log('Request Headers:', headers);

    return this.http.get<ScheduleResponse>(url, { headers }).pipe(
      tap(
        response => {
          console.log('Response:', response);
        },
        error => console.error('Error:', error)
      )
    );
  }
  getsubjects(osCislo:string, semestr:string, rok:string ): Observable<StudentSubjectDetailResponse> {
    const url = `${this.corsProxyUrl}${this.apiUrl}znamky/getZnamkyByStudent?stagUser=${osCislo}&semestr=${semestr}&outputFormat=JSON&osCislo=${osCislo}&rok=${rok}`;
    const username = "d_polisensky";
    const password = "Dreft15dreft15";
  
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'X-Requested-With': 'XMLHttpRequest'
    });

    console.log('Request URL:', url);
    console.log('Request Headers:', headers);

    return this.http.get<StudentSubjectDetailResponse>(url, { headers }).pipe(
      tap(
        response => {
          console.log('Response:', response);
        },
        error => console.error('Error:', error)
      )
    );
  }
}