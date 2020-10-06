import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrloglistPage } from './qrloglist.page';

describe('QrloglistPage', () => {
  let component: QrloglistPage;
  let fixture: ComponentFixture<QrloglistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrloglistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrloglistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
