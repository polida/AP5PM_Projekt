import { Component, OnInit } from '@angular/core';
import { StockService } from '../api/stock.service';
import { StockList } from '../model/stock-response';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  stocks: StockList[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stockService.getStockList().subscribe(data => {
      this.stocks.push(data);
    });
  }
}
