import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaderChartComponent } from './rader-chart.component';

describe('RaderChartComponent', () => {
  let component: RaderChartComponent;
  let fixture: ComponentFixture<RaderChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaderChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
