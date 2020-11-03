import { CoviddataService } from './../../services/coviddata.service';
import { Component, OnInit } from '@angular/core';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { Label } from 'ng2-charts';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { A2hsService } from 'src/app/services/a2hs.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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

  //chart
  @ViewChild("barChartCanvasSummaryByMunicipality") barChartCanvasSummaryByMunicipality: ElementRef;
  @ViewChild("barChartCanvasSummaryActiveCaseByGender") barChartCanvasSummaryActiveCaseByGender: ElementRef;
  @ViewChild("barChartCanvasCaseByAgeGroup") barChartCanvasCaseByAgeGroup: ElementRef;
  private barChartCaseByMunicipality: Chart;
  private barChartCaseByGender: Chart;
  private barChartCaseByAgeGroup: Chart;
  @ViewChild("barChartCanvasCaseSummary") barChartCanvasCaseSummary: ElementRef;
  @ViewChild("barChartCanvasCaseSummary7DayAverage") barChartCanvasCaseSummary7DayAverage: ElementRef;
  private barChartCaseSummary: Chart;
  private barChartCaseSummary7DayAverage: Chart;

  public chartloaded: boolean;

  constructor(
    private coviddatasvc: CoviddataService,
    public a2hs: A2hsService,
    public plt : Platform
  ) { 
   
    // A2HS - START
    a2hs.checkUserAgent();
    a2hs.trackStandalone();
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      a2hs.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      a2hs.deferredPrompt = e;
      a2hs.promptSaved = true;

    });
    window.addEventListener('appinstalled', (evt) => {
      a2hs.trackInstalled();
      // hide the add button
      // a2hs.promptIntercepted = false;
    });
    // A2HS - END
  }



  ngOnInit() {
    this.chartloaded = false;
    this.currentdatetime = new Date().toLocaleString();
    setTimeout((_) => this.getcovidtotals(), 2000);
    setTimeout((_) => this.createbarcharts(), 2000);
    setTimeout((_) => this.createprovincestackbarchart(), 2000);

    setInterval(data => {
      this.currentdatetime = new Date().toLocaleString();
      this.updatebarcharts();
      this.updateprovincestackbarchart();
    }, 20000);
  }

  createbarcharts(){
    this.coviddatasvc.getCovidDataByMunicipality().then(items => {
      this.barChartCaseByMunicipality = new Chart(this.barChartCanvasSummaryByMunicipality.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: items.map(a => a.properties['address_muncity']),
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
            {
              label: 'Probable',
              data: items.map(a => a.properties['totalprobable']),
              backgroundColor: "rgba(102, 16, 242, 0.2)",
              borderColor:  "rgba(102, 16, 242,1)",
              borderWidth: 1
            },
            {
              label: 'Suspect',
              data: items.map(a => a.properties['totalsuspect']),
              backgroundColor: "rgba(255, 193, 7, 0.2)",
              borderColor:  "rgba(255, 193, 7,1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Covid Summary by Muincipality'
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

      this.barChartCaseByGender = new Chart(this.barChartCanvasSummaryActiveCaseByGender.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: items.map(a => a.properties['address_muncity']),
          datasets: [
            {
              label: 'Male',
              data: items.map(a => a.properties['totalconfirmedmale']),
              backgroundColor: "rgba(99, 99, 255, 0.2)",
              borderColor:  "rgba(99, 99, 255,1)",
              borderWidth: 1
            },
            {
              label: 'Female',
              data: items.map(a => a.properties['totalconfirmedfemale']),
              backgroundColor: "rgba(255, 255, 99, 0.2)",
              borderColor:  "rgba(255, 255, 99,1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Confirmed Cases by Gender'
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

    this.coviddatasvc.getCovidDataAgeGroup().then(items => {
      // console.log(items.map(a => a.properties['agerange']));
      this.barChartCaseByAgeGroup = new Chart(this.barChartCanvasCaseByAgeGroup.nativeElement, {
        type: "horizontalBar",
        data: {
          labels: items.map(a => a.properties['agerange']),
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

  updatebarcharts() {
    this.barChartCaseByMunicipality.data.datasets.length = 0;
    this.barChartCaseByMunicipality.update();

    this.barChartCaseByGender.data.datasets.length = 0;
    this.barChartCaseByGender.update();

    this.barChartCaseByAgeGroup.data.datasets.length = 0;
    this.barChartCaseByAgeGroup.update();

    this.coviddatasvc.getCovidDataByMunicipality().then(items => {
      let data1 =  {
        labels: items.map(a => a.properties['address_muncity']),
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
          {
            label: 'Probable',
            data: items.map(a => a.properties['totalprobable']),
            backgroundColor: "rgba(102, 16, 242, 0.2)",
            borderColor:  "rgba(102, 16, 242,1)",
            borderWidth: 1
          },
          {
            label: 'Suspect',
            data: items.map(a => a.properties['totalsuspect']),
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            borderColor:  "rgba(255, 193, 7,1)",
            borderWidth: 1
          }
        ]
      };

      let data2 = {
        labels: items.map(a => a.properties['address_muncity']),
        datasets: [
          {
            label: 'Male',
            data: items.map(a => a.properties['totalconfirmedmale']),
            backgroundColor: "rgba(99, 99, 255, 0.2)",
            borderColor:  "rgba(99, 99, 255,1)",
            borderWidth: 1
          },
          {
            label: 'Female',
            data: items.map(a => a.properties['totalconfirmedfemale']),
            backgroundColor: "rgba(255, 255, 99, 0.2)",
            borderColor:  "rgba(255, 255, 99,1)",
            borderWidth: 1
          }
        ]
      };

      this.barChartCaseByMunicipality.data = data1;
      this.barChartCaseByMunicipality.update();

      this.barChartCaseByGender.data = data2;
      this.barChartCaseByGender.update();
    });

    this.coviddatasvc.getCovidDataAgeGroup().then(items => {
      let data3 = {
        labels:  items.map(a => a.properties['agerange']),
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

  getcovidtotals(){
    this.coviddatasvc.getCovidData().then(items => {
      // console.log(items);
      // this.totalconfirmed = items.filter(obj => obj.properties['classification'] === 'CONFIRMED').length;
      this.totalactive = items[0].properties['totalactive'];
      this.totalactivetoday = items[0].properties['totalactivetoday'];
      this.totalrecovered = items[0].properties['totalrecovered'];
      this.totalrecoveredtoday = items[0].properties['totalrecoveredtoday'];
      this.totaldeceased = items[0].properties['totaldeceased'];
      this.totaldeceasedtoday = items[0].properties['totaldeceasedtoday'];
      this.totalconfirmed = items[0].properties['totalconfirmed'];
      this.totalprobable = items[0].properties['totalprobable'];
      this.totalprobabletoday = items[0].properties['totalprobabletoday'];
      this.totalsuspect = items[0].properties['totalsuspect'];
      this.totalsuspecttoday = items[0].properties['totalsuspecttoday'];
      this.totalcompleted = items[0].properties['totalcompleted'];
      this.totalcompletedtoday = items[0].properties['totalcompletedtoday'];
      this.totalquarantined = items[0].properties['totalquarantined'];
      this.totalconfirmedmale = items[0].properties['totalconfirmedmale'];
      this.totalconfirmedfemale = items[0].properties['totalconfirmedfemale'];
      this.totalconfirmed20below = items[0].properties['totalconfirmed20below'];
      this.totalconfirmed20belowmale = items[0].properties['totalconfirmed20belowmale'];
      this.totalconfirmed20belowfemale = items[0].properties['totalconfirmed20belowfemale'];
      this.totalconfirmed60above = items[0].properties['totalconfirmed60above'];
      this.totalconfirmed60abovemale = items[0].properties['totalconfirmed60abovemale'];
      this.totalconfirmed60abovefemale = items[0].properties['totalconfirmed60abovefemale'];

    });
  }

  createprovincestackbarchart(){
      this.coviddatasvc.getCovidProvinceDashboard().then(items => {
      this.barChartCaseSummary = new Chart(this.barChartCanvasCaseSummary.nativeElement, {
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
      this.barChartCaseSummary.update();
    });
  }

  updateprovincestackbarchart(){
    this.barChartCaseSummary.data.datasets.length = 0;
    this.barChartCaseSummary.update();
    this.coviddatasvc.getCovidProvinceDashboard().then(async items => {
      // console.log(items);
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
      this.barChartCaseSummary.data = data;
      this.barChartCaseSummary.update();
    });
  }

}
