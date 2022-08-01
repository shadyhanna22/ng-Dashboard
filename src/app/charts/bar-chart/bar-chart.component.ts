import { Component, OnInit } from '@angular/core';
import { DailyTotalResult, SalesDataService } from "../../services/sales-data.service";
import * as moment from 'moment';
import { Order } from 'src/app/shared/order';

// const SAMPLE_BARCHART_DATA: any[] = [
//   { data: [23,76,12,53,21,27,62], label: 'Q1 Sales'},
//   { data: [42,45,23,98,21,27,42], label: 'Q2 Sales'}
// ];

// const SAMPLE_BARCHART_LABELS: string[] = ['W1','W2','W3','W4','W5','W6','W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private salesData:SalesDataService) { }

  orders: DailyTotalResult[];
  orderLabels: string[];
  orderData: number[];

  public barChartData: any[];
  public ChartData: number[] = []
  public barChartLabels: string[] = [];
  public barChartLegend = true;
  public barChartType = 'bar';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit(): void {
    this.salesData.getOrdersByDailyTotal(7)
      .subscribe( res => {
        this.orders = res;
        this.orders.forEach(e => {
            this.ChartData.push(e.total);
            this.barChartLabels.push(e.placed);
        });
        console.log(this.barChartLabels);
        console.log(this.barChartData);

        this.barChartLabels = this.barChartLabels.reverse();
        this.barChartData = [{'data':this.ChartData, 'label': 'Sales'}]
        
        // this.barChartLabels = res['placed'];
        // console.log(this.barChartLabels);
        // const localChartData = this.getChartData(res);
      });
  }

  // getChartData(res: BackEndResult) {
  //   this.orders = res['page']['data'];
  //   const data = this.orders.map(o => o.total);
  //   const label = this.orders.map(o => moment(new Date(o.placed)).format('YY-MM-DD'));
  //   const entries: [Object, number][] = [];

  //   const formattedOrders = this.orders.reduce((c, v) => { 
  //     c.push([moment(v.placed).format('YY-MM-DD'), v.total]);
  //     return c;
  //   },entries);

  //   console.log(formattedOrders);
  // }

}
