import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { LINE_CHART_COLORS } from '../../shared/chart.color';
// import { Label, Color } from 'ng2-charts';

// const LINE_SAMPLE_CHART_DATA: any[] = [
//   { data: [23,76,12,53,21,27], label: 'Analysis'},
//   { data: [42,45,23,98,67,20], label: 'Marketing'},
//   { data: [43,54,76,23,76,98], label: 'Forecasting'}
// ];

// const SAMPLE_BARCHART_LABELS: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private salesData:SalesDataService) { }


  result: any;
  recentCustomers: any[];
  allOrders: any[];

  lineChartType: ChartType = 'line';
  lineChartLabels: string[];
  lineChartData : any[];
  lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
    this.salesData.getOrders(1, 100).subscribe(res => {
      this.allOrders = res['page']['data'];
      this.salesData.getOrdersByCustomer(3).subscribe(cus => {
        this.result = cus;
        this.recentCustomers = this.result.map(x => x.name);

        const allChatData = this.recentCustomers.reduce((r,i) => {
          r.push(this.getChartData(this.allOrders, i));
          return r;
        }, []);

        // console.log('all: ',allChatData);
        let dates = allChatData.map(x => x['data']).reduce((r,e) => {
          // console.log('e:', e);
          r.push(e.map(o => new Date(o[0])));
          return r;
        }, []);
        dates = [].concat.apply([], dates);
        // console.log(dates);
        const orderByDates = this.getCustomerOrdersByDate(allChatData, dates);
        console.log(orderByDates);
        this.lineChartLabels = orderByDates['data'][0]['orders'].map(o => o['date']);

        this.lineChartData = [
          { 'data': orderByDates['data'][0]['orders'].map(x => x['total']), 'label': orderByDates['data'][0]['customer'] },
          { 'data': orderByDates['data'][1]['orders'].map(x => x['total']), 'label': orderByDates['data'][1]['customer'] },
          { 'data': orderByDates['data'][2]['orders'].map(x => x['total']), 'label': orderByDates['data'][2]['customer'] }
        ]
      });
    });
  }
  
  getChartData(allOrders: any, name: string): any {
    const customerOrders = allOrders.filter(order => order.customer.name === name);
    // console.log('name:', name, 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r,e) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);

    // console.log('format', formattedOrders);

    return {customer: name, data: formattedOrders};
  }

  getCustomerOrdersByDate(allChatData: any, dates: any) {
    const customer = this.recentCustomers;
    const formattedDates = dates.map(x => this.formateDates(x))
    const DateSet = Array.from(new Set(formattedDates)).sort();
    // console.log(DateSet);

    // define result object to return
    const result = {};
    const dataSet = result['data'] = [];

    customer.reduce((r,e,i) => {
      const customerOrders = [];
      dataSet[i] = {
        customer: e,
        orders: DateSet.reduce((x,y,j) => {
          const obj = {};
          obj['date'] = y;
          obj['total'] = this.getCustomeTotalforDay(y, e);
          customerOrders.push(obj);
          return customerOrders;
        })
      }
      return r;
    },[]);
    return result;
  }

  getCustomeTotalforDay(date: any, customer: string) {
    const res = this.allOrders.filter(o => o.customer.name === customer && this.formateDates(o.placed) === date);

    const result = res.reduce((r,e) => {
      return r + e.total;
    }, 0);
    return result;
  }

  formateDates(dates: Date){
    return moment(dates).endOf('day').format('YY-MM-DD');
  }
}
