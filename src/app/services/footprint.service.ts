import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { Airport } from '../models/airport.model';
import { Footprint } from '../models/footprint.model';
import { FlightForm } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FootprintService {

  api_key: string = 'f9530ccb9fad8aa4de6aa625:';
  origin: string = '';
  destination: string = '';
  cabinClass: string = '';

  constructor(private http: HttpClient) { }

  getAirportsList(): Observable<Airport[]> {
    return this.http.get<Airport[]>('../assets/airports.json');
  }

  //receives the form and sets its values as what will pass as paramaters in getFootprint()
  getParams(obj: FlightForm) {
    this.origin = obj.getOriginCode();
    this.destination = obj.getDestinationCode();
    this.cabinClass = obj.getCabinClass();
  }

  //gets footprint
  getFootprint(): Observable<Footprint["footprint"]> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.api_key)
    })

    const httpParams = new HttpParams({
      fromObject: {
        'segments[0][origin]': this.origin,
        'segments[0][destination': this.destination,
        'cabin_class': this.cabinClass,
      }
    })
    
    return this.http.get<Footprint>('https://api.goclimate.com/v1/flight_footprint',  {headers: httpHeaders, params: httpParams}).pipe(
      map((obj) =>  obj.footprint)
    )
  }
}
