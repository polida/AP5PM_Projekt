// src/app/services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { StockList } from '../model/stock-response';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}
  
  getStockList(): Observable<StockList> {
    return this.http.get<any>(`${environment.apiUrl}/available-traded/list?apikey=${environment.apiKey}`);
  }
  
}
