import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentimentRoutingModule } from './sentiment-routing.module';
import { SentimentComponent } from './sentiment.component';


@NgModule({
  declarations: [
    SentimentComponent
  ],
  imports: [
    CommonModule,
    SentimentRoutingModule
  ]
})
export class SentimentModule { }
