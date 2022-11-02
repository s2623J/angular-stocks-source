import { Component, OnInit } from '@angular/core';
import { Stock } from '../services/stock';
import { StocksService } from '../services/stocks.service';
import { Symbols } from '../services/symbols';
import { StockData } from '../services/stock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  symbolName: string = '';
  quoteData?: Stock;
  symbolData?: Symbols;
  stockData?: Array<StockData> = [];

  constructor() {}

  ngOnInit(): void {}

  // Fetch and combine multiple data sets for each Stock
  fetchSymbol(name: string) {
    const p1 = StocksService.fetchStockSymbol(name).then((res: Stock) => {
      return res;
    })
    const p2 = StocksService.fetchStockDetails(name).then((res: Symbols) => {
      return res;
    })

    Promise.all([p1, p2]).then((values) => {
      let result: StockData = {
        quoteData: values[0],
        symbolData: values[1]
      }
      this.stockData?.push(result);
      console.log(this.stockData);
    })
  }
}
