import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vaccine-survey-reason-modal',
  templateUrl: './vaccine-survey-reason-modal.component.html',
  styleUrls: ['./vaccine-survey-reason-modal.component.scss'],
})
export class VaccineSurveyReasonModalComponent implements OnInit {
  [x: string]: any;
  selectedReason: any;
  customReason: any;

  @Input() choice: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  radioGroupChange(event) {
    this.selectedReason = event.detail.value;
  }

  textInputChange(event) {
    this.customReason = event.target.value;
  }
 
  dismissModal(action) {
    this.modalController.dismiss({
      "reason": action === "cancel" ?
      undefined
      : this.selectedReason === "others" ?
      this.customReason
      : this.selectedReason,
      "choice": this.choice
    });
  }

}
