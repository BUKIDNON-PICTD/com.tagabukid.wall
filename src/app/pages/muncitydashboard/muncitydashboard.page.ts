import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CoviddataService } from 'src/app/services/coviddata.service';
// Chart.defaults.global.legend.display = false;
@Component({
  selector: 'app-muncitydashboard',
  templateUrl: './muncitydashboard.page.html',
  styleUrls: ['./muncitydashboard.page.scss'],
})
export class MuncitydashboardPage implements OnInit {
  public currentdatetime;

  public totalactive: number;
  public totalactivetoday: number;
  public totalrecovered: number;
  public totalrecoveredtoday: number;
  public totaldeceased: number;
  public totaldeceasedtoday: number;
  public totalconfirmed: number;
  public totalprobable: number;
  public totalprobabletoday: number;
  public totalsuspect: number;
  public totalsuspecttoday: number;
  public totalcompleted: number;
  public totalcompletedtoday: number;
  public totalquarantined: number;
  public totalconfirmedmale: number;
  public totalconfirmedfemale: number;
  public totalconfirmed20below: number;
  public totalconfirmed20belowmale: number;
  public totalconfirmed20belowfemale: number;
  public totalconfirmed60above: number;
  public totalconfirmed60abovemale: number;
  public totalconfirmed60abovefemale: number;

  public muncities = [];

  public selectedMunicipality: any;
  public muncitydata: any;
  public selectedMunicipalityData: any[];

  @ViewChild("barChartCaseSummary") barChartCaseSummary: ElementRef;
  @ViewChild("pieChartGenderSummary") pieChartGenderSummary: ElementRef;
  private barChart: Chart;
  private pieChart: Chart;
  @ViewChild("barChartCanvasCaseByAgeGroup") barChartCanvasCaseByAgeGroup: ElementRef;
  private barChartCaseByAgeGroup: Chart;
  
  
  constructor(private coviddatasvc: CoviddataService, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.currentdatetime = new Date().toLocaleString();

    this.coviddatasvc.getCovidDataByMunicipality().then(async items => {
      this.muncities = items.map(a => a.properties['address_muncity']);
      this.muncitydata = items;
      this.selectedMunicipality = "BAUNGON";
      this.selectedMunicipalityData = items.filter(o => o.properties['address_muncity'] === this.selectedMunicipality);
      await this.setmuncitydatavalues();
      setTimeout((_) => this.createbarchartdata(), 2000);
      setTimeout((_) => this.createpiechartdata(), 2000);
    });
  }

  async onMunicipalityChange(){
    this.selectedMunicipalityData = this.muncitydata.filter(o => o.properties['address_muncity'] === this.selectedMunicipality);
    await this.setmuncitydatavalues();
    setTimeout((_) => this.updatebarchartdata(), 2000);
    setTimeout((_) => this.updatepiechartdata(), 2000);
   
    
  }

  setmuncitydatavalues(){
    this.totalactive = this.selectedMunicipalityData[0].properties['totalactive'];
      this.totalactivetoday = this.selectedMunicipalityData[0].properties['totalactivetoday'];
      this.totalrecovered = this.selectedMunicipalityData[0].properties['totalrecovered'];
      this.totalrecoveredtoday = this.selectedMunicipalityData[0].properties['totalrecoveredtoday'];
      this.totaldeceased = this.selectedMunicipalityData[0].properties['totaldeceased'];
      this.totaldeceasedtoday = this.selectedMunicipalityData[0].properties['totaldeceasedtoday'];
      this.totalconfirmed = this.selectedMunicipalityData[0].properties['totalconfirmed'];
      this.totalprobable = this.selectedMunicipalityData[0].properties['totalprobable'];
      this.totalprobabletoday = this.selectedMunicipalityData[0].properties['totalprobabletoday'];
      this.totalsuspect = this.selectedMunicipalityData[0].properties['totalsuspect'];
      this.totalsuspecttoday = this.selectedMunicipalityData[0].properties['totalsuspecttoday'];
      this.totalcompleted = this.selectedMunicipalityData[0].properties['totalcompleted'];
      this.totalcompletedtoday = this.selectedMunicipalityData[0].properties['totalcompletedtoday'];
      this.totalquarantined = this.selectedMunicipalityData[0].properties['totalquarantined'];
      this.totalconfirmedmale = this.selectedMunicipalityData[0].properties['totalconfirmedmale'];
      this.totalconfirmedfemale = this.selectedMunicipalityData[0].properties['totalconfirmedfemale'];
      this.totalconfirmed20below = this.selectedMunicipalityData[0].properties['totalconfirmed20below'];
      this.totalconfirmed20belowmale = this.selectedMunicipalityData[0].properties['totalconfirmed20belowmale'];
      this.totalconfirmed20belowfemale = this.selectedMunicipalityData[0].properties['totalconfirmed20belowfemale'];
      this.totalconfirmed60above = this.selectedMunicipalityData[0].properties['totalconfirmed60above'];
      this.totalconfirmed60abovemale = this.selectedMunicipalityData[0].properties['totalconfirmed60abovemale'];
      this.totalconfirmed60abovefemale = this.selectedMunicipalityData[0].properties['totalconfirmed60abovefemale'];
  }

