import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../services/stock';
import { StockData } from '../services/stock-data';
import { Symbols } from '../services/symbols';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() stockItem?: StockData;

  constructor() { }

  ngOnInit(): void {
  }

}
