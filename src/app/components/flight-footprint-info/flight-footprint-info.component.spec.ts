import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFootprintInfoComponent } from './flight-footprint-info.component';
import { FootprintService } from 'src/app/services/footprint.service';
import { Airport } from 'src/app/models/airport.model';
import { of } from 'rxjs';
import { Footprint } from 'src/app/models/footprint.model';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

describe('FlightFootprintInfoComponent', () => {
  let component: FlightFootprintInfoComponent;
  let fixture: ComponentFixture<FlightFootprintInfoComponent>;
  let footprintServiceSpy: any;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy = <FormGroup>{value: { origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 2}};
  let footprintDummy: Footprint = {footprint: 1400, details_url: "", offset_prices: [{ amount: 18000, currency: "SEK", locale: "sv-SE", offset_url: "https://www.goclimate.com/se/flight_offsets/new?offset_params=economy%2CAAR%2CBGM" }]};

  beforeEach(async () => {
    footprintServiceSpy = jasmine.createSpyObj<FootprintService>(['getFootprint']);

    await TestBed.configureTestingModule({
      declarations: [ FlightFootprintInfoComponent ],
      providers: [{provide: FootprintService, useValue: footprintServiceSpy}]
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

  it('flightInfosInput should be undefined', () => {
    expect(component.flightInfosInput).toBeUndefined();
  });

  it('singleTicketFootprint should be undefined', () => {
    expect(component.singleTicketFootprint).toBeUndefined();
  });

  it('totalTicketsFootprint should be undefined', () => {
    expect(component.totalTicketsFootprint).toBeUndefined();
  });

  it('footprintService.getFootprint should call calculateFootprint()', () => {
    spyOn(component, 'calculateFootprint');
    component.flightInfosInput = flightFormDummy["value"];
    footprintServiceSpy.getFootprint.and.returnValue(of(footprintDummy["footprint"]));
    fixture.detectChanges();
    component.ngOnChanges();
    expect(component.calculateFootprint).toHaveBeenCalled();
  });

  it('calculateFootprint() should set singleTicketFootprint value and totalTicketsFootprintValue', () => {
    component.flightInfosInput = flightFormDummy["value"];
    fixture.detectChanges();
    component.calculateFootprint(footprintDummy["footprint"]);
    expect(component.singleTicketFootprint).toBeDefined();
    expect(component.totalTicketsFootprint).toBeDefined();
    expect(component.singleTicketFootprint).toEqual(Number((footprintDummy["footprint"]/1000).toFixed(2)));
    expect(component.totalTicketsFootprint).toEqual(Number((component.singleTicketFootprint! * component.flightInfosInput.tickets).toFixed(2)))
  });

  describe('HTML Content', () => {

    it('should contain section.column', () => {
      let sectionDe = fixture.debugElement.query(By.css('section.column'));
      let sectionEl = sectionDe.nativeElement;

      expect(sectionEl).toBeTruthy();
      expect(sectionEl.children.length).toEqual(1)
    });

    it('section.column should contain div.info containing div.card-item if flightInfosInput is undefined', () => {
      let sectionDe = fixture.debugElement.query(By.css('section.column'));
      let sectionEl = sectionDe.nativeElement;
      let divInfoDe = fixture.debugElement.query(By.css('div.info'));
      let divInfoEl = divInfoDe.nativeElement;
      let divCardDe = fixture.debugElement.query(By.css('div.card-item'));
      let divCardEl = divCardDe.nativeElement;
      let pCardDe = fixture.debugElement.query(By.css('p.block-text'));
      let pCardEl = pCardDe.nativeElement;

      expect(sectionEl.children[0]).toBe(divInfoEl);
      expect(divInfoEl.children.length).toBe(1);
      expect(divInfoEl.children[0]).toBe(divCardEl);
      expect(divCardEl.children.length).toBe(1);
      expect(divCardEl.children[0]).toBe(pCardEl);
      expect(pCardEl.innerText).toBe("Enter the details of the flight and find out its emissions.");
    });

    it('section.column should contain div.info containing 3 div.info-item if flightInfosInput is defined', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();

      let sectionDe = fixture.debugElement.query(By.css('section.column'));
      let sectionEl = sectionDe.nativeElement;
      let divInfoDe = fixture.debugElement.query(By.css('div.info'));
      let divInfoEl = divInfoDe.nativeElement;
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemOneEl = divInfoItemDe[0].nativeElement;
      let divInfoItemTwoEl = divInfoItemDe[1].nativeElement;
      let divInfoItemThreeEl = divInfoItemDe[2].nativeElement;

      expect(sectionEl.children.length).toBe(1);
      expect(sectionEl.children[0]).toBe(divInfoEl);
      expect(divInfoEl.children.length).toBe(3);
      expect(divInfoEl.children[0]).toBe(divInfoItemOneEl);
      expect(divInfoEl.children[1]).toBe(divInfoItemTwoEl);
      expect(divInfoEl.children[2]).toBe(divInfoItemThreeEl);
    });

    it('the first div.info-item should contain p, div.arrow-center and another p in this order', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemOneEl = divInfoItemDe[0].nativeElement;
      
      expect(divInfoItemOneEl.children.length).toBe(3);
      expect(divInfoItemOneEl.children[0].localName).toBe('p');
      expect(divInfoItemOneEl.children[1].localName).toBe('div');
      expect(divInfoItemOneEl.children[1]).toHaveClass('arrow-center');
      expect(divInfoItemOneEl.children[2].localName).toBe('p');

    });

    it('first div.info-item first p should render information about the origin of the flight', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemOneEl = divInfoItemDe[0].nativeElement;

      let firstP = divInfoItemOneEl.children[0];
      expect(firstP.children.length).toBe(2);
      expect(firstP.children[0].localName).toBe('span');
      expect(firstP.children[0].innerText).toBe('From');
      expect(firstP.children[1].localName).toBe('span');
      expect(firstP.children[1].innerText).toBe(`${component.flightInfosInput.origin.city}, ${component.flightInfosInput.origin.name} (${component.flightInfosInput.origin.code})`);
      
    });

    it('first div.info-item second p should render information about the arrival of the flight', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemOneEl = divInfoItemDe[0].nativeElement;

      let secondP = divInfoItemOneEl.children[2];
      expect(secondP.children.length).toBe(2);
      expect(secondP.children[0].localName).toBe('span');
      expect(secondP.children[0].innerText).toBe('To');
      expect(secondP.children[1].localName).toBe('span');
      expect(secondP.children[1].innerText).toBe(`${component.flightInfosInput.destination.city}, ${component.flightInfosInput.destination.name} (${component.flightInfosInput.destination.code})`);
    });

    it('second div.info-item should contain p.text-center which should render cabin class flight infos', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemTwoEl = divInfoItemDe[1].nativeElement;
      let pCabinClass = divInfoItemTwoEl.children[0];

      expect(divInfoItemTwoEl.children.length).toBe(1);
      expect(pCabinClass.localName).toBe('p');
      expect(pCabinClass).toHaveClass('text-center');
      expect(pCabinClass.children.length).toBe(2);
      expect(pCabinClass.children[0].localName).toBe('span');
      expect(pCabinClass.children[0]).toHaveClass('text-semibold');
      expect(pCabinClass.children[0].innerText).toBe(component.flightInfosInput.cabin_class + " ");
      expect(pCabinClass.children[1].localName).toBe('span');
      expect(pCabinClass.children[1].innerText).toBe("class flight");
    });

    it('third div.info-item should contain p.text-center.footprint, div.text-center.footprint in this order', () => {
      component.flightInfosInput = flightFormDummy["value"];
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemThreeEl = divInfoItemDe[2].nativeElement;

      expect(divInfoItemThreeEl.children.length).toBe(2);
      expect(divInfoItemThreeEl.children[0].localName).toBe('p');
      expect(divInfoItemThreeEl.children[0]).toHaveClass('text-center');
      expect(divInfoItemThreeEl.children[0]).toHaveClass('footprint');
      expect(divInfoItemThreeEl.children[1].localName).toBe('div');
      expect(divInfoItemThreeEl.children[1]).toHaveClass('text-center');
      expect(divInfoItemThreeEl.children[1]).toHaveClass('footprint');
    });

    it('third div.info-item p.text-center.footprint should render singleTicketFootprint value', () => {
      component.flightInfosInput = flightFormDummy["value"];
      component.singleTicketFootprint = 2;
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemThreeEl = divInfoItemDe[2].nativeElement;

      let pSingTicket = divInfoItemThreeEl.children[0];
      expect(pSingTicket.children.length).toBe(2);
      expect(pSingTicket.children[0].localName).toBe('span');
      expect(pSingTicket.children[0]).toHaveClass('text-semibold');
      expect(pSingTicket.children[0].innerText).toBe(`${component.singleTicketFootprint} tonnes CO2e `);
      expect(pSingTicket.children[1].localName).toBe('span');
      expect(pSingTicket.children[1].innerText).toBe('per ticket');
    });

    it('third div.info-item div.text-center.footprint should render the number of tickets and totalTicketsFootprint value', () => {
      component.flightInfosInput = flightFormDummy["value"];
      component.totalTicketsFootprint = 4;
      fixture.detectChanges();
      let divInfoItemDe = fixture.debugElement.queryAll(By.css('div.info-item'));
      let divInfoItemThreeEl = divInfoItemDe[2].nativeElement;
      
      let divTotalTicket = divInfoItemThreeEl.children[1];
      expect(divTotalTicket.children.length).toBe(2);
      expect(divTotalTicket.children[0].localName).toBe('p');
      expect(divTotalTicket.children[0]).toHaveClass('text-semibold');
      expect(divTotalTicket.children[0].innerText).toBe(`Total (${component.flightInfosInput.tickets} tickets)`);
      expect(divTotalTicket.children[1].innerText).toBe(`${component.totalTicketsFootprint} tonnes CO2e`);

    });

  });
});
