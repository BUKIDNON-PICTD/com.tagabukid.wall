import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaccinesurveyPage } from './vaccinesurvey.page';

describe('VaccinesurveyPage', () => {
  let component: VaccinesurveyPage;
  let fixture: ComponentFixture<VaccinesurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinesurveyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinesurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
