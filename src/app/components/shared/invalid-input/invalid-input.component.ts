import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-input',
  templateUrl: './invalid-input.component.html',
  styleUrls: ['./invalid-input.component.css']
})
export class InvalidInputComponent {
  
  @Input() text!: string;

}
