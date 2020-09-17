import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuncitydashboardPage } from './muncitydashboard.page';

describe('MuncitydashboardPage', () => {
  let component: MuncitydashboardPage;
  let fixture: ComponentFixture<MuncitydashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuncitydashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuncitydashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
