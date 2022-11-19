import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFootprintInfoComponent } from './flight-footprint-info.component';
import { Airport } from 'src/app/models/airport.model';
import { By } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

describe('FlightFootprintInfoComponent', () => {
  let component: FlightFootprintInfoComponent;
  let fixture: ComponentFixture<FlightFootprintInfoComponent>;

  let airportDummy: Airport[] = [{ "code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1" }, { "code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1" }];
  let flightFormDummy = <FormGroup>{ value: { origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 2 } };
  let flightFootprintObjectDummy: [number[], FormGroup["value"]] = [[1, 2], flightFormDummy["value"]];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightFootprintInfoComponent],
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

  it('flightFootprintObject should be undefined', () => {
    expect(component.flightFootprintObject).toBeUndefined();
  });

  describe('HTML Content', () => {

    it('should contain a section', () => {
      let sectionDe = fixture.debugElement.query(By.css('section'));
      let sectionEl = sectionDe.nativeElement;
      expect(sectionEl).toBeDefined();
    });

    describe('section content if flightFootprintObject is undefined', () => {

      it('should contain a p element if flightFootprintObject is undefined', () => {
        expect(component.flightFootprintObject).toBeUndefined();
        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;
        let pShowPresentationCardDe = fixture.debugElement.query(By.css('#show-presentation-card_p'));
        let pShowPresentationCardEl = pShowPresentationCardDe.nativeElement;

        expect(sectionEl.children.length).toBe(1);
        expect(sectionEl.children[0]).toBe(pShowPresentationCardEl);
        expect(pShowPresentationCardEl.innerText).toBe("Enter the details of the flight and find out its emissions.");
      });
    });

    describe('section content if flightFootprintObject is defined', () => {

      it('should contain three div elements if flightFootprintObject is defined', () => {
        component.flightFootprintObject = flightFootprintObjectDummy;
        fixture.detectChanges();
        expect(component.flightFootprintObject).toBeDefined();

        let sectionDe = fixture.debugElement.query(By.css('section'));
        let sectionEl = sectionDe.nativeElement;
        let divOriginDestinationInfosDe = fixture.debugElement.query(By.css('#origin-destination-infos'));
        let divOriginDestinationInfosEl = divOriginDestinationInfosDe.nativeElement;
        let divCabinDe = fixture.debugElement.query(By.css('#cabin'));
        let divCabinEl = divCabinDe.nativeElement;
        let divFlightFootprintInfosDe = fixture.debugElement.query(By.css('#flight-footprint-infos'));
        let divFlightFootprintInfosEl = divFlightFootprintInfosDe.nativeElement;

        expect(sectionEl.children.length).toBe(3);
        expect(sectionEl.children[0]).toBe(divOriginDestinationInfosEl);
        expect(sectionEl.children[1]).toBe(divCabinEl);
        expect(sectionEl.children[2]).toBe(divFlightFootprintInfosEl);
      });

      describe('div#origin-destination-infos', () => {

        it('should contain a p, a div and a p in this order', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();

          let divOriginDestinationInfosDe = fixture.debugElement.query(By.css('#origin-destination-infos'));
          let divOriginDestinationInfosEl = divOriginDestinationInfosDe.nativeElement;
          let pOriginInfosDe = fixture.debugElement.query(By.css('#origin-infos'));
          let pOriginInfosEl = pOriginInfosDe.nativeElement;
          let divArrowIconDe = fixture.debugElement.query(By.css('#arrow-icon'));
          let divArrowIconEl = divArrowIconDe.nativeElement;
          let pDestinationInfosDe = fixture.debugElement.query(By.css('#destination-infos'));
          let pDestinationInfosEl = pDestinationInfosDe.nativeElement;

          expect(divOriginDestinationInfosEl.children.length).toBe(3);
          expect(divOriginDestinationInfosEl.children[0]).toBe(pOriginInfosEl);
          expect(divOriginDestinationInfosEl.children[1]).toBe(divArrowIconEl);
          expect(divOriginDestinationInfosEl.children[2]).toBe(pDestinationInfosEl);

        });

        it('p#origin-infos should contain two span elements', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let pOriginInfosDe = fixture.debugElement.query(By.css('#origin-infos'));
          let pOriginInfosEl = pOriginInfosDe.nativeElement;
          let spanOriginInfosLabelDe = fixture.debugElement.query(By.css('#origin-infos_label'));
          let spanOriginInfosLabelEl = spanOriginInfosLabelDe.nativeElement;
          let spanOriginInfosTextDe = fixture.debugElement.query(By.css('#origin-infos_text'));
          let spanOriginInfosTextEl = spanOriginInfosTextDe.nativeElement;

          expect(pOriginInfosEl.children.length).toBe(2);
          expect(pOriginInfosEl.children[0]).toBe(spanOriginInfosLabelEl);
          expect(pOriginInfosEl.children[1]).toBe(spanOriginInfosTextEl);

          expect(spanOriginInfosLabelEl.innerText).toEqual('From')
          expect(spanOriginInfosTextEl.innerText).toEqual(
            `${flightFootprintObjectDummy[1]["origin"]["city"]}, ${flightFootprintObjectDummy[1]["origin"]["country"]}, ${flightFootprintObjectDummy[1]["origin"]["name"]} (${flightFootprintObjectDummy[1]["origin"]["code"]})`
          );
        });

        it('div#arrow-icon should contain a i element', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let divArrowIconDe = fixture.debugElement.query(By.css('#arrow-icon'));
          let divArrowIconEl = divArrowIconDe.nativeElement;
          expect(divArrowIconEl.children.length).toBe(1);
          expect(divArrowIconEl.children[0].localName).toBe('i');
        });

        it('p#destination-infos should contain two span elements', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let pDestinationInfosDe = fixture.debugElement.query(By.css('#destination-infos'));
          let pDestinationInfosEl = pDestinationInfosDe.nativeElement;
          let spanDestinationInfosLabelDe = fixture.debugElement.query(By.css('#destination-infos_label'));
          let spanDestinationInfosLabelEl = spanDestinationInfosLabelDe.nativeElement;
          let spanDestinationInfosTextDe = fixture.debugElement.query(By.css('#destination-infos_text'));
          let spanDestinationInfosTextEl = spanDestinationInfosTextDe.nativeElement;

          expect(pDestinationInfosEl.children.length).toBe(2);
          expect(pDestinationInfosEl.children[0]).toBe(spanDestinationInfosLabelEl);
          expect(pDestinationInfosEl.children[1]).toBe(spanDestinationInfosTextEl);

          expect(spanDestinationInfosLabelEl.innerText).toEqual('To')
          expect(spanDestinationInfosTextEl.innerText).toEqual(
            `${flightFootprintObjectDummy[1]["destination"]["city"]}, ${flightFootprintObjectDummy[1]["destination"]["country"]}, ${flightFootprintObjectDummy[1]["destination"]["name"]} (${flightFootprintObjectDummy[1]["destination"]["code"]})`
          );

        });

      });

      describe('div#cabin', () => {

        it('should contain a p element', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let divCabinDe = fixture.debugElement.query(By.css('#cabin'));
          let divCabinEl = divCabinDe.nativeElement;
          let pCabinDe = fixture.debugElement.query(By.css('#cabin-p'));
          let pCabinEl = pCabinDe.nativeElement;

          expect(divCabinEl.children.length).toBe(1);
          expect(divCabinEl.children[0]).toBe(pCabinEl);
        });

        it('p#cabin-p should contain two span elements', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();

          let pCabinDe = fixture.debugElement.query(By.css('#cabin-p'));
          let pCabinEl = pCabinDe.nativeElement;
          let spanCabinPTextDe = fixture.debugElement.query(By.css('#cabin-p_text'));
          let spanCabinPTextEl = spanCabinPTextDe.nativeElement;
          let spanCabinPLabelDe = fixture.debugElement.query(By.css('#cabin-p_label'));
          let spanCabinPLabelEl = spanCabinPLabelDe.nativeElement;

          expect(pCabinEl.children.length).toBe(2);
          expect(pCabinEl.children[0]).toBe(spanCabinPTextEl);
          expect(pCabinEl.children[1]).toBe(spanCabinPLabelEl);

          expect(spanCabinPTextEl.innerText).toEqual(`${flightFootprintObjectDummy[1]["cabin_class"]} `);
          expect(spanCabinPLabelEl.innerText).toEqual('class flight');

        });

      });

      describe('div#flight-footprint-infos', () => {

        it('should contain a p element and a div element in this order', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();

          let divFlightFootprintInfosDe = fixture.debugElement.query(By.css('#flight-footprint-infos'));
          let divFlightFootprintInfosEl = divFlightFootprintInfosDe.nativeElement;
          let pFlightFootprintSingleDe = fixture.debugElement.query(By.css('#flight-footprint-single'));
          let pFlightFootprintSingleEl = pFlightFootprintSingleDe.nativeElement;
          let divFlightFootprintNTicketsDe = fixture.debugElement.query(By.css('#flight-footprint-ntickets'));
          let divFlightFootprintNTicketsEl = divFlightFootprintNTicketsDe.nativeElement;

          expect(divFlightFootprintInfosEl.children.length).toBe(2);
          expect(divFlightFootprintInfosEl.children[0]).toBe(pFlightFootprintSingleEl);
          expect(divFlightFootprintInfosEl.children[1]).toBe(divFlightFootprintNTicketsEl);
        });

        it('p#flight-footprint-single should contain two span elements', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let pFlightFootprintSingleDe = fixture.debugElement.query(By.css('#flight-footprint-single'));
          let pFlightFootprintSingleEl = pFlightFootprintSingleDe.nativeElement;
          let spanFlightFootprintSingleTextDe = fixture.debugElement.query(By.css('#flight-footprint-single_text'));
          let spanFlightFootprintSingleTextEl = spanFlightFootprintSingleTextDe.nativeElement;
          let spanFlightFootprintSingleLabelDe = fixture.debugElement.query(By.css('#flight-footprint-single_label'));
          let spanFlightFootprintSingleLabelEl = spanFlightFootprintSingleLabelDe.nativeElement;

          expect(pFlightFootprintSingleEl.children.length).toBe(2);
          expect(pFlightFootprintSingleEl.children[0]).toBe(spanFlightFootprintSingleTextEl);
          expect(spanFlightFootprintSingleTextEl.innerText).toEqual(`${flightFootprintObjectDummy[0][0]} tonnes CO2e `);
          expect(pFlightFootprintSingleEl.children[1]).toBe(spanFlightFootprintSingleLabelEl)
          expect(spanFlightFootprintSingleLabelEl.innerText).toBe('per ticket');
        });

        it('div#flight-footprint-ntickets should contain two p elements', () => {
          component.flightFootprintObject = flightFootprintObjectDummy;
          fixture.detectChanges();
          let divFlightFootprintNTicketsDe = fixture.debugElement.query(By.css('#flight-footprint-ntickets'));
          let divFlightFootprintNTicketsEl = divFlightFootprintNTicketsDe.nativeElement;
          let pFlightFootprintNTicketsLabelDe = fixture.debugElement.query(By.css('#flight-footprint-ntickets_label'));
          let pFlightFootprintNTicketsLabelEl = pFlightFootprintNTicketsLabelDe.nativeElement;
          let pFlightFootprintNTicketsTextDe = fixture.debugElement.query(By.css('#flight-footprint-ntickets_text'));
          let pFlightFootprintNTicketsTextEl = pFlightFootprintNTicketsTextDe.nativeElement;

          expect(divFlightFootprintNTicketsEl.children.length).toBe(2);
          expect(divFlightFootprintNTicketsEl.children[0]).toBe(pFlightFootprintNTicketsLabelEl);
          expect(pFlightFootprintNTicketsLabelEl.innerText).toEqual(`Total (${flightFootprintObjectDummy[1]["tickets"]} tickets)`)
          expect(divFlightFootprintNTicketsEl.children[1]).toBe(pFlightFootprintNTicketsTextEl);
          expect(pFlightFootprintNTicketsTextEl.innerText).toEqual(`${flightFootprintObjectDummy[0][1]} tonnes CO2e`)

        });

      });

    });

  });
});
