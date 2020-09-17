import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapportalPage } from './mapportal.page';

describe('MapportalPage', () => {
  let component: MapportalPage;
  let fixture: ComponentFixture<MapportalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapportalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapportalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
