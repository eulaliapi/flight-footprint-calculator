import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FootprintService } from 'src/app/services/footprint.service';
import { validateAirport } from 'src/app/directives/validate-airport.directive';

import { Airport } from 'src/app/models/airport.model';

@Component({
  selector: 'app-flight-footprint-form',
  templateUrl: './flight-footprint-form.component.html',
  styleUrls: ['./flight-footprint-form.component.css']
})
export class FlightFootprintFormComponent implements OnInit {

  @ViewChild('originInput') originInput!: ElementRef;
  @ViewChild('destinationInput') destinationInput!: ElementRef;

  @Output() newForm = new EventEmitter<FormGroup["value"]>();

  //array of airports
  public airports$: Airport[] = [];

  //arrays of airports that match user's text input
  matchingOriginAirports: Airport[] = [];
  matchingDestinationAirports: Airport[] = [];

  noResultsOrigin: boolean = false;
  noResultsDestination: boolean = false;

  //shows those Airport objects that match what the user has entered in the input field
  showOriginMatch: boolean = false;
  showDestinationMatch: boolean = false;

  //cabin class options
  cabin_class_options: string[] = ['economy', 'premium_economy', 'business', 'first'];

  flightForm = new FormGroup({
    origin: new FormControl('', validateAirport),
    destination: new FormControl('', validateAirport),
    cabin_class: new FormControl(''),
    tickets: new FormControl('')
  });

  constructor(private footprintService: FootprintService ) { }

  ngOnInit(): void {
    this.loadAirportsList()
  }

  //transforms the text inserted by the user in 'Abcd' format
  transformInput(input: string){
    let value = input.toLowerCase();
    return value.charAt(0).toUpperCase() + value.substring(1);
  }

  //gets the list of airports and stores it in a variable
  loadAirportsList(): void {
    this.footprintService.getAirportsList().subscribe( res => this.airports$ = res);
  }

  //filters airports$ to match the value entered by the user in origin input
  onOriginInput(text: string): void {

    if(text.length > 1) {
      let search = this.transformInput(text);
      this.matchingOriginAirports = this.airports$.filter( obj => 
        obj.city.startsWith(search) || obj.name.startsWith(search) || obj.country.startsWith(search)
        || obj.city.includes(text) || obj.name.includes(text) || obj.country.includes(text)
      );
      this.showOriginMatch = true;

      //if no Airport matches what has been entered in the input, the list shows 'No results found :('
        if(this.matchingOriginAirports.length === 0){
          this.noResultsOrigin = true;
        }

    } else {
      this.showOriginMatch = false;
    }

  }

  //filters airports$ to match the value entered in destination input
  onDestinationInput(text: string): void {

    if(text.length > 1) {
      let search = this.transformInput(text);
      this.matchingDestinationAirports = this.airports$.filter( obj => 
        obj.city.startsWith(search) || obj.name.startsWith(search) || obj.country.startsWith(search)
        || obj.city.includes(text) || obj.name.includes(text) || obj.country.includes(text)
      );
      this.showDestinationMatch = true;

      //if no Airport matches what has been entered in the input, the list shows 'No results found :('
        if(this.matchingDestinationAirports.length === 0){
          this.noResultsDestination = true;
        }

    } else {
      this.showDestinationMatch = false;
    }

  }

  //when the user selects a li, its text is displayed in the input and the list disappears
  onSelectedOrigin(el: HTMLLIElement, airport: Airport){
    this.flightForm.patchValue({origin: airport});
    this.originInput.nativeElement.value = el.innerHTML;
    this.showOriginMatch = false;
  }

  //when the user selects a li, its text is displayed in the input and the list disappears
  onSelectedDestination(el: HTMLLIElement, airport: Airport){
    this.flightForm.patchValue({destination: airport});
    this.destinationInput.nativeElement.value = el.innerHTML;
    this.showDestinationMatch = false;
  }

  //outputs the form to main-container
  onSubmit() { 
    this.newForm.emit(this.flightForm.value);
    this.flightForm.reset();
  }

}