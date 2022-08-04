import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartData } from 'chart.js';
import { THEME_COLORS } from 'src/app/shared/theme.colors';

const theme = 'Bright';

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
  //     data: [132,894,273],
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)'
  //     ]
  //   }]
  // };
  public pieChartType: ChartType = 'doughnut';

  @Input() inputData: any;
  @Input() limit: number;

  chartData: any[] = [132,84,273];
  chartLabels: string[] = ["Customer1, Customer3, Customer3"];
  pieChartData : ChartData<'doughnut'>;

  ngOnInit(): void {
    this.parsData(this.inputData, this.limit);
    this.creatChart();
  }

  parsData(res: any, limit?: number) {
    const allData = res.slice(0,limit);
    this.chartData = allData.map(x => x['total']);
    this.chartLabels = allData.map(x => x['name']||x['province']);
    // console.log('data: ', this.chartData);
    // console.log('labels: ', this.chartLabels);
    
  }

  creatChart() {
    this.pieChartData = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          backgroundColor: this.themeColors(theme),
          borderColor: '#282b2e'
        }
      ]
    };
  }

  themeColors(setName: string): string[]{
    const color = THEME_COLORS.slice(0)
      .find(set => set.name === setName).colorSet;
      return color;
  }
  
}
 

