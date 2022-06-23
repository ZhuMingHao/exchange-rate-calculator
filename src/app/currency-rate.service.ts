import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

export interface Currency {
  title: string;
  flag: string;
  iso: string;
}

const header = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Credentials', 'true');

@Injectable({
  providedIn: 'root',
})
export class CurrencyRateService {
  constructor(private httpclient: HttpClient) {}

  url: string = '/api/action.php?s=fcr&do=clist&ln=zh-hans';

  getAllCurrencies() {
    return this.httpclient.get<Currency[]>(this.url);
  }

  lastUpdate(from: string, to: string) {
    let url =
      '/api/action.php?s=fcr&iso=' +
      from +
      '-' +
      to +
      '&f=USD&v=1&do=cvals&ln=zh-hans';
      this.httpclient.get<{ updated: number }>(url).subscribe(res=>{console.log(res.updated) })

    return this.httpclient.get<{ updated: number }>(url);
  }

  async getCurrencyRate(from: string, to: string): Promise<number> {
    let url =
      '/api/action.php?s=fcr&iso=' +
      from +
      '-' +
      to +
      '&f=USD&v=1&do=cvals&ln=zh-hans';

    const resultPromise = new Promise<number>((resolve, reject) => {
      this.httpclient.get<any>(url).subscribe(async (res) => {
        let fromrate: number = res[from];
        let torate: number = res[to];
        let rate: number = torate / fromrate;
        resolve(rate);
      });
    });

    return resultPromise;
  }
}
