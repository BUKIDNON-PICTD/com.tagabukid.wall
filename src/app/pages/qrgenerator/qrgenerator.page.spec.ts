import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrgeneratorPage } from './qrgenerator.page';

describe('QrgeneratorPage', () => {
  let component: QrgeneratorPage;
  let fixture: ComponentFixture<QrgeneratorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrgeneratorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrgeneratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
