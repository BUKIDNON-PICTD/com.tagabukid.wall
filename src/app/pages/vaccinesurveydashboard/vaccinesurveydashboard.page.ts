import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { VaccinesurveydashboardService } from 'src/app/services/vaccinesurveydashboard.service';

@Component({
  selector: 'app-vaccinesurveydashboard',
  templateUrl: './vaccinesurveydashboard.page.html',
  styleUrls: ['./vaccinesurveydashboard.page.scss'],
})
export class VaccinesurveydashboardPage implements OnInit {
  public currentdatetime;

  public totalyes: number;
  public totalno: number;
  public totalundecided: number;

  public totalmale: number;
  public totalfemale: number;
  public totalresponse: number;
  
  public totalyesmale: number;
  public totalyesfemale: number;
  
  public totalundecidedmale: number;
  public totalundecidedfemale: number;
  
  public totalnomale: number;
  public totalnofemale: number;

  public totalage10below: number;
  public totalage11to20: number;
  public totalage21to30: number;
  public totalage31to40: number;
  public totalage41to50: number;
  public totalage51to60: number;
  public totalage61to70: number;
  public totalage71to80: number;
  public totalage81above: number;

  @ViewChild("pieChartGenderSummary") pieChartGenderSummary: ElementRef;  
  public pieChartGenderSummary_loaded: boolean;
  
  @ViewChild("pieChartGenderMaleSummary") pieChartGenderMaleSummary: ElementRef;  
  public pieChartGenderMaleSummary_loaded: boolean;
  
  @ViewChild("pieChartGenderFemaleSummary") pieChartGenderFemaleSummary: ElementRef;  
  public pieChartGenderFemaleSummary_loaded: boolean;

  
  @ViewChild("barChartCanvasVoteByAgeGroup") barChartCanvasVoteByAgeGroup: ElementRef;
  public barChartCanvasVoteByAgeGroup_loaded: boolean;
  


  private pieChart: Chart;
  private barChart: Chart;
  private barChartVoteByAgeGroup: Chart;
  
  public selectedCategory: any;

  constructor(
    private vaxxsurveydashsvc: VaccinesurveydashboardService
  ) { }

  ngOnInit() { 
    this.createdash();
  }

