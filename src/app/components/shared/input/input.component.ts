import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() type!: string;
  @Input() min!: string;
  @Input() name!: string;
  @Input() value!: string;
  @Output() emitInput = new EventEmitter<FocusEvent>();

  onFocus(event: FocusEvent){
    this.emitInput.emit(event);
  };

}
