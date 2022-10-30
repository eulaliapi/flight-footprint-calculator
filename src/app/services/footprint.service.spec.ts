import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FootprintService } from './footprint.service';
import { Airport } from '../models/airport.model'
import { FlightForm } from '../models/form.model';
import { Footprint } from '../models/footprint.model';

describe('FootprintService', () => {
  let footprintService: FootprintService;
  let httpTestingController : HttpTestingController;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy : FlightForm = {"originObject": airportDummy[0], "destinationObject": airportDummy[1], "cabin_class" : "economy", "tickets": 2, "getOriginCode" : () => airportDummy[0]["code"], "getDestinationCode" : () => airportDummy[1]["code"], "getCabinClass" : () => "economy", "getTickets": () => 2 };
  let footprintDummy: Footprint = {footprint: 1400, details_url: "", offset_prices: [{ amount: 18000, currency: "SEK", locale: "sv-SE", offset_url: "https://www.goclimate.com/se/flight_offsets/new?offset_params=economy%2CAAR%2CBGM" }]};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ FootprintService ],
    });

    footprintService = TestBed.inject(FootprintService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(footprintService).toBeTruthy();
  });

  it('getAirportsList() should return airports.json', (done: DoneFn) => {

    footprintService.getAirportsList().subscribe( (data) => {
      expect(data).toBeDefined();
      expect(data).toEqual(airportDummy);
    });

    const request = httpTestingController.expectOne('../assets/airports.json');
    expect(request.request.method).toBe("GET");
    request.flush(airportDummy)

    done();
  });

  it('getParams() should set origin, destination, cabinClass values', () => {
    footprintService.getParams(flightFormDummy);
    expect(footprintService.api_key).toBeDefined();
    expect(footprintService.origin).toEqual(flightFormDummy.getOriginCode());
    expect(footprintService.destination).toEqual(flightFormDummy.getDestinationCode());
    expect(footprintService.cabinClass).toEqual(flightFormDummy.getCabinClass());
    
  });

  it('getFootprint() should return Footprint object', (done: DoneFn) => {
    footprintService.getFootprint().subscribe(data => {
      expect(data).toBeDefined();
      expect(data).toEqual(footprintDummy["footprint"])
    });

    const request = httpTestingController.expectOne(
      "https://api.goclimate.com/v1/flight_footprint?segments%5B0%5D%5Borigin%5D=&segments%5B0%5D%5Bdestination=&cabin_class="
    );
    expect(request.request.method).toBe("GET");
    request.flush(footprintDummy);

    done();
  });

});
