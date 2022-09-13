import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFootprintInfoComponent } from './flight-footprint-info.component';

describe('FlightFootprintInfoComponent', () => {
  let component: FlightFootprintInfoComponent;
  let fixture: ComponentFixture<FlightFootprintInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFootprintInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFootprintInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
