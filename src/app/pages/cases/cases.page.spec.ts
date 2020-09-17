import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasesPage } from './cases.page';

describe('CasesPage', () => {
  let component: CasesPage;
  let fixture: ComponentFixture<CasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
