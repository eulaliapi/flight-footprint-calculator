import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Airport } from 'src/app/models/airport.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() listOfAirports?: Airport[];
  @Input() text?: string;
  @Input() id!: string;
  @Output() selectedAirport = new EventEmitter<[MouseEvent, Airport]>();

  onClick($event: MouseEvent, airport: Airport){
    this.selectedAirport.emit([$event, airport]);
  }

}
