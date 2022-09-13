import { Component, OnInit } from '@angular/core';
import { FootprintService } from 'src/app/services/footprint.service';

import { FlightForm } from 'src/app/models/form.model';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  flightInfos?: FlightForm;

  constructor() { }

  ngOnInit(): void {
  }

  getFilledForm(form: FlightForm){
    this.flightInfos = form;
  }

}
