import { Component, OnInit } from '@angular/core';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [23,76,12,53,21,27,62], label: 'Q1 Sales'},
  { data: [42,45,23,98,21,27,42], label: 'Q2 Sales'}
];

const SAMPLE_BARCHART_LABELS: string[] = ['W1','W2','W3','W4','W5','W6','W7'];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartLegend = false;
  public barChartType = 'bar';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  ngOnInit(): void {
  }

}
