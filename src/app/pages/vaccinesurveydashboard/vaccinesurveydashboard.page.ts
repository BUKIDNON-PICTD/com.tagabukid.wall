import { Component, OnInit } from '@angular/core';
import { VaccinesurveydashboardserviceService } from './../../services/vaccinesurveydashboardservice.service';

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
    public vaccineSurveyDashboardService: VaccinesurveydashboardserviceService
  ) { }

  ngOnInit() {
    this.currentDateTime = new Date().toLocaleString();
    this.loadTotals();
  }

  loadTotals(){
    this.vaccineSurveyDashboardService.getItems().then( items => {

    this.totalYes = items.totalYes;
    this.totalNo = items.totalNo;
    this.totalUndecided = items.totalUndecided;
    this.totalRespondents = items.totalRespondents;
    this.totalMaleYes = items.totalMaleYes;
    this.totalMaleNo = items.totalMaleNo;
    this.totalMaleUndecided = items.totalMaleUndecided;
    this.totalFemaleYes = items.totalFemaleYes;
    this.totalFemaleNo = items.totalFemaleNo;
    this.totalFemaleUndecided = items.totalFemaleUndecided;
    this.totalYoungAdult = items.totalYoungAdult;
    this.totalEarlyAdult = items.totalEarlyAdult;
    this.totalAdult = items.totalAdult;
    this.totalMiddleAdult = items.totalMiddleAdult;
    this.totalLateAdult = items.totalLateAdult;
    this.totalSenior = items.totalSenior;
    })
  }

}
