import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { SentimentData } from '../services/sentiment-data';
import { StocksService } from '../services/stocks.service';
import { Symbols } from '../services/symbols';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})

export class SentimentComponent implements OnInit {
  eventId = '';
  symbolID = '';
  isReady = false;
  sentimentData: SentimentData = {
    sentimentData: {
      month1: {
        symbol: '',
        year: 0,
        month: '',
        change: 0,
        mspr: 0
      },
      month2:  {
        symbol: '',
        year: 0,
        month: '',
        change: 0,
        mspr: 0
      },    
      month3: {
        symbol: '',
        year: 0,
        month: '',
        change: 0,
        mspr: 0
      }
    },
    symbolData: {
      currency: '',
      description: '',
      displaySymbol: '',
      figi: '',
      mic: '',
      symbol: '',
      type: ''
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private stocksService: StocksService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.symbolID = params['id'];
    this.fetchSentiment(this.symbolID);

    const data: string | null = localStorage.getItem('sentimentData');
    if (data) {
      this.sentimentData = JSON.parse(data);
    }
  }

  fetchSentiment(name: string) {
    const p1 = this.stocksService.fetchStockSentiment(name).then((res) => {
      return res;
    })
    const p2 = this.stocksService.fetchStockDetails(name).then((res: Symbols) => {
      return res;
    })

    Promise.all([p1, p2]).then((values) => {
      this.sentimentData.sentimentData = values[0];
      this.sentimentData.symbolData = values[1];
      this.isReady = true;
      localStorage.setItem('sentimentData', JSON.stringify(this.sentimentData));
    })
  }
}
