import { ToastController } from '@ionic/angular';
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
  @ViewChild("barChartCanvasCaseByAgeGroup") barChartCanvasCaseByAgeGroup: ElementRef;
  @ViewChild("barChartCanvasSummaryByBarangay")  barChartCanvasSummaryByBarangay: ElementRef;
  private barChart: Chart;
  private pieChart: Chart;
  private barChartCaseByAgeGroup: Chart;
  private barChartCaseByBarangay: Chart;

  public barChartCaseSummary_loaded: boolean;
  public pieChartGenderSummary_loaded: boolean;
  public barChartCanvasCaseByAgeGroup_loaded: boolean;
  public barChartCanvasSummaryByBarangay_loaded: boolean;
  public timer: any;
  public countdown: any;
  sync: boolean;
  constructor(private coviddatasvc: CoviddataService, private renderer: Renderer2, private el: ElementRef, public toastController: ToastController) { }

  ngOnInit() {
    this.currentdatetime = new Date().toLocaleString();
    this.loadmunicipalities();

    this.sync = false;
  }
  updatesyncsettings(){
    if (!this.sync){
      clearTimeout(this.timer);
      this.timer = null;
    }else{
      this.startinterval();
     
    }
  }
  startinterval(){
    this.countdown = 20;
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 5){
        let toast = this.toastController.create({
          message: `Reloading dashboard data in ${this.countdown}`,
          duration: 1000,
          position: "bottom",
        });
        toast.then((toast) => toast.present());
      }
      if (this.countdown === 0){
        clearTimeout(this.timer);
        this.timer = null;
        this.createdash();
      }
    }, 1000);
  }
  loadmunicipalities() {
    this.coviddatasvc.bukidnoncovid19_view_by_municipality_summary().then(async items => {
      this.muncities = await items.map(a => a.address_muncity);
      this.selectedMunicipality = await "BAUNGON";
    });
    if (!this.barChart){
      this.createdash();
    }
  }

  createdash() {
    
    this.timer = null;
    if (this.barChart){
      this.barChart.destroy();
      this.pieChart.destroy();
      this.barChartCaseByAgeGroup.destroy();
      this.barChartCaseByBarangay.destroy();
    }
    this.currentdatetime = new Date().toLocaleString();
    this.barChartCaseSummary_loaded =  false;
    this.pieChartGenderSummary_loaded =  false;
    this.barChartCanvasCaseByAgeGroup_loaded =  false;
    this.barChartCanvasSummaryByBarangay_loaded = false;
    this.coviddatasvc.bukidnoncovid19_view_by_municipality_summary().then(async items => {
      this.pieChartGenderSummary_loaded = true;
      this.selectedMunicipalityData = items.filter(o => o.address_muncity === this.selectedMunicipality);
      await this.setmuncitydatavalues();
      await this.createbarchartdata();
      await this.createbarchartsbarangay();
      await this.createpiechartdata();
      await this.updatesyncsettings();
    });
  
  }

  ionViewDidLeave(){
    clearTimeout(this.timer);
    this.timer = null;
  }


  async onMunicipalityChange(){
    this.createdash();
  }

  setmuncitydatavalues(){
    this.totalactive = this.selectedMunicipalityData[0].totalactive;
    this.totalactivetoday = this.selectedMunicipalityData[0].totalactivetoday;
    this.totalrecovered = this.selectedMunicipalityData[0].totalrecovered;
    this.totalrecoveredtoday = this.selectedMunicipalityData[0].totalrecoveredtoday;
    this.totaldeceased = this.selectedMunicipalityData[0].totaldeceased;
    this.totaldeceasedtoday = this.selectedMunicipalityData[0].totaldeceasedtoday;
    this.totalconfirmed = this.selectedMunicipalityData[0].totalconfirmed;
    this.totalprobable = this.selectedMunicipalityData[0].totalprobable;
    this.totalprobabletoday = this.selectedMunicipalityData[0].totalprobabletoday;
    this.totalsuspect = this.selectedMunicipalityData[0].totalsuspect;
    this.totalsuspecttoday = this.selectedMunicipalityData[0].totalsuspecttoday;
    this.totalcompleted = this.selectedMunicipalityData[0].totalcompleted;
    this.totalcompletedtoday = this.selectedMunicipalityData[0].totalcompletedtoday;
    this.totalquarantined = this.selectedMunicipalityData[0].totalquarantined;
    this.totalconfirmedmale = this.selectedMunicipalityData[0].totalconfirmedmale;
    this.totalconfirmedfemale = this.selectedMunicipalityData[0].totalconfirmedfemale;
    this.totalconfirmed20below = this.selectedMunicipalityData[0].totalconfirmed20below;
    this.totalconfirmed20belowmale = this.selectedMunicipalityData[0].totalconfirmed20belowmale;
    this.totalconfirmed20belowfemale = this.selectedMunicipalityData[0].totalconfirmed20belowfemale;
    this.totalconfirmed60above = this.selectedMunicipalityData[0].totalconfirmed60above;
    this.totalconfirmed60abovemale = this.selectedMunicipalityData[0].totalconfirmed60abovemale;
    this.totalconfirmed60abovefemale = this.selectedMunicipalityData[0].totalconfirmed60abovefemale;

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
  }

  async createbarchartsbarangay() {
    await this.coviddatasvc
      .bukidnoncovid19_view_by_barangay_summary(this.selectedMunicipality)
      .then((items) => {
        if (this.barChartCaseByBarangay != undefined){
          this.barChartCaseByBarangay.destroy();
        }
        this.barChartCanvasSummaryByBarangay_loaded = true;
        this.barChartCaseByBarangay = new Chart(
          this.barChartCanvasSummaryByBarangay.nativeElement,
          {
            type: "horizontalBar",
            data: {
              labels: items.map((a) => a.barangay === null ? "BARANGAY NOT DEFIEND" : a.barangay),
              datasets: [
                {
                  label: "Active Cases",
                  data: items.map((a) => a.totalactive),
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 1,
                },
                {
                  label: "Recovered",
                  data: items.map((a) => a.totalrecovered),
                  backgroundColor: "rgba(99, 255, 132, 0.2)",
                  borderColor: "rgba(99,255,132,1)",
                  borderWidth: 1,
                },
                {
                  label: "Deceased",
                  data: items.map((a) => a.totaldeceased),
                  backgroundColor: "rgba(128,128,128, 0.2)",
                  borderColor: "rgba(128,128,128,1)",
                  borderWidth: 1,
                },
                {
                  label: "Probable",
                  data: items.map((a) => a.totalprobable),
                  backgroundColor: "rgba(102, 16, 242, 0.2)",
                  borderColor: "rgba(102, 16, 242,1)",
                  borderWidth: 1,
                },
                {
                  label: "Suspect",
                  data: items.map((a) => a.totalsuspect),
                  backgroundColor: "rgba(255, 193, 7, 0.2)",
                  borderColor: "rgba(255, 193, 7,1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              title: {
                display: false,
                text: "Covid Summary by Muincipality",
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                xAxes: [
                  {
                    stacked: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                  },
                ],
              },
            },
          }
        );
      });
  }

  async createbarchartdata(){
    await this.coviddatasvc.bukidnoncovid19_view_municipality_dashboard(this.selectedMunicipality).then(items => {
      if (this.barChart != undefined){
        this.barChart.destroy();
      }
      this.barChartCaseSummary_loaded = true;
      this.barChart = new Chart(this.barChartCaseSummary.nativeElement, {
        type: "bar",
        data: {
          labels: items.map(a => a.selected_date),
          datasets: [
            {
              label: 'Active Cases',
              data: items.map(a => a.totalactive),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor:  "rgba(255,99,132,1)",
              borderWidth: 1
            },
            {
              label: 'Recovered',
              data: items.map(a => a.totalrecovered),
              backgroundColor: "rgba(99, 255, 132, 0.2)",
              borderColor:  "rgba(99,255,132,1)",
              borderWidth: 1
            },
            {
              label: 'Deceased',
              data: items.map(a => a.totaldeceased),
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
                suggestedMax: this.totalconfirmed
              }
            }]
          },
        }
      });
      this.barChart.update();
    });
  }

  updatebarchartdata(){
    // this.barChart.data.labels.pop();
    // this.barChart.data.datasets.forEach((dataset) => {
    //     dataset.data.pop();
    // });
    this.barChart.data.datasets.length = 0;
    this.barChart.update();
    this.coviddatasvc.bukidnoncovid19_view_municipality_dashboard(this.selectedMunicipality).then(async items => {
      this.barChartCaseSummary_loaded = true;
      let data = {
        labels: items.map(a => a.selected_date),
        datasets: [
          {
            label: 'Active Cases',
            data: items.map(a => a.totalactive),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor:  "rgba(255,99,132,1)",
            borderWidth: 1
          },
          {
            label: 'Recovered',
            data: items.map(a => a.totalrecovered),
            backgroundColor: "rgba(99, 255, 132, 0.2)",
            borderColor:  "rgba(99,255,132,1)",
            borderWidth: 1
          },
          {
            label: 'Deceased',
            data: items.map(a => a.totaldeceased),
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

  async createpiechartdata(){
    await this.coviddatasvc.bukidnoncovid19_view_agegroup_summary_municipality(this.selectedMunicipality).then(items => {
      if (this.barChartCaseByAgeGroup != undefined){
        this.barChartCaseByAgeGroup.destroy();
      }
      this.barChartCanvasCaseByAgeGroup_loaded = true;
      // console.log(items.map(a => a.agerange));
      
      this.barChartCaseByAgeGroup = new Chart(this.barChartCanvasCaseByAgeGroup.nativeElement, {
        type: "horizontalBar",
        data: {
          labels:  items.map(a => a.agerange),
          datasets: [
            {
              label: 'Active Cases',
              data: items.map(a => a.totalactive),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor:  "rgba(255,99,132,1)",
              borderWidth: 1
            },
            {
              label: 'Recovered',
              data: items.map(a => a.totalrecovered),
              backgroundColor: "rgba(99, 255, 132, 0.2)",
              borderColor:  "rgba(99,255,132,1)",
              borderWidth: 1
            },
            {
              label: 'Deceased',
              data: items.map(a => a.totaldeceased),
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
      this.barChartCaseByAgeGroup.update();
    });
  }

  updatepiechartdata(){
    if (this.pieChart != undefined){
      this.pieChart.destroy();
    }
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

    this.coviddatasvc.bukidnoncovid19_view_agegroup_summary_municipality(this.selectedMunicipality).then(items => {
      this.barChartCanvasCaseByAgeGroup_loaded = true;
      this.pieChartGenderSummary_loaded =  true;
      let data3 = {
        labels:  items.map(a => a.agerange),
        datasets: [
          {
            label: 'Active Cases',
            data: items.map(a => a.totalactive),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor:  "rgba(255,99,132,1)",
            borderWidth: 1
          },
          {
            label: 'Recovered',
            data: items.map(a => a.totalrecovered),
            backgroundColor: "rgba(99, 255, 132, 0.2)",
            borderColor:  "rgba(99,255,132,1)",
            borderWidth: 1
          },
          {
            label: 'Deceased',
            data: items.map(a => a.totaldeceased),
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
