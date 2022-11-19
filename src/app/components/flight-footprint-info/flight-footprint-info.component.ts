import {Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flight-footprint-info',
  templateUrl: './flight-footprint-info.component.html',
  styleUrls: ['./flight-footprint-info.component.css']
})
export class FlightFootprintInfoComponent {

  @Input() flightFootprintObject?: [number[], FormGroup["value"]];

}
