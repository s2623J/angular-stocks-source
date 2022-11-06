import { Component, OnInit, ViewChild } from '@angular/core';
import { Stock } from '../services/stock';
import { StocksService } from '../services/stocks.service';
import { Symbols } from '../services/symbols';
import { StockData } from '../services/stock-data';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  symbolName: string = '';
  quoteData?: Stock;
  symbolData?: Symbols;
  stockData: Array<StockData> = [];

  constructor(
    private stocksService: StocksService, 
    private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    const data: string | null = localStorage.getItem('stockData');
    if (data) {
      this.stockData = JSON.parse(data);
    }
  }

  // Fetch and combine multiple data sets for each Stock
  fetchSymbol(name: string) {
    const p1 = this.stocksService.fetchStockSymbol(name).then((res: Stock) => {
      return res;
    })
    const p2 = this.stocksService.fetchStockDetails(name).then((res: Symbols) => {
      return res;
    })

    Promise.all([p1, p2]).then((values) => {
      let result: StockData = {
        quoteData: values[0],
        symbolData: values[1]
      }
      this.stockData?.push(result);
      localStorage.setItem('stockData', JSON.stringify(this.stockData));
    })
  }

  removeStockDetails(index: number) {
    this.stockData.splice(index, 1);
    localStorage.setItem('stockData', JSON.stringify(this.stockData));
  }
}
