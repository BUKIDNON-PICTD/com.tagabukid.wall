import { VaccinesurveydashboardService } from "./../../services/vaccinesurveydashboard.service";

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "app-vaccinesurveydashboard",
  templateUrl: "./vaccinesurveydashboard.page.html",
  styleUrls: ["./vaccinesurveydashboard.page.scss"],
})
export class VaccinesurveydashboardPage implements OnInit {
  public totals: any;
  @ViewChild("pieChartSurveyByGenderCanvas")
  pieChartSurveyByGenderCanvas: ElementRef;

  public pieChartSurveyByGender_loaded: boolean;
  public pieChartSurveyByGender: Chart;

  constructor(public vacsurveydash: VaccinesurveydashboardService) {}

  async ngOnInit() {
    this.getTotals();
    this.pieChartSurveyByGender_loaded = false;
  }

  getTotals() {
    this.vacsurveydash.getTotals().then((item) => {
      this.totals = item;
      this.generateMaleGenderPieChart();
    });
  }

  generateMaleGenderPieChart() {
    this.pieChartSurveyByGender_loaded = true;
    this.pieChartSurveyByGender = new Chart(
      this.pieChartSurveyByGenderCanvas.nativeElement,
      {
        type: "pie",
        data: {
          labels: ["YES", "NO", "UNDECIDED"],
          datasets: [
            {
              label: "MALE SURVEY",
              data: [
                this.totals.totalyesmale,
                this.totals.totalnomale,
                this.totals.totalundecidedmale,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(50,205,50, 0.2)",
              ],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#7CFC00"],
            },
          ],
        },
        options: {
          responsive: true,
        },
      }
    );
    this.pieChartSurveyByGender.update();
  }
}
