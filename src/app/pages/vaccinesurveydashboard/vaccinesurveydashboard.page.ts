import { Component, OnInit } from '@angular/core';
import { VaccinesurveydashboardService } from './../../services/vaccinesurveydashboard.service';

@Component({
  selector: 'app-vaccinesurveydashboard',
  templateUrl: './vaccinesurveydashboard.page.html',
  styleUrls: ['./vaccinesurveydashboard.page.scss'],
})
export class VaccinesurveydashboardPage implements OnInit {
  public currentDateTime;
  
  public totalYes: number;
  public totalNo: number;
  public totalUndecided: number;
  public totalRespondents: number;
  public totalMaleYes: number;
  public totalMaleNo: number;
  public totalMaleUndecided: number;
  public totalFemaleYes: number;
  public totalFemaleNo: number;
  public totalFemaleUndecided: number;
  public totalYoungAdult: number;
  public totalEarlyAdult: number;
  public totalAdult: number;
  public totalMiddleAdult: number;
  public totalLateAdult: number;
  public totalSenior: number;

  constructor(
    public vaccineSurveyDashboardService: VaccinesurveydashboardService
  ) { }

  ngOnInit() {
    this.currentDateTime = new Date().toLocaleString();
    this.loadTotals();
  }

  loadTotals(){
    this.vaccineSurveyDashboardService.getItems().then( item => {

    this.totalYes = item.totalYes;
    this.totalNo = item.totalNo;
    this.totalUndecided = item.totalUndecided;
    this.totalRespondents = item.totalRespondents;
    this.totalMaleYes = item.totalMaleYes;
    this.totalMaleNo = item.totalMaleNo;
    this.totalMaleUndecided = item.totalMaleUndecided;
    this.totalFemaleYes = item.totalFemaleYes;
    this.totalFemaleNo = item.totalFemaleNo;
    this.totalFemaleUndecided = item.totalFemaleUndecided;
    this.totalYoungAdult = item.totalYoungAdult;
    this.totalEarlyAdult = item.totalEarlyAdult;
    this.totalAdult = item.totalAdult;
    this.totalMiddleAdult = item.totalMiddleAdult;
    this.totalLateAdult = item.totalLateAdult;
    this.totalSenior = item.totalSenior;
    })
  }

}