  createbarchartdata(){
      this.coviddatasvc.getCovidMunicipalityDashboard(this.selectedMunicipality).then(items => {
      this.barChart = new Chart(this.barChartCaseSummary.nativeElement, {
        type: "bar",
        data: {
          labels: items.map(a => a.properties['selected_date']),
          datasets: [
            {
              label: 'Active Cases',
              data: items.map(a => a.properties['totalactive']),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor:  "rgba(255,99,132,1)",
              borderWidth: 1
            },
            {
              label: 'Recovered',
              data: items.map(a => a.properties['totalrecovered']),
              backgroundColor: "rgba(99, 255, 132, 0.2)",
              borderColor:  "rgba(99,255,132,1)",
              borderWidth: 1
            },
            {
              label: 'Deceased',
              data: items.map(a => a.properties['totaldeceased']),
              backgroundColor: "rgba(128,128,128, 0.2)",
              borderColor:  "rgba(128,128,128,1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Cases Dashboard'
          },
          tooltips: {
            mode: 'index',
            intersect : true
          },
          plugins: {
            datalabels: {
                display: false,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                stepSize: 10
              }
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                stepSize: 1,
                suggestedMin: 1,
                suggestedMax: this.totalconfirmed + 50
              }
            }]
          },
        }
      });
      this.barChart.update();
    });
  }

  updatebarchartdata(){
    this.barChart.data.datasets.length = 0;
    this.barChart.update();
    this.coviddatasvc.getCovidMunicipalityDashboard(this.selectedMunicipality).then(async items => {
      let data = {
        labels: items.map(a => a.properties['selected_date']),
        datasets: [
          {
            label: 'Active Cases',
            data: items.map(a => a.properties['totalactive']),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor:  "rgba(255,99,132,1)",
            borderWidth: 1
          },
          {
            label: 'Recovered',
            data: items.map(a => a.properties['totalrecovered']),
            backgroundColor: "rgba(99, 255, 132, 0.2)",
            borderColor:  "rgba(99,255,132,1)",
            borderWidth: 1
          },
          {
            label: 'Deceased',
            data: items.map(a => a.properties['totaldeceased']),
            backgroundColor: "rgba(128,128,128, 0.2)",
            borderColor:  "rgba(128,128,128,1)",
            borderWidth: 1
          }
        ]
      };
      this.barChart.data = data;
      this.barChart.update();
    });
  }

  createpiechartdata(){
    this.pieChart = new Chart(this.pieChartGenderSummary.nativeElement, {
      type: "pie",
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Case by Gender',
            data: [
              this.totalconfirmedmale,
              this.totalconfirmedfemale
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
    this.pieChart.update();

    this.coviddatasvc.getCovidDataAgeGroupByMunicipality(this.selectedMunicipality).then(items => {
      // console.log(items.map(a => a.properties['agerange']));
      this.barChartCaseByAgeGroup = new Chart(this.barChartCanvasCaseByAgeGroup.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: ["11-20","21-30","31-40","41-50","61-70","71-80","above 81","below 10"],
          datasets: [
            {
              label: 'Active Cases',
              data: items.map(a => a.properties['totalactive']),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor:  "rgba(255,99,132,1)",
              borderWidth: 1
            },
            {
              label: 'Recovered',
              data: items.map(a => a.properties['totalrecovered']),
              backgroundColor: "rgba(99, 255, 132, 0.2)",
              borderColor:  "rgba(99,255,132,1)",
              borderWidth: 1
            },
            {
              label: 'Deceased',
              data: items.map(a => a.properties['totaldeceased']),
              backgroundColor: "rgba(128,128,128, 0.2)",
              borderColor:  "rgba(128,128,128,1)",
              borderWidth: 1
            },
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Cases by Age Group'
          },
          tooltips: {
            mode: 'index',
            intersect : false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                  stepSize: 1
              }
            }],
            yAxes: [{
              stacked: true,
            }]
          },
        }
      });
    });
  }

  updatepiechartdata(){
    this.pieChart.data.datasets.length = 0;
    this.pieChart.update();
    this.barChartCaseByAgeGroup.data.datasets.length = 0;
    this.barChartCaseByAgeGroup.update();
    let data = {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Case by Gender',
          data: [
            this.totalconfirmedmale,
            this.totalconfirmedfemale
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"]
        }
      ]
    };
    this.pieChart.data = data;
    this.pieChart.update();

    this.coviddatasvc.getCovidDataAgeGroupByMunicipality(this.selectedMunicipality).then(items => {
      let data3 = {
        labels: ["11-20","21-30","31-40","41-50","61-70","71-80","above 81","below 10"],
        datasets: [
          {
            label: 'Active Cases',
            data: items.map(a => a.properties['totalactive']),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor:  "rgba(255,99,132,1)",
            borderWidth: 1
          },
          {
            label: 'Recovered',
            data: items.map(a => a.properties['totalrecovered']),
            backgroundColor: "rgba(99, 255, 132, 0.2)",
            borderColor:  "rgba(99,255,132,1)",
            borderWidth: 1
          },
          {
            label: 'Deceased',
            data: items.map(a => a.properties['totaldeceased']),
            backgroundColor: "rgba(128,128,128, 0.2)",
            borderColor:  "rgba(128,128,128,1)",
            borderWidth: 1
          },
        ]
      };
  
      this.barChartCaseByAgeGroup.data = data3;
      this.barChartCaseByAgeGroup.update();
    });
  }

 

}
