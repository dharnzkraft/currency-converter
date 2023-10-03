import { Injectable } from '@angular/core';
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
   freecurrencyapi = new Freecurrencyapi('fca_live_4sBXwY6xFqPbvWfiXJBNbfL6KyMmucaelGWeDiCO');
  //  https://api.currencyapi.com/v3/historical?apikey=fca_live_DUxEjzpVKUIvbAqxOixKXtgFaF1NMxZlhdVvTr52&currencies=EUR%2CUSD%2CCAD&date=2023-10-01

  constructor() { }


  getCurrencies(){
    return this.freecurrencyapi.currencies()
  }

  getLatest(base_currency: any, currency: any){
    return this.freecurrencyapi.latest(base_currency, currency)
  }

  getHistoricalExchanges(date_from: any, date_to: any){
    return this.freecurrencyapi.historical(date_from, date_to)
    
  }
}
