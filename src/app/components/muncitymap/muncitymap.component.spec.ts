import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuncitymapComponent } from './muncitymap.component';

describe('MuncitymapComponent', () => {
  let component: MuncitymapComponent;
  let fixture: ComponentFixture<MuncitymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuncitymapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuncitymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
