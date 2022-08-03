import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

export class getOrdersResult {
  page: any;
  totalPages: number;
}

export class DailyTotalResult {
  placed: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this.http.get<getOrdersResult>('https://localhost:7242/api/order/' + pageIndex + '/' + pageSize)
    .pipe(map(res => res || null));
  }

  getOrdersByDailyTotal(numOfOrders: number) {
    return this.http.get<DailyTotalResult[]>('https://localhost:7242/api/order/totalday/' + numOfOrders)
    .pipe(map(res => res || null));
  }

  getOrdersByCustomer(n: number) {
    return this.http.get('https://localhost:7242/api/order/bycustomer/' + n)
      .pipe(map(res => res || []));
  }

  getOrdersByProvince() {
    return this.http.get('https://localhost:7242/api/order/ByProvince')
      .pipe(map(res => res || []));
  }
}
