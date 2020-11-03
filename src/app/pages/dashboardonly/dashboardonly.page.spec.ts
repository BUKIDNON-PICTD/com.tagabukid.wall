import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardonlyPage } from './dashboardonly.page';

describe('DashboardonlyPage', () => {
  let component: DashboardonlyPage;
  let fixture: ComponentFixture<DashboardonlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardonlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardonlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
