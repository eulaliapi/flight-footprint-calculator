import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Airport } from 'src/app/models/airport.model';

import { FlightFootprintFormComponent } from './flight-footprint-form.component';

describe('FlightFootprintFormComponent', () => {
  let component: FlightFootprintFormComponent;
  let fixture: ComponentFixture<FlightFootprintFormComponent>;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy = <FormGroup>{value: { origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 2}};
  let eventDummy: any = {target: {name1: 'origin', name2: 'destination'}};
  let mouseEventOriginDummy: any = {target: {parentElement: {id: 'origin'}}};
  let mouseEventDestinationDummy: any = {target: {parentElement: {id: 'destination'}}};

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ FlightFootprintFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule],
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

  it('airports.length should be 0', () => {
    expect(component.airports.length).toBe(0);
  });

  it('cabin_class_options should be an array of 5 items', () => {
    expect(component.cabin_class_options.length).toBe(5);
  });
  
  it('matchingOriginAirports and matchingDestinationAirports should be empty', () => {
    expect(component.matchingOriginAirports.length).toBe(0);
    expect(component.matchingDestinationAirports.length).toBe(0);
  });

  it('showOriginList and showDestinationList should be false', () => {
    expect(component.showOriginList).toBeFalse();
    expect(component.showDestinationList).toBeFalse();
  });

  it('selectedOriginAirports and selectedDestinationAirports should be empty strings', () => {
    expect(component.selectedOriginAirport).toEqual('');
    expect(component.selectedDestinationAirport).toEqual('');
  });

  it('onFocus() should call getListOfAirports()', () => {
    spyOn(component, 'getListOfAirports');
    component.onFocus(eventDummy);
    fixture.detectChanges();
    expect(component.getListOfAirports).toHaveBeenCalled();
  });

  describe('getListOfAirports()', () => {
    it('if formControlName is origin, value is string and value.length is > 1, it should call filterAirports and showOriginList should be true', () => {
      spyOn(component, 'filterAirports');
      component.flightForm.get(eventDummy.target.name1)?.setValue("abc");
      fixture.detectChanges();
      component.getListOfAirports(eventDummy.target.name1);
      expect(component.filterAirports).toHaveBeenCalled();
      expect(component.showOriginList).toBeTrue();
      
    });
    it('if formControlName is destination, value is string and  value.length is > 1, it should call filterAirports and showDestination should be true', () => {
      spyOn(component, 'filterAirports');
      component.flightForm.get(eventDummy.target.name2)?.setValue("def");
      fixture.detectChanges();
      component.getListOfAirports(eventDummy.target.name1);
      expect(component.filterAirports).toHaveBeenCalled();
      expect(component.showDestinationList).toBeTrue();
    });
  });

  describe('setAirport()', () => {
    it('selectedOriginAirports should not be an empty string if event[0].target.parentElement.id is origin', () => {
      component.setAirport([mouseEventOriginDummy, airportDummy[0]]);
      fixture.detectChanges();
      expect(component.selectedOriginAirport).not.toEqual('');
    });

    it('selectedDestinationAirports should not be an empty string if event[0].target.parentElement.id is destination', () => {
      component.setAirport([mouseEventDestinationDummy, airportDummy[1]]);
      fixture.detectChanges();
      expect(component.selectedDestinationAirport).not.toEqual('');
    });
  });

  it('onSubmit should call newForm and emit the form value', () => {
    spyOn(component.newForm, 'emit');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.newForm.emit).toHaveBeenCalled();
  });

  describe('HTML Content', () => {

    it('should contain section#form_section', () => {
      let sectionFormDe = fixture.debugElement.query(By.css('#form_section'));
      let sectionFormEl = sectionFormDe.nativeElement;

      expect(sectionFormEl).toBeDefined();
    });

    it('section#form_section should contain form#form_form', () => {
      let sectionFormDe = fixture.debugElement.query(By.css('#form_section'));
      let sectionFormEl = sectionFormDe.nativeElement;
      let formFormDe = fixture.debugElement.query(By.css('#form_form'));
      let formFormEl = formFormDe.nativeElement;

      expect(sectionFormEl.children.length).toBe(1);
      expect(sectionFormEl.children[0]).toBe(formFormEl);
    });

    it('form#form_form should contain div#form_origin, div#form_destination, div#form_cabin, div#form_tickets, div#form_submit', () => {
      let formFormDe = fixture.debugElement.query(By.css('#form_form'));
      let formFormEl = formFormDe.nativeElement;
      let divFormOriginDe = fixture.debugElement.query(By.css('#form_origin'));
      let divFormOriginEl = divFormOriginDe.nativeElement;
      let divFormDestinationDe = fixture.debugElement.query(By.css('#form_destination'));
      let divFormDestinationEl = divFormDestinationDe.nativeElement;
      let divFormCabinDe = fixture.debugElement.query(By.css('#form_cabin'));
      let divFormCabinEl = divFormCabinDe.nativeElement;
      let divFormTicketsDe = fixture.debugElement.query(By.css('#form_tickets'));
      let divFormTicketsEl = divFormTicketsDe.nativeElement;
      let divFormSubmitDe = fixture.debugElement.query(By.css('#form_submit'));
      let divFormSubmitEl = divFormSubmitDe.nativeElement;

      expect(formFormEl.children.length).toBe(5);
      expect(formFormEl.children[0]).toBe(divFormOriginEl);
      expect(formFormEl.children[1]).toBe(divFormDestinationEl);
      expect(formFormEl.children[2]).toBe(divFormCabinEl);
      expect(formFormEl.children[3]).toBe(divFormTicketsEl);
      expect(formFormEl.children[4]).toBe(divFormSubmitEl);
    });

  });

});
