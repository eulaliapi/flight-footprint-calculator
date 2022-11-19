import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Airport } from 'src/app/models/airport.model';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let airportDummy: Airport[] = [{ "code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1" }, { "code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1" }];
  let mouseEventDummy: MouseEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('listOfAirports should be undefined', () => {
    expect(component.listOfAirports).toBeUndefined();
  });

  it('if actionable li is clicked, selectedAirport should be called', () => {
    spyOn(component.selectedAirport, 'emit');
    component.listOfAirports = airportDummy;
    fixture.detectChanges();

    let liActionableDe = fixture.debugElement.queryAll(By.css('li'));
    liActionableDe[0].triggerEventHandler('click', mouseEventDummy);

    expect(component.selectedAirport.emit).toHaveBeenCalledWith([mouseEventDummy, airportDummy[0]]);
    
  });

  it('if li#no-airports is clicked, selectedAirport should not be called', () => {
    spyOn(component.selectedAirport, 'emit');
    component.listOfAirports = [];
    fixture.detectChanges();

    let liNoAirportsDe = fixture.debugElement.query(By.css('#no-airports'));
    liNoAirportsDe.triggerEventHandler('click', null);
    expect(component.selectedAirport.emit).not.toHaveBeenCalled();
  });

  describe('HTML Content', () => {
    it('should contain a ul element', () => {
      let ulDe = fixture.debugElement.query(By.css('ul'));
      let ulEl = ulDe.nativeElement;

      expect(ulEl).toBeDefined();
      expect(ulEl.children.length).toBe(0);
    });

    it('if listOfAirports is defined and its length is > 0, ul should contain n li elements for n elements in listOfAirports', () => {
      let ulDe = fixture.debugElement.query(By.css('ul'));
      let ulEl = ulDe.nativeElement;

      component.listOfAirports = airportDummy;
      component.text = "No results found :(";
      fixture.detectChanges();

      expect(component.listOfAirports).toBeDefined();
      expect(component.listOfAirports.length).toEqual(airportDummy.length);
      expect(component.listOfAirports.length).toBeGreaterThan(0);
      expect(ulEl.children.length).toEqual(component.listOfAirports.length);
      expect(ulEl.children[0].localName).toBe('li');
      expect(ulEl.children[0].innerText).toEqual(`${airportDummy[0].city}, ${airportDummy[0].name}, ${airportDummy[0].country} (${airportDummy[0].code})`);
    });

    it('if listOfAirports is defined but its length is 0, ul should contain li#no-airports', () => {
      let ulDe = fixture.debugElement.query(By.css('ul'));
      let ulEl = ulDe.nativeElement;

      component.listOfAirports = [];
      fixture.detectChanges();

      let liNoAirportsDe = fixture.debugElement.query(By.css('#no-airports'));
      let liNoAirportsEl = liNoAirportsDe.nativeElement;

      expect(component.listOfAirports).toBeDefined();
      expect(ulEl.children.length).toBe(1);
      expect(ulEl.children[0]).toBe(liNoAirportsEl);
    });

  });

  it('li#no-airports should contain text "No results found :(" and should not be actionable', () => {
      component.listOfAirports = [];
      component.text = "No results found :(";
      fixture.detectChanges();

      let liNoAirportsDe = fixture.debugElement.query(By.css('#no-airports'));
      let liNoAirportsEl = liNoAirportsDe.nativeElement;

      expect(liNoAirportsEl.innerText).toEqual(component.text);
  });

});
