import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Airport } from 'src/app/models/airport.model';
import { FootprintService } from 'src/app/services/footprint.service';

import { FlightFootprintFormComponent } from './flight-footprint-form.component';

describe('FlightFootprintFormComponent', () => {
  let component: FlightFootprintFormComponent;
  let fixture: ComponentFixture<FlightFootprintFormComponent>;
  let footprintServiceSpy: any;

  let airportDummy: Airport[] = [{"code": "ABC", "lat": "-17.3595", "lon": "-145.494", "name": "Abc Airport", "city": "abc city", "state": "abc state", "country": "abc country", "woeid": "1234567", "tz": "abc tz", "phone": "abc phone", "type": "Airports", "email": "abc emails", "url": "abc url", "runway_length": "abc runway", "elev": "abc elev", "icao": "abc icao", "direct_flights": "2", "carriers": "1"}, {"code": "def", "lat": "-17.3595", "lon": "-145.494", "name": "def Airport", "city": "def city", "state": "def state", "country": "def country", "woeid": "1234567", "tz": "def tz", "phone": "def phone", "type": "Airports", "email": "def emails", "url": "def url", "runway_length": "def runway", "elev": "def elev", "icao": "def icao", "direct_flights": "2", "carriers": "1"}];
  let flightFormDummy = <FormGroup>{value: { origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 2}};
  let liHTML = document.createElement('li');
  liHTML.innerText = "testCity, testName, (testCode)"
  let LiItemDummy: HTMLLIElement = liHTML;

  beforeEach(async () => {
    footprintServiceSpy = jasmine.createSpyObj<FootprintService>(['getAirportsList']);

    await TestBed.configureTestingModule({
      declarations: [ FlightFootprintFormComponent ],
      providers: [{provide: FootprintService, useValue: footprintServiceSpy}],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFootprintFormComponent);
    component = fixture.componentInstance;
    spyOn(component, 'loadAirportsList');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have property originInput', () => {
      expect(component.originInput).toBeDefined();
  });

  it('should have property destinationInput', () => {
    expect(component.destinationInput).toBeDefined();
  });

  it('should have property newForm', () => {
    expect(component.newForm).toBeDefined();
  });

  it('airports$ should be empty', () => {
    expect(component.airports$).toEqual([]);
  });

  it('matchingOriginAirports should be empty', () => {
    expect(component.matchingOriginAirports).toEqual([]);
  });

  it('matchingDestinationAirports should be empty', () => {
    expect(component.matchingDestinationAirports).toEqual([]);
  });

  it('noResultsOrigin should be false', () => {
    expect(component.noResultsOrigin).toBeFalse();
  });

  it('noResultsDestination should be false', () => {
    expect(component.noResultsDestination).toBeFalse();
  });

  it('showOriginMatch should be false', () => {
    expect(component.showOriginMatch).toBeFalse();
  });

  it('showDestinationMatch should be false', () => {
    expect(component.showDestinationMatch).toBeFalse();
  });

  it('cabin_class_options should be an array of strings', () => {
    expect(component.cabin_class_options).toBeDefined();
    expect(component.cabin_class_options.length).toBe(4);
    expect(component.cabin_class_options).toEqual(['economy', 'premium_economy', 'business', 'first'])
  });

  it('transformInput() should change its parameter to format "Abcd"', () => {
    let fakeParam = "tEsTvALue";
    spyOn(component, 'transformInput').and.returnValue(
      (fakeParam.toLowerCase()).charAt(0).toUpperCase() + (fakeParam.toLowerCase()).substring(1)
    );

    let transformed = component.transformInput(fakeParam);
    expect(transformed).toEqual("Testvalue");

  });

  it('loadAirportsList() should call footprintService.getAirportsList', () => {
    footprintServiceSpy.getAirportsList.and.returnValue(of(airportDummy));
    expect(component.airports$).toEqual([]);

    expect(component.loadAirportsList).toHaveBeenCalled();
    footprintServiceSpy.getAirportsList().subscribe((data: Airport[]) => {component.airports$ = data});

    expect(component.airports$).toEqual(airportDummy);

  });

  describe('onOriginInput()', () => {

    it('should call transformInput()', () => {
      spyOn(component, 'transformInput');
      let fakeParam = "tEsTvALue";
      component.onOriginInput(fakeParam);
      expect(component.transformInput).toHaveBeenCalled();
    });

    it('onOriginInput(text) should input the airports matching with the query in matchingOriginAirports', () => {
      let fakeParam = "abc";
      component.airports$ = airportDummy;
      component.onOriginInput(fakeParam);
      expect(component.matchingOriginAirports).toEqual([airportDummy[0]]);
    });

    it('should not call transformInput(text) if text.length <= 1', () => {
      spyOn(component, 'transformInput');
      let fakeParam = "t";
      component.onOriginInput(fakeParam);
      expect(component.transformInput).not.toHaveBeenCalled();
    });

    it('should set showOriginMatch as true  if text.length > 1', () => {
      let fakeParam = "test";
      component.onOriginInput(fakeParam);
      expect(component.showOriginMatch).toBeTrue();
    });

    it('should set showOriginMatch as false if text.length <= 1', () => {
      let fakeParam = "t";
      component.onOriginInput(fakeParam);
      expect(component.showOriginMatch).toBeFalse();

    });

    it('should set noResultsOrigin as true if text.length > 1 and  matchingOriginAirports.length is 0', () => {
      let fakeParam = "test";
      component.airports$ = airportDummy;
      component.onOriginInput(fakeParam);
      expect(component.matchingOriginAirports).toEqual([]);
      expect(component.noResultsOrigin).toBeTrue();
    });

  });

  describe('onDestinationInput()', () => {

    it('should call transformInput()', () => {
      spyOn(component, 'transformInput');
      let fakeParam = "tEsTvALue";
      component.onDestinationInput(fakeParam);
      expect(component.transformInput).toHaveBeenCalled();
    });

    it('onDestinationInput(text) should input the airports matching with the query in matchingDestinationAirports', () => {
      let fakeParam = "abc";
      component.airports$ = airportDummy;
      component.onDestinationInput(fakeParam);
      expect(component.matchingDestinationAirports).toEqual([airportDummy[0]]);
    });

    it('should not call transformInput(text) if text.length <= 1', () => {
      spyOn(component, 'transformInput');
      let fakeParam = "t";
      component.onDestinationInput(fakeParam);
      expect(component.transformInput).not.toHaveBeenCalled();
    });

    it('should set showDestinationMatch as true if text.length > 1', () => {
      let fakeParam = "test";
      component.onDestinationInput(fakeParam);
      expect(component.showDestinationMatch).toBeTrue();
    });

    it('should set showDestinationMatch as false if text.length <= 1', () => {
      let fakeParam = "";
      component.onDestinationInput(fakeParam);
      expect(component.showDestinationMatch).toBeFalse();
    });

    it('should set noResultsDestination as true if text.length > 1 and  matchingDestinationAirports.length is 0', () => {
      let fakeParam = "test";
      component.airports$ = airportDummy;
      component.onDestinationInput(fakeParam);
      expect(component.matchingDestinationAirports).toEqual([]);
      expect(component.noResultsDestination).toBeTrue();
    });

  });

  it('onSelectedOrigin(el, airport)', () => {
    spyOn(component.flightForm, 'patchValue');
    component.onSelectedOrigin(LiItemDummy, airportDummy[0]);
    expect(component.flightForm.patchValue).toHaveBeenCalled();
    expect(component.flightForm.patchValue).toHaveBeenCalledWith({origin: airportDummy[0]});
    expect(component.originInput.nativeElement.value).toEqual(LiItemDummy.innerHTML);
    expect(component.showOriginMatch).toBeFalse();
  });

  it('onSelectedDestination(el, airport)', () => {
    spyOn(component.flightForm, 'patchValue');
    component.onSelectedDestination(LiItemDummy, airportDummy[1]);
    expect(component.flightForm.patchValue).toHaveBeenCalled();
    expect(component.flightForm.patchValue).toHaveBeenCalledWith({destination: airportDummy[1]});
    expect(component.destinationInput.nativeElement.value).toEqual(LiItemDummy.innerHTML);
    expect(component.showDestinationMatch).toBeFalse();
  });

  it('onSubmit() should not be called if form is invalid', () => {
    let btnDe = fixture.debugElement.query(By.css('button'));
    let btnEl = btnDe.nativeElement;
    btnEl.click()
    spyOn(component, 'onSubmit');
    fixture.detectChanges();
    expect(btnEl.disabled).toBeTrue();
    expect(component.onSubmit).not.toHaveBeenCalled();
  });

  it('onSubmit() should be passible of call if form is valid', () => {
    spyOn(component, 'onSubmit');
    component.flightForm.setValue({origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 1});
    fixture.detectChanges();
    let btnDe = fixture.debugElement.query(By.css('button'));
    let btnEl = btnDe.nativeElement;
    expect(btnEl.disabled).toBeFalse();
    btnEl.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit() should emit form.value and reset', () => {
    spyOn(component.newForm, 'emit');
    spyOn(component.flightForm, 'reset');
    component.flightForm.setValue({origin: airportDummy[0], destination: airportDummy[1], cabin_class: "economy", tickets: 1});
    component.onSubmit();
    expect(component.newForm.emit).toHaveBeenCalledWith(component.flightForm.value);
    expect(component.flightForm.reset).toHaveBeenCalled();
  })


  describe('HTML Content', () => {

    it('should contain section.column', () => {
      let sectionDe = fixture.debugElement.query(By.css('section.column'));
      let sectionEl = sectionDe.nativeElement;

      expect(sectionEl).toBeDefined();
      
    });

    it('section.column should contain form.form', () => {
      let sectionDe = fixture.debugElement.query(By.css('section.column'));
      let sectionEl = sectionDe.nativeElement;

      expect(sectionEl.children.length).toBe(1);
      expect(sectionEl.children[0]).toBeDefined();
      expect(sectionEl.children[0].localName).toBe('form')
      expect(sectionEl.children[0]).toHaveClass('form');

    });

    describe('form.form', () => {

      it('should be invalid at initialization', () => {
        let formDe = fixture.debugElement.query(By.css('form.form'));
        let formEl = formDe.nativeElement;
        expect(formEl).toHaveClass("ng-invalid");
      });

      it('should contain 4 div.field and 1 div.button-container elements', () => {
        let formDe = fixture.debugElement.query(By.css('form.form'));
        let formEl = formDe.nativeElement;

        expect(formEl.children.length).toBe(5);
        expect(formEl.children[0].localName).toBe('div');
        expect(formEl.children[0]).toHaveClass('field');
        expect(formEl.children[1].localName).toBe('div');
        expect(formEl.children[1]).toHaveClass('field');
        expect(formEl.children[2].localName).toBe('div');
        expect(formEl.children[2]).toHaveClass('field');
        expect(formEl.children[3].localName).toBe('div');
        expect(formEl.children[3]).toHaveClass('field');
        expect(formEl.children[4].localName).toBe('div');
        expect(formEl.children[4]).toHaveClass('button-container');
      });

      describe('first div.field', () => {

        it('should contain label.form-label, input#origin in this order', () => {
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElOne = fieldDivDe[0].nativeElement;
          expect(fieldDivElOne.children.length).toBe(2);
          expect(fieldDivElOne.children[0].localName).toBe('label');
          expect(fieldDivElOne.children[0]).toHaveClass('form-label');
          expect(fieldDivElOne.children[1].localName).toBe('input');
          expect(fieldDivElOne.children[1].id).toBe('origin');
        });

        it('should contain a third child, ul#origin-list, if showOriginMatch is true', () => {
          component.showOriginMatch = true;
          fixture.detectChanges();

          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElOne = fieldDivDe[0].nativeElement;
          expect(fieldDivElOne.children.length).toBe(3);
          expect(fieldDivElOne.children[2].localName).toBe('ul');
          expect(fieldDivElOne.children[2].id).toBe('origin-list');
        });

        it('should contain p.invalid-input if flightForm.origin is invalid and dirty and showOriginMatch is false', () => {
          component.flightForm.controls["origin"].markAsDirty();
          component.flightForm.patchValue({origin: 'ciao'})
          component.showOriginMatch = false;
          fixture.detectChanges();
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElOne = fieldDivDe[0].nativeElement;
          expect(fieldDivElOne.children.length).toBe(3);
          expect(fieldDivElOne.children[2].localName).toBe('p');
          expect(fieldDivElOne.children[2]).toHaveClass('invalid-input');
        })
        
        it('input#origin', () => {
          let inputOriginDe = fixture.debugElement.query(By.css('input#origin'));
          let inputOriginEl = inputOriginDe.nativeElement;
          expect(inputOriginEl.attributes.required).toBeTruthy();
        });

        it('ul#origin-list should be empty at first', () => {
          component.showOriginMatch = true;
          fixture.detectChanges();

          let ulOriginDe = fixture.debugElement.query(By.css('ul#origin-list'));
          let ulOriginEl = ulOriginDe.nativeElement;
          expect(ulOriginEl).toBeDefined();
          expect(ulOriginEl.children.length).toBe(0)
        });

        it('ul#origin-list should have at least one child li if characters input in #originInput are >= 2', () => {
          component.airports$ = airportDummy;
          component.onOriginInput("qwe");
          expect(component.showOriginMatch).toBeTrue();
          fixture.detectChanges();
          let ulOriginDe = fixture.debugElement.query(By.css('ul#origin-list'));
          let ulOriginEl = ulOriginDe.nativeElement;
          expect(ulOriginEl.children.length).toBeGreaterThanOrEqual(1);
        });

        it('if matchingOriginAirports is empty ul#origin-list should have one li child pointing "no results found"', () => {
          component.airports$ = airportDummy;
          component.onOriginInput("qwerty");
          expect(component.matchingOriginAirports).toEqual([]);
          expect(component.noResultsOrigin).toBeTrue();
          fixture.detectChanges();
          let ulOriginDe = fixture.debugElement.query(By.css('ul#origin-list'));
          let ulOriginEl = ulOriginDe.nativeElement;
          expect(ulOriginEl.children.length).toBe(1);
          expect(ulOriginEl.children[0].innerText).toEqual("No results found :(")
        });

        it('if matchingOriginAirports has at least one element it should be rendered in a li inside ul#origin-list', () => {
          component.airports$ = airportDummy;
          component.onOriginInput("ab");
          expect(component.matchingOriginAirports).toEqual([airportDummy[0]]);
          expect(component.noResultsOrigin).toBeFalse();
          fixture.detectChanges();
          let ulOriginDe = fixture.debugElement.query(By.css('ul#origin-list'));
          let ulOriginEl = ulOriginDe.nativeElement;
          expect(ulOriginEl.children.length).toEqual(component.matchingOriginAirports.length);
          expect(ulOriginEl.children[0].localName).toBe("li");
          expect(ulOriginEl.children[0].innerText).toBe(
            `${component.matchingOriginAirports[0].city}, ${component.matchingOriginAirports[0].name} (${component.matchingOriginAirports[0].code})`
          );
        });

        it('if noResultsOrigin is false and matchingOriginAirports is not empty when li in ul#origin-list is clicked, onSelectedOrigin() should be called',() => {
          spyOn(component, 'onSelectedOrigin');
          component.noResultsOrigin = false;
          component.matchingOriginAirports = airportDummy;
          component.showOriginMatch = true;
          fixture.detectChanges();
          let ulOriginDe = fixture.debugElement.query(By.css('ul#origin-list'));
          let ulOriginEl = ulOriginDe.nativeElement;
          let exampleLi = ulOriginEl.children[0];
          exampleLi.click();
          fixture.detectChanges();
          expect(component.onSelectedOrigin).toHaveBeenCalled();
        });

      });

      describe('second div.field', () => {

        it('should contain label.form-label, input#destination in this order', () => {
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElTwo = fieldDivDe[1].nativeElement;
          expect(fieldDivElTwo.children.length).toBe(2);
          expect(fieldDivElTwo.children[0].localName).toBe('label');
          expect(fieldDivElTwo.children[0]).toHaveClass('form-label');
          expect(fieldDivElTwo.children[1].localName).toBe('input');
          expect(fieldDivElTwo.children[1].id).toBe('destination');
        });

        it('should contain a third child, ul#destination-list, if showDestinationMatch is true', () => {
          component.showDestinationMatch = true;
          fixture.detectChanges();

          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElTwo = fieldDivDe[1].nativeElement;
          expect(fieldDivElTwo.children.length).toBe(3);
          expect(fieldDivElTwo.children[2].localName).toBe('ul');
          expect(fieldDivElTwo.children[2].id).toBe('destination-list');
        });

        it('should contain p.invalid-input if flightForm.origin is invalid and dirty and showOriginMatch is false', () => {
          component.flightForm.controls["destination"].markAsDirty();
          component.flightForm.patchValue({destination: 'c'})
          component.showDestinationMatch = false;
          fixture.detectChanges();
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElTwo = fieldDivDe[1].nativeElement;
          expect(fieldDivElTwo.children.length).toBe(3);
          expect(fieldDivElTwo.children[2].localName).toBe('p');
          expect(fieldDivElTwo.children[2]).toHaveClass('invalid-input');
        })

        it('input#destination', () => {
          let inputDestinationDe = fixture.debugElement.query(By.css('input#destination'));
          let inputDestinationEl = inputDestinationDe.nativeElement;
          expect(inputDestinationEl.attributes.required).toBeTruthy();
        });

        it('ul#destination-list should be empty at first', () => {
          component.showDestinationMatch = true;
          fixture.detectChanges();

          let ulDestinationDe = fixture.debugElement.query(By.css('ul#destination-list'));
          let ulDestinationEl = ulDestinationDe.nativeElement;
          expect(ulDestinationEl).toBeDefined();
          expect(ulDestinationEl.children.length).toBe(0)
        });

        it('ul#destination-list should have at least one child li if characters input in #destinationInput are >= 2', () => {
          component.airports$ = airportDummy;
          component.onDestinationInput("rty");
          expect(component.showDestinationMatch).toBeTrue();
          fixture.detectChanges();
          let ulDestinationDe = fixture.debugElement.query(By.css('ul#destination-list'));
          let ulDestinationEl = ulDestinationDe.nativeElement;
          expect(ulDestinationEl.children.length).toBeGreaterThanOrEqual(1);
        });

        it('if matchingDestinationAirports is empty ul#destination-list should have one li child pointing "no results found"', () => {
          component.airports$ = airportDummy;
          component.onDestinationInput("1234");
          expect(component.matchingDestinationAirports).toEqual([]);
          expect(component.noResultsDestination).toBeTrue();
          fixture.detectChanges();
          let ulDestinationDe = fixture.debugElement.query(By.css('ul#destination-list'));
          let ulDestinationEl = ulDestinationDe.nativeElement;
          expect(ulDestinationEl.children.length).toBe(1);
          expect(ulDestinationEl.children[0].innerText).toEqual("No results found :(")
        });

        it('if matchingDestinationAirports has at least one element it should be rendered in a li inside ul#destination-list', () => {
          component.airports$ = airportDummy;
          component.onDestinationInput("ef");
          expect(component.matchingDestinationAirports).toEqual([airportDummy[1]]);
          expect(component.noResultsDestination).toBeFalse();
          fixture.detectChanges();
          let ulDestinationDe = fixture.debugElement.query(By.css('ul#destination-list'));
          let ulDestinationEl = ulDestinationDe.nativeElement;
          expect(ulDestinationEl.children.length).toEqual(component.matchingDestinationAirports.length);
          expect(ulDestinationEl.children[0].localName).toBe("li");
          expect(ulDestinationEl.children[0].innerText).toBe(
            `${component.matchingDestinationAirports[0].city}, ${component.matchingDestinationAirports[0].name} (${component.matchingDestinationAirports[0].code})`
          );
        });

        it('if noResultsDestination is false and matchingDestinationAirports is not empty when li in ul#destination-list is clicked, onSelectedDestination() should be called',() => {
          spyOn(component, 'onSelectedDestination');
          component.noResultsDestination = false;
          component.matchingDestinationAirports = airportDummy;
          component.showDestinationMatch = true;
          fixture.detectChanges();
          let ulDestinationDe = fixture.debugElement.query(By.css('ul#destination-list'));
          let ulDestinationEl = ulDestinationDe.nativeElement;
          let exampleLi = ulDestinationEl.children[0];
          exampleLi.click();
          fixture.detectChanges();
          expect(component.onSelectedDestination).toHaveBeenCalled();
        });

      });

      describe('third div.field', () => {

        it('should contain label.form-label and select.form-input in this order', () => {
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElThree = fieldDivDe[2].nativeElement;

          expect(fieldDivElThree.children.length).toBe(2);
          expect(fieldDivElThree.children[0].localName).toBe("label");
          expect(fieldDivElThree.children[0]).toHaveClass('form-label');
          expect(fieldDivElThree.children[1].localName).toBe("select");
          expect(fieldDivElThree.children[1]).toHaveClass('form-input');
        });

        it('select.form-input', () => {
          let selectInputDe = fixture.debugElement.query(By.css('select.form-input'));
          let selectInputEl = selectInputDe.nativeElement;

          expect(selectInputEl.attributes.required).toBeTruthy();

          expect(selectInputEl.children.length).toEqual(component.cabin_class_options.length);
          expect(selectInputEl.children[0].localName).toBe("option");
          expect(selectInputEl.children[1].localName).toBe("option");
          expect(selectInputEl.children[2].localName).toBe("option");
          expect(selectInputEl.children[3].localName).toBe("option");

          expect(selectInputEl.children[0].innerText && selectInputEl.children[0].value).toEqual(component.cabin_class_options[0]);
          expect(selectInputEl.children[1].innerText && selectInputEl.children[1].value).toEqual(component.cabin_class_options[1]);
          expect(selectInputEl.children[2].innerText && selectInputEl.children[2].value).toEqual(component.cabin_class_options[2]);
          expect(selectInputEl.children[3].innerText && selectInputEl.children[3].value).toEqual(component.cabin_class_options[3]);
          
        });

      });

      describe('fourth div.field', () => {

        it('should contain label.form-label and input#tickets in this order', () => {
          let fieldDivDe = fixture.debugElement.queryAll(By.css('div.field'));
          let fieldDivElFour = fieldDivDe[3].nativeElement;

          expect(fieldDivElFour.children.length).toBe(2);
          expect(fieldDivElFour.children[0].localName).toBe("label");
          expect(fieldDivElFour.children[0]).toHaveClass('form-label');
          expect(fieldDivElFour.children[1].localName).toBe("input");
          expect(fieldDivElFour.children[1].id).toBe('tickets');
        });

        it('input#tickets', () => {
          let inputTicketsDe = fixture.debugElement.query(By.css('input#tickets'));
          let inputTicketsEl = inputTicketsDe.nativeElement;

          expect(inputTicketsEl.attributes.required).toBeTruthy();
          expect(inputTicketsEl.type).toBe("number");
          expect(inputTicketsEl.min).toBe("1");

        });

      })

      describe('div.button-container', () => {

        it('div.button-container and button', () => {
          let buttonContainerDe = fixture.debugElement.query(By.css('div.button-container'));
          let buttonContainerEl = buttonContainerDe.nativeElement;
          let buttonDe = fixture.debugElement.query(By.css('button.button'));
          let buttonEl = buttonDe.nativeElement;

          expect(buttonContainerEl.children.length).toBe(1);
          expect(buttonContainerEl.children[0].localName).toBe("button");
          expect(buttonEl.type).toBe("submit");
        });

        it('button should be disabled if form is not valid', () => {
          let buttonDe = fixture.debugElement.query(By.css('button.button'));
          let buttonEl = buttonDe.nativeElement;

          expect(buttonEl.disabled).toBeTrue();
        })

        it('button should be enabled if form is valid', () => {
          let buttonDe = fixture.debugElement.query(By.css('button.button'));
          let buttonEl = buttonDe.nativeElement;
          component.flightForm.clearAsyncValidators();
          component.flightForm.clearValidators();
          fixture.detectChanges();
          expect(buttonEl.disabled).toBeTrue();
        })

      });
      
    });

  });

});
