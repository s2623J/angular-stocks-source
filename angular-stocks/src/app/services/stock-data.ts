export interface StockData {
    quoteData: {
      c: number;
      d: number;
      dp: number;
      h: number;
      l: number;
      o: number;
      pc: number;
  },
    symbolData: {
      currency: string;
      description: string;
      displaySymbol: string;
      figi: string;
      mic: string;
      symbol: string;
      type: string;
  }
}
