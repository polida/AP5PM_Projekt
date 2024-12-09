import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = `${environment.apiurl}/stocks`;

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock> {
    return this.http.get<Stock>(this.apiUrl);
  }
}