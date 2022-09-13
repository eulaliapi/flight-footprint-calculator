import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFootprintFormComponent } from './flight-footprint-form.component';

describe('FlightFootprintFormComponent', () => {
  let component: FlightFootprintFormComponent;
  let fixture: ComponentFixture<FlightFootprintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFootprintFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFootprintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
