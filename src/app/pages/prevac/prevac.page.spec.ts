import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrevacPage } from './prevac.page';

describe('PrevacPage', () => {
  let component: PrevacPage;
  let fixture: ComponentFixture<PrevacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrevacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
