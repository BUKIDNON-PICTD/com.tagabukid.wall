import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrprofiledetailPage } from './qrprofiledetail.page';

describe('QrprofiledetailPage', () => {
  let component: QrprofiledetailPage;
  let fixture: ComponentFixture<QrprofiledetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrprofiledetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrprofiledetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
