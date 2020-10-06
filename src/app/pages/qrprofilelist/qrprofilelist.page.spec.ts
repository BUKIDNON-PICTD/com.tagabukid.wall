import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrprofilelistPage } from './qrprofilelist.page';

describe('QrprofilelistPage', () => {
  let component: QrprofilelistPage;
  let fixture: ComponentFixture<QrprofilelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrprofilelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrprofilelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
