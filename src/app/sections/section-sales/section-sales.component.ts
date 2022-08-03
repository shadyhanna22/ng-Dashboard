import { Component, OnInit } from '@angular/core';
import { DailyTotalResult, SalesDataService } from "../../services/sales-data.service";


@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByProvince: any;

  constructor(private salesData: SalesDataService) { }

  ngOnInit(): void {
    this.salesData.getOrdersByProvince()
      .subscribe(res => {
        this.salesDataByProvince = res;
    });

    this.salesData.getOrdersByCustomer(5)
      .subscribe(res => {
        this.salesDataByCustomer = res;
    });
  }

}
