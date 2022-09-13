import {Component, Input, OnChanges, OnInit } from '@angular/core';
import { FootprintService } from 'src/app/services/footprint.service';

import { FlightForm } from 'src/app/models/form.model';
import { Footprint } from 'src/app/models/footprint.model';

@Component({
  selector: 'app-flight-footprint-info',
  templateUrl: './flight-footprint-info.component.html',
  styleUrls: ['./flight-footprint-info.component.css']
})
export class FlightFootprintInfoComponent implements OnInit, OnChanges {

  @Input() flightInfosInput?: FlightForm;

  footprint?: Footprint["footprint"];
  
  singleTicketFootprint?: number;
  totalTicketsFootprint?: number;

  constructor(private footprintService: FootprintService) { }

  ngOnInit(): void {
  }

  /*when flightInfosInput != undefined we send the parameters to the service which calls the API,
  then we get the footprint based on those params */
  ngOnChanges(): void {

    if(this.flightInfosInput) {
      this.footprintService.getParams(this.flightInfosInput);
      this.footprintService.getFootprint().subscribe({
        next: (value) => {this.footprint = value; this.calculateFootprint(this.footprint)},
        error: err => console.log(err)
      })
    }
    //capire come funziona il catch errori
  }

  //calculates the footprint according to our choices
  calculateFootprint(value: number){
    if(this.flightInfosInput && this.footprint){
      this.singleTicketFootprint = Number((value /1000).toFixed(2));
      this.totalTicketsFootprint = Number((this.singleTicketFootprint * this.flightInfosInput.tickets).toFixed(2));
    }
  }

}
