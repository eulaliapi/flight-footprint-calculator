import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Airport } from './models/airport.model';
import { Footprint } from './models/footprint.model';
import { FootprintService } from './services/footprint.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let footprintServiceSpy: any;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy = <FormGroup>{value: { origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 2}};
  let flightFootprintObjectDummy: [number[], FormGroup] = [[1, 2], flightFormDummy];

  beforeEach(async () => {
    footprintServiceSpy = jasmine.createSpyObj<FootprintService>(['getAirportsList', 'getFootprint']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{provide: FootprintService, useValue: footprintServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    footprintServiceSpy.getAirportsList.and.returnValue(of(airportDummy));
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('flightFootprintObject should be undefined', () => {
    expect(app.flightFootprintObject).toBeUndefined();
  });

  it('footprintService.getAirportsList should be called', () => {
    expect(footprintServiceSpy.getAirportsList).toHaveBeenCalled();
  });

  it('airports length should be > 0', () =>{
    expect(app.airports.length).toBeGreaterThan(0);
  });

  it('getForm should call footprintService.getFootprint', () => {
    footprintServiceSpy.getFootprint.and.returnValue(of(flightFootprintObjectDummy[0]))
    app.getForm(flightFormDummy);
    fixture.detectChanges();
    expect(footprintServiceSpy.getFootprint).toHaveBeenCalled();
    expect(app.flightFootprintObject).toBeDefined();
    expect(app.flightFootprintObject).toEqual(flightFootprintObjectDummy);
  });

});
