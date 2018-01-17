import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SearchFlight } from '../model/search-flight';
import { FlightInfo } from '../model/flight-info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchFlightService {

  searchFlightUrl = 'http://localhost:2019/search/searchFlightByUserInput';
  constructor(private http: HttpClient) {
  }

  searchFlight(source: string, destination: string): Observable<FlightInfo[]> {
    let Params = new HttpParams();
    Params = Params.append('source', source);
    Params = Params.append('destination', destination);

    return this.http.get<FlightInfo[]>(this.searchFlightUrl, { params: Params });

  }
}
