export interface SentimentData {
  sentimentData: {
    month1: {
      symbol: string,
      year: number,
      month: string,
      change: number,
      mspr: number
    },
    month2: {
      symbol: string,
      year: number,
      month: string,
      change: number,
      mspr: number
    },    
    month3: {
      symbol: string,
      year: number,
      month: string,
      change: number,
      mspr: number
    }
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
