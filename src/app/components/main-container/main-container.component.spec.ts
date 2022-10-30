import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Airport } from 'src/app/models/airport.model';
import { FlightForm } from 'src/app/models/form.model';

import { MainContainerComponent } from './main-container.component';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy : FlightForm = {"originObject": airportDummy[0], "destinationObject": airportDummy[1], "cabin_class" : "economy", "tickets": 2, "getOriginCode" : () => airportDummy[0]["code"], "getDestinationCode" : () => airportDummy[1]["code"], "getCabinClass" : () => "economy", "getTickets": () => 2 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContainerComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Content', () => {

    it('should contain main.container', () => {
      let mainDe = fixture.debugElement.query(By.css('main.container'));
      let mainEl = mainDe.nativeElement;
      expect(mainEl).toBeDefined();
    });

  });

  it('flightInfos should be undefined', () => {
    expect(component.flightInfos).toBeUndefined();
  });

  it('getFilledForm() should set the form received as flightInfos value', () => {
    component.getFilledForm(flightFormDummy);
    fixture.detectChanges();
    expect(component.flightInfos).toBeDefined();
    expect(component.flightInfos).toEqual(flightFormDummy);

  });
});
