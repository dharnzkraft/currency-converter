import { Component } from '@angular/core';
import { ConversionService } from '../services/conversion.service';
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  freecurrencyapi = new Freecurrencyapi('fca_live_DUxEjzpVKUIvbAqxOixKXtgFaF1NMxZlhdVvTr52');
  currencies: any;
  baseCurrency: any;
  currency: any;
  latestResp: any;
  public current_date=new Date();
  dayDate: string;
  filteredRate: number | undefined ;

  constructor(
    private convService: ConversionService
  ) {
    this.getCurrencies();
    this.dayDate = formatDate(this.current_date,'yyyy-MM-dd',"en-US");
    this.getHistory()
  }

  getCurrencies(): Observable<any> {
    return this.convService.getCurrencies().then((response: any) => {
      console.log(response);
      this.currencies = Object.values(response.data);

    }, (error: any) => {
      console.log(error);
    });
  }

  selectBaseCurrency(e: any){
    this.baseCurrency = e.target.value;
    console.log(this.baseCurrency)
  }

  selectCurrency(e: any){
    this.currency = e.target.value;
    console.log(this.currency)
  }

  getLatestRate(){
    this.convService.getLatest('USD', this.currency).then((response: any)=>{
      console.log(response);
      this.latestResp = response.data;
      this.filteredRate = this.latestResp[this.currency];
      console.log(this.filteredRate);
      localStorage.setItem(this.currency, JSON.stringify(this.filteredRate))
      
    },(error: any)=>{
      console.log(error)
    })
  }


  getHistory(){
    this.convService.getHistoricalExchanges(2021-12-31, this.dayDate).then((response: any)=>{
      console.log(response)
    })
  }
}
