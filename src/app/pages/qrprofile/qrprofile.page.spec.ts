import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrprofilePage } from './qrprofile.page';

describe('QrprofilePage', () => {
  let component: QrprofilePage;
  let fixture: ComponentFixture<QrprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
