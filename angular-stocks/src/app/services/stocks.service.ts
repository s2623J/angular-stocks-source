import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Stock } from './stock';
import { Symbols } from './symbols';
import { Sentiment } from './sentiment';

const finnhub = require('finnhub');

@Injectable()
export class StocksService {

  constructor(private http: HttpClient) {}

  // Generate new finnHub client with useable headers
  getFinnHubClient() {
    var x = finnhub.ApiClient.instance.defaultHeaders;
    x = {};
    finnhub.ApiClient.instance.defaultHeaders = x;
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = environment.FinnhubKey;
    return new finnhub.DefaultApi();
  }

  fetchStockSymbol(symbolName: string): Promise<Stock> {
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

  fetchStockDetails(symbolName: string): Promise<Symbols> {
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

  fetchStockSentiment(symbolName: string): Promise<Sentiment | null> {
    let finnhubClient = this.getFinnHubClient();
    let currMonthDate:string = this.getCurrMonthDate();
    let prevThirdMonthAgo:string = this.getPrevThirdMonthAgo();

    return new Promise((resolve, reject) => {
      finnhubClient.insiderSentiment(symbolName, prevThirdMonthAgo, currMonthDate, 
        (error: Error, data: any, response: Promise<object>) => {
          if (data.data.length > 3) {
            let result1 = data.data.slice(-3);
            let result2 = result1.map((item: any) => {
              item.month = this.getMonth(item.month);
              return item;
            });
            let result3 = {
              month1: result2[0], 
              month2: result2[1],
              month3: result2[2]}
            resolve(result3);
          } else {
            resolve(null);
          }
      })
    })
  }

  getCurrMonthDate(): string {
    const d = new Date();
    return d.getFullYear() + '-' + 
      (Number(d.getMonth()) + 1) + '-01';
  }

  getPrevThirdMonthAgo(): string {
    const d = new Date();
    const curr = d.getTime();
    const e = curr - (3 * 30 * 24 * 60* 60*1000);
    var prevDate = new Date();
    prevDate.setTime(e);
    return prevDate.getFullYear() + '-' + 
      (Number(prevDate.getMonth()) + 1) + '-01';
  }

  getMonth(month: number) {
    var months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    return months[month];
  }
}
