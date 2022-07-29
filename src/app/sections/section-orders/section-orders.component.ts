import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order } from "../../shared/order";
@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _salesDate: SalesDataService) { }

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._salesDate.getOrders(this.page, this.limit)
      .subscribe(res => {
        if (res != null){
          console.log('Result from getOrders: ', res);
          // console.log(res["page"]["data"][0])
          this.orders = res['page']['data'];
          this.total = res['page'].total;
          this.loading = false;
        } else {
          // Handle Null
        }
      });
  }

  goToPrevious(): void{
    // console.log('Previous Button Clicked!')
    this.page--;
    this.getOrders();
  }
  goToNext(): void{
    // console.log('Next Button Clicked!')
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
}
