import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightFootprintFormComponent } from './components/flight-footprint-form/flight-footprint-form.component';
import { FlightFootprintInfoComponent } from './components/flight-footprint-info/flight-footprint-info.component';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { InputComponent } from './components/shared/input/input.component';
import { LabelComponent } from './components/shared/label/label.component';
import { SelectComponent } from './components/shared/select/select.component';
import { ListComponent } from './components/shared/list/list.component';
import { InvalidInputComponent } from './components/shared/invalid-input/invalid-input.component';

import { ValidateAirportDirective } from './directives/validate-airport.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FooterComponent,
    FlightFootprintFormComponent,
    FlightFootprintInfoComponent,
    ValidateAirportDirective,
    ButtonComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    ListComponent,
    InvalidInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
