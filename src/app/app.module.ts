import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { FooterComponent } from './components/footer/footer.component';
import { FlightFootprintFormComponent } from './components/flight-footprint-form/flight-footprint-form.component';
import { FlightFootprintInfoComponent } from './components/flight-footprint-info/flight-footprint-info.component';
import { ValidateAirportDirective } from './directives/validate-airport.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainContainerComponent,
    FooterComponent,
    FlightFootprintFormComponent,
    FlightFootprintInfoComponent,
    ValidateAirportDirective
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
