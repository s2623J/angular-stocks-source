import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockData } from '../services/stock-data';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() stockItem?: StockData;
  @Output() onDelete: EventEmitter<string>;
  closeID = '';
  sentimentID = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.onDelete = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.closeID = 'remove' + 
      this.stockItem?.symbolData.displaySymbol;
    this.sentimentID = 'sentiment' + 
      this.stockItem?.symbolData.displaySymbol;
  }

  removePanel():void {
    this.onDelete.emit();
  }
}
