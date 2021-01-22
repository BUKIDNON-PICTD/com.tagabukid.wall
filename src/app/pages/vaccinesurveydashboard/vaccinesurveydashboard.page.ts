import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccinesurveydashboard',
  templateUrl: './vaccinesurveydashboard.page.html',
  styleUrls: ['./vaccinesurveydashboard.page.scss'],
})
export class VaccinesurveydashboardPage implements OnInit {
  public currentDateTime;

  public totalMalesYes: number;
  public totalMalesNo: number;
  public totalMalesUndecided: number;
  public totalMales: number;
  public totalRespondents: number;

  public totalFemalesYes: number;
  public totalFemalesNo: number;
  public totalFemalesUndecided: number;
  public totalFemales: number;

  constructor() { }

  ngOnInit() {
    this.currentDateTime = new Date().toLocaleString();

    this.totalMalesYes = 2;
    this.totalMalesNo = 21;
    this.totalMalesUndecided = 19;
    this.totalMales = this.totalMalesYes + this.totalMalesNo + this.totalMalesUndecided;

    this.totalFemalesYes = 4;
    this.totalFemalesNo = 17;
    this.totalFemalesUndecided = 24;
    this.totalFemales = this.totalFemalesYes + this.totalFemalesNo + this.totalFemalesUndecided;

    this.totalRespondents = 87;
  }

}
