import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartData } from 'chart.js';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [23,76,12]}
];

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  // pieChartData: {
  //   labels: ["Customer1, Customer3, Customer3"],
  //   datasets: [{
  //     label: 'idk',
  //     date: [132,894,273],
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)'
  //     ]
  //   }]
  // };
  public pieChartType: ChartType = 'doughnut';

  pieChartData : ChartData = {
    labels: ["Customer1", "Customer2", "Customer3"],
    datasets: [
      {
        data: [320,894,273],
        backgroundColor: ['#b00b1e', '#2f05ff', '#06c923'],
        borderColor: '#282b2e'
      }
    ]
  };

  ngOnInit(): void {
  }

}
