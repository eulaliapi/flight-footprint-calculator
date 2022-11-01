import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Airport } from '../models/airport.model';
import { Footprint } from '../models/footprint.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FootprintService {

  api_key: string = 'f9530ccb9fad8aa4de6aa625:';

  constructor(private http: HttpClient) { }

  getAirportsList(): Observable<Airport[]> {
    return this.http.get<Airport[]>('../assets/airports.json');
  }

  //gets footprint
  getFootprint(flightInfos: FormGroup["value"]) {
    
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.api_key)
    })

    const httpParams = new HttpParams({
      fromObject: {
        'segments[0][origin]': flightInfos.origin.code,
        'segments[0][destination]': flightInfos.destination.code,
        'cabin_class': flightInfos.cabin_class,
      }
    })
    
    return this.http.get<Footprint>('https://api.goclimate.com/v1/flight_footprint',  {headers: httpHeaders, params: httpParams}).pipe(
      map((obj) =>  obj.footprint)
    )
  }
}
