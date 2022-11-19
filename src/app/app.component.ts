import { Component} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Airport } from './models/airport.model';
import { FootprintService } from './services/footprint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  airports: Airport[] = [];
  flightFootprintObject?: [number[], FormGroup["value"]];
  
  constructor(private footprintService: FootprintService) {};

  ngOnInit(){
    this.footprintService.getAirportsList().subscribe((airports) => this.airports = airports)
  };

  getForm(event: FormGroup){
    this.footprintService.getFootprint(event).subscribe((footprint) => this.flightFootprintObject = [footprint, event])
  };
}
