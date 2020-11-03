import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuncovidpreviewComponent } from './muncovidpreview.component';

describe('MuncovidpreviewComponent', () => {
  let component: MuncovidpreviewComponent;
  let fixture: ComponentFixture<MuncovidpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuncovidpreviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuncovidpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
