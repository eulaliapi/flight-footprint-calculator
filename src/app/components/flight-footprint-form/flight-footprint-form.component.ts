import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateAirport } from 'src/app/directives/validate-airport.directive';

import { Airport } from 'src/app/models/airport.model';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-flight-footprint-form',
  templateUrl: './flight-footprint-form.component.html',
  styleUrls: ['./flight-footprint-form.component.css']
})
export class FlightFootprintFormComponent implements OnInit {

  @Output() newForm = new EventEmitter<FormGroup["value"]>();
  @Input() airports: Airport[] = [];

  flightForm!: FormGroup;
  cabin_class_options: string[] = ['', 'economy', 'premium_economy', 'business', 'first'];

  matchingOriginAirports: Airport[] = [];
  matchingDestinationAirports: Airport[] = [];

  showOriginList: boolean = false;
  showDestinationList: boolean = false;

  selectedOriginAirport: string = '';
  selectedDestinationAirport: string = '';

  constructor(private fb: FormBuilder) {};

  ngOnInit() {
    this.flightForm = this.fb.group({
      origin: ['', [Validators.required, validateAirport]],
      destination: ['', [Validators.required, validateAirport]],
      cabin_class: ['', [Validators.required, Validators.minLength(3)]],
      tickets: ['', [Validators.required, Validators.min(1)]]
    });
  };

  onFocus(e: any) {
    this.getListOfAirports(e.target.name);
  };

  getListOfAirports(formControlName: string): void {
    this.flightForm.get(formControlName)?.valueChanges.pipe(
      tap(() => {this.showOriginList = false; this.showDestinationList = false;}),
      filter((val => typeof val == 'string')),
      map((val) => val.charAt(0).toUpperCase() + val.substring(1).toLowerCase()),
      filter(val => val.length > 1)
    )
    .subscribe(val => {
      if(formControlName == 'origin') {
        this.matchingOriginAirports = this.filterAirports(val)
        this.showOriginList = true;
      } else {
        this.matchingDestinationAirports = this.filterAirports(val)
        this.showDestinationList = true;
      }
    });
  };

  filterAirports(val: string) : Airport[] {
    return this.airports.filter(
      obj => obj.city.startsWith(val) || obj.name.startsWith(val) || obj.country.startsWith(val)
    );
  };

  setAirport(event: [any, Airport]){
    if(event[0].target.parentElement.id === 'origin') {
       this.flightForm.patchValue({origin: event[1]})
       this.selectedOriginAirport = `${event[1].city}, ${event[1].name}, ${event[1].country} (${event[1].code})`;
    } else {
      this.flightForm.patchValue({destination: event[1]})
      this.selectedDestinationAirport = `${event[1].city}, ${event[1].name}, ${event[1].country} (${event[1].code})`;
    };
  };

  onSubmit() {
    this.newForm.emit(this.flightForm.value);
  };

}