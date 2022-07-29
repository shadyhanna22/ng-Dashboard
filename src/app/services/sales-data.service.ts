import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

export class BackEndResult {
  page: any;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private _http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get<BackEndResult>('https://localhost:7242/api/order/' + pageIndex + '/' + pageSize)
    .pipe(map(res => res || null));
  }

  getOrdersByCustomer(n: number) {
    return this._http.get('https://localhost:7242/api/order/bycustomer/' + n)
      .pipe(map(res => res || []));
  }

  getOrdersByState() {
    return this._http.get('https://localhost:7242/api/order/ByProvince')
      .pipe(map(res => res || []));
  }
}
