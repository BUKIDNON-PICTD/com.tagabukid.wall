import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VaccinesurveydashboardPage } from './vaccinesurveydashboard.page';

describe('VaccinesurveydashboardPage', () => {
  let component: VaccinesurveydashboardPage;
  let fixture: ComponentFixture<VaccinesurveydashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinesurveydashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinesurveydashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
