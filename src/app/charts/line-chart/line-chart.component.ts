import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { LINE_CHART_COLORS } from '../../shared/chart.color';
// import { Label, Color } from 'ng2-charts';

const LINE_SAMPLE_CHART_DATA: any[] = [
  { data: [23,76,12,53,21,27], label: 'Analysis'},
  { data: [42,45,23,98,67,20], label: 'Marketing'},
  { data: [43,54,76,23,76,98], label: 'Forecasting'}
];

const SAMPLE_BARCHART_LABELS: string[] = ['Jan','Feb','Mar','Apr','May','Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  public lineChartType: ChartType = 'line';
  public lineChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public lineChartData : any[] = LINE_SAMPLE_CHART_DATA;
  public lineChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {
  }

}
