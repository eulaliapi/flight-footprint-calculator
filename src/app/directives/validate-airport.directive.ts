import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export function validateAirport(control: AbstractControl) {
  if(typeof control.value === "string") {
    return {invalidObj: true};
  }
  return null
};

@Directive({
  selector: '[appValidateAirport]'
})
export class ValidateAirportDirective {

  constructor() { }

}
