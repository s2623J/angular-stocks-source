import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Stock } from './stock';
import { Symbols } from './symbols';

const finnhub = require('finnhub');

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  // Generate new finnHub client with useable headers
  static getFinnHubClient() {
    var x = finnhub.ApiClient.instance.defaultHeaders;
    x = {};
    finnhub.ApiClient.instance.defaultHeaders = x;
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = environment.FinnhubKey;
    return new finnhub.DefaultApi();
  }

  static fetchStockSymbol(symbolName: string): Promise<Stock> {
    let finnhubClient = this.getFinnHubClient();

    return new Promise((resolve, reject) => {
      finnhubClient.quote(
        symbolName,
        (error: Error, data: Promise<Stock>, response: Promise<object>) => {
          resolve(data)
        }
      )
    })
  }

  static fetchStockDetails(symbolName: string): Promise<Symbols> {
    let finnhubClient = this.getFinnHubClient();

    return new Promise((resolve, reject) => {
      finnhubClient.stockSymbols("US","OTCM", (error: Error, data: Array<Symbols>, response: Promise<object>) => {
        data = data.filter( item => {
          return item.displaySymbol == symbolName
        })
        resolve(data[0])
      })
    })
  }
}
