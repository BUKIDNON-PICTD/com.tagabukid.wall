import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaccineSurveyReasonModalComponent } from './vaccine-survey-reason-modal.component';

describe('VaccineSurveyReasonModalComponent', () => {
  let component: VaccineSurveyReasonModalComponent;
  let fixture: ComponentFixture<VaccineSurveyReasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineSurveyReasonModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaccineSurveyReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
