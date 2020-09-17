import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvisoriesPage } from './advisories.page';

describe('AdvisoriesPage', () => {
  let component: AdvisoriesPage;
  let fixture: ComponentFixture<AdvisoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvisoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
