import {Component, Input, OnChanges, OnInit } from '@angular/core';
import { FootprintService } from 'src/app/services/footprint.service';

import { Footprint } from 'src/app/models/footprint.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flight-footprint-info',
  templateUrl: './flight-footprint-info.component.html',
  styleUrls: ['./flight-footprint-info.component.css']
})
export class FlightFootprintInfoComponent implements OnInit, OnChanges {

  @Input() flightInfosInput?: FormGroup["value"];
  
  singleTicketFootprint?: number;
  totalTicketsFootprint?: number;

  constructor(private footprintService: FootprintService) { }

  ngOnInit(): void {
  }

  /*when flightInfosInput != undefined footprintService is called*/
  ngOnChanges(): void {

    if(this.flightInfosInput) {
      this.footprintService.getFootprint(this.flightInfosInput).subscribe({
        next: (v) => this.calculateFootprint(v),
        error: (err) => console.log(err)
      })
    }
  }

  //calculates the footprint
  calculateFootprint(value: number){
      this.singleTicketFootprint = Number((value /1000).toFixed(2));
      this.totalTicketsFootprint = Number((this.singleTicketFootprint * this.flightInfosInput.tickets).toFixed(2));
  }

}
