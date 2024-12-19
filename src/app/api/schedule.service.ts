import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { ScheduleResponse } from '../models/schedule-response';
import { StudentSubjectDetailResponse } from '../models/subject-response';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = 'https://stag-ws.utb.cz/ws/services/rest2/';
  private username: string | null = null;
  private password: string | null = null;
  private osCislo: string | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.username = await this.storage.get('username');
    this.password = await this.storage.get('password');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.username || !this.password) {
      await this.init();
    }
  }

  private async ensureExtendedInitialized(): Promise<void> {
    await this.ensureInitialized();
    if (!this.osCislo) {
      await this.getOsCislo().toPromise();
    }
  }

  getOsCislo(): Observable<string> {
    return from(this.ensureInitialized()).pipe(
      switchMap(() => {
        const url = `${this.corsProxyUrl}${this.apiUrl}users/getOsobniCislaByExternalLogin?login=${this.username}`;
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
          'X-Requested-With': 'XMLHttpRequest'
        });

        return this.http.get<{ osCislo: string[] }>(url, { headers }).pipe(
          map(response => response.osCislo[0]),
          tap(osCislo => {
            this.osCislo = osCislo;
            console.log('OsCislo:', osCislo);
          })
        );
      })
    );
  }

  getSchedule(semestr: string, rok: string): Observable<ScheduleResponse> {
    return from(this.ensureExtendedInitialized()).pipe(
      switchMap(() => {
        const url = `${this.corsProxyUrl}${this.apiUrl}rozvrhy/getRozvrhByStudent?stagUser=${this.osCislo}&semestr=${semestr}&jenRozvrhoveAkce=true&lang=cs&outputFormat=JSON&osCislo=${this.osCislo}&rok=${rok}`;
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
          'X-Requested-With': 'XMLHttpRequest'
        });

        console.log('Request URL:', url);
        console.log('Request Headers:', headers);

        return this.http.get<ScheduleResponse>(url, { headers }).pipe(
          tap(response => console.log('Schedule Response:', response))
        );
      })
    );
  }

  getSubjects(semestr: string, rok: string): Observable<StudentSubjectDetailResponse> {
    return from(this.ensureExtendedInitialized()).pipe(
      switchMap(() => {
        const url = `${this.corsProxyUrl}${this.apiUrl}znamky/getZnamkyByStudent?stagUser=${this.osCislo}&semestr=${semestr}&outputFormat=JSON&osCislo=${this.osCislo}&rok=${rok}`;
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
          'X-Requested-With': 'XMLHttpRequest'
        });

        console.log('Request URL:', url);
        console.log('Request Headers:', headers);

        return this.http.get<StudentSubjectDetailResponse>(url, { headers }).pipe(
          tap(response => console.log('Subjects Response:', response))
        );
      })
    );
  }
}
