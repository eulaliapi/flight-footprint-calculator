import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  flightInfos?: FormGroup["value"];

  constructor() { }

  ngOnInit(): void {}

  //gets the form and inputs it in flight-footprint-info
  getForm(form: FormGroup["value"]){
    this.flightInfos = form
  };

}
