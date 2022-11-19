import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

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
    let airports = this.http.get<Airport[]>('../assets/airports.json').pipe(
      retry(2),
      catchError(this.handleError<Airport[]>('getAirportList'))
    );
    return airports;
  };

  getFootprint(flightInfos: FormGroup["value"]) : Observable<number[]> {
    
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
    
    let flightFootprint = this.http.get<Footprint>('https://api.goclimate.com/v1/flight_footprint',  {headers: httpHeaders, params: httpParams}).pipe(
      retry(3),
      map((obj) => [obj.footprint/1000, obj.footprint/1000 * flightInfos.tickets]),
      catchError(this.handleError<number[]>('getFootprint'))
    )
    return flightFootprint
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}.`);
      return of(result as T)
    }
  };
}
