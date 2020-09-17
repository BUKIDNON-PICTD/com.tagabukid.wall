import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { Label } from 'ng2-charts';
import { CoviddataService } from 'src/app/services/coviddata.service';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent implements OnInit {

    //chart
    public barChartOptions: ChartOptions;
    public barChartLabels: Label[];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];
  
    public barChartData: ChartDataSets[];

  constructor(private coviddatasvc: CoviddataService) { }

  ngOnInit() {
    this.coviddatasvc.getCovidDataByMunicipality().then(items => {
      this.barChartLabels = items.map(a => a.address_muncity);
      this.barChartOptions = {
        title:{
          display:true,
          text: 'Covid Summary by Muincipality'
        },
        tooltips: {
          mode: 'index',
          intersect : false
        },
        responsive: true,
        scales: { 
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
          }]
        }
      };
      this.barChartData = [
        {
          label: 'Active Cases',
          data: items.map(a => a.totalactive)
        },
        {
          label: 'Recovered',
          data: items.map(a => a.totalrecovered)
        },
        {
          label: 'Deceased',
          data: items.map(a => a.totaldeceased)
        },
        {
          label: 'Probable',
          data: items.map(a => a.totalsuspect)
        },
        {
          label: 'Suspect',
          data: items.map(a => a.totalprobable)
        }
      ];
    });
  }

}
