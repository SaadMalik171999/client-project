import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
} from 'ng-apexcharts';
import { ApiService } from '../Shared/api.service';

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  plotOptions?: ApexPlotOptions;
};

@Component({
  selector: 'app-data-set-chart',
  templateUrl: './data-set-chart.component.html',
  styleUrls: ['./data-set-chart.component.scss'],
})
export class DataSetChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  dataSetData: any;
  data: any[] = [];

  constructor(private api: ApiService) {}

  async ngOnInit() {
    this.api.GetAllList().subscribe((response) => {
      this.dataSetData = response;
      if (this.dataSetData) {
        for (let i = 0; i < this.dataSetData.length; i++) {
          this.data.push({
            x: this.dataSetData[i].event,
            y: [this.dataSetData[i].start, this.dataSetData[i].end],
          });
        }
      }
    });

    this.chartOptions = {
      series: [
        {
          data: this.data,
        },
      ],
      chart: {
        height: 350,
        type: 'rangeBar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: 'numeric',
      },
    };
  }
}
