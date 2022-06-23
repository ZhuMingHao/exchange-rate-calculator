import { Currency, CurrencyRateService } from './currency-rate.service';
import { Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'exchange-rate-calculator';
  /**
   *
   */
  constructor(private currencyRateService: CurrencyRateService) {}
  currencies = this.currencyRateService.getAllCurrencies();
  rate: number | undefined;
  fromValue: number | undefined;
  toValue: number | undefined;
  toSelect: string;
  fromSelect: string;
  fromCurrency: string = 'USD';
  toCurrency: string = 'CNY';
  lastUpdate = this.currencyRateService.lastUpdate(this.fromCurrency,this.toCurrency);

  async ngOnInit() {
    this.rate = await this.currencyRateService.getCurrencyRate(
      this.fromCurrency,
      this.toCurrency
    );
    console.log(this.rate);
  }

  async selectchange(currency_value) {
    this.rate = await this.currencyRateService.getCurrencyRate(
      this.fromCurrency,
      this.toCurrency
    );
    console.log(this.rate);
  }

  update(event: any) {
    let input = Number(event.target.value);
    this.toValue = input * this.rate;
  }
  to_update(event :any){
    let input = Number(event.target.value);
    this.fromValue = input / this.rate;
    console.log(this.fromValue);
  }
  clearAll(){
this.fromValue=0;
this.toValue = 0;
  }

}