  async setvalues() {
    this.pieChart = new Chart(this.pieChartGenderSummary.nativeElement, {
      type: "pie",
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Total Votes by Gender',
            data: [
              this.totalmale,
              this.totalfemale
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#20b022"]
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
    this.pieChart.update();
  }
  async setvaluesMale() {
    this.pieChart = new Chart(this.pieChartGenderMaleSummary.nativeElement, {
      type: "pie",
      data: {
        labels: ['Yes', 'No', 'Undecided'],
        datasets: [
          {
            label: 'Total Male Votes',
            data: [
              this.totalyesmale,
              this.totalnomale,
              this.totalundecidedmale
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "green"
            ],
            hoverBackgroundColor: ["#FF6384", "#20b022", "gray"]
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
    this.pieChart.update();
  }
  setvaluesFemale() {
    this.pieChart = new Chart(this.pieChartGenderFemaleSummary.nativeElement, {
      type: "pie",
      data: {
        labels: ['Yes', 'No', 'Undecided'],
        datasets: [
          {
            label: 'Total Female Votes',
            data: [
              this.totalyesfemale,
              this.totalnofemale,
              this.totalundecidedfemale
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "green"
            ],
            hoverBackgroundColor: ["#FF6384", "#20b022", "yellow"]
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
    this.pieChart.update();
  }


  async createBarChartAge() {
    await this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_age_summary().then(items => {
      this.barChart = new Chart(this.barChartCanvasVoteByAgeGroup.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: items.map(a => a.agerange),
        datasets: [
          {
            label: 'YES',
            data: items.map(a => a.yes),
            backgroundColor: "#2e993c55",
            borderColor:  "#2e993c7f",
            borderWidth: 2
          },
          {
            label: 'NO',
            data: items.map(a => a.no),
            backgroundColor: "#e82e4d55",
            borderColor:  "#e82e4d7f",
            borderWidth: 2
          },
          {
            label: 'UNDECIDED',
            data: items.map(a => a.undecided),
            backgroundColor: "#30303055",
            borderColor:  "#3030307f",
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Age Dashboard'
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
              stepSize: 1
            }
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              stepSize: 1,
            }
          }]
        },
      }
    });
    this.barChart.update();
  });
  }
  
  createdash() {
    this.pieChartGenderSummary_loaded =  false;
    this.barChartCanvasVoteByAgeGroup_loaded = false;
    this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_total().then(async items => {
      this.pieChartGenderSummary_loaded = true;
      await this.getvaxxtotals();
      await this.setvalues();
      await this.createPieChartsGenderTotal();
      await this.setvaluesMale();
      await this.createPieChartsGenderMale();
      await this.setvaluesFemale();
      await this.createPieChartsGenderFemale();
      await this.createBarChartAge();
    });
    // await this.createprovincestackbarchart();
    // await this.updatesyncsettings();
  }
  async getvaxxtotals() {
    await this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_total().then((items) => {
      // this.totalconfirmed = items.filter(obj => obj.properties['classification'] === 'CONFIRMED').length;
      this.totalyes = items.totalyes
      this.totalno = items.totalno
      this.totalundecided = items.totalundecided
      this.totalresponse = items.totalresponse
    });
    this.pieChartGenderSummary_loaded =  true;
  }

async createPieChartsGenderTotal(){
  await this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_total().then(items => {  
     this.totalmale = items.totalmale;
      this.totalfemale = items.totalfemale;
      this.pieChart.data.datasets.length = 0;
      this.pieChart.update();
      let data = {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Case by Gender',
            data: [
              this.totalmale,
              this.totalfemale
            ],
            backgroundColor: [
              "#36A2EB",
              "#FF6384"
            ],
            hoverBackgroundColor: ["#204fff", "red"]
          }
        ]
      };
      this.pieChart.data = data;
      this.pieChart.update();
      this.pieChartGenderMaleSummary_loaded =  true;
  });
  }
async createPieChartsGenderMale(){
    await this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_total().then(items => {  
      this.totalyesmale = items.totalyesmale;
        this.totalnomale = items.totalnomale;
        this.totalundecidedmale = items.totalundecidedmale;
        this.pieChart.data.datasets.length = 0;
        this.pieChart.update();
        let datamale = {
          labels: ['Yes', 'No', 'Undecided'],
          datasets: [
            {
              label: 'Case by Gender',
              data: [
                this.totalyesmale,
                this.totalnomale,
                this.totalundecidedmale
              ],
              backgroundColor: [
                "#20b022",
                "#e82e4d",
                "gray"
              ],
              hoverBackgroundColor: ["green", "red", "dark"]
            }
          ]
        };
        this.pieChart.data = datamale;
        this.pieChart.update();
        this.pieChartGenderFemaleSummary_loaded =  true;
    });
    }

async createPieChartsGenderFemale() {
  await this.vaxxsurveydashsvc.bukidnoncovid19_vaxx_total().then(items => {  
    this.totalyesfemale = items.totalyesfemale;
    this.totalnofemale = items.totalnofemale;
    this.totalundecidedfemale = items.totalundecidedfemale;
    this.pieChart.data.datasets.length = 0;
    this.pieChart.update();
    let datafemale = {
      labels: ['Yes', 'No', 'Undecided'],
      datasets: [
        {
          label: 'Case by Gender',
          data: [
            this.totalyesfemale,
            this.totalnofemale,
            this.totalundecidedfemale
          ],
          backgroundColor: [
            "#20b022",
            "#e82e4d",
            "gray"
          ],
          hoverBackgroundColor: ["green", "red", "dark"]
        }
      ]
    };
    this.pieChart.data = datafemale;
    this.pieChart.update();
    this.barChartCanvasVoteByAgeGroup_loaded = true;

    });
    }
}
