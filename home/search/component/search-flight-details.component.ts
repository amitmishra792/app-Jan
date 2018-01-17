import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
import { SearchFlightService } from './../../search/service/search-flight.service';

import { FlightInfo } from './../../search/model/flight-info';

@Component({
  selector: 'app-search-flight-details',
  templateUrl: './search-flight-details.component.html',
  styleUrls: ['./search-flight-details.component.css'],
})
export class SearchFlightDetailsComponent implements OnInit {
  searchUserForm = new FormGroup({
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    dateOfJourney: new FormControl('', Validators.required)
  });

  dataSource;
  displayedColumns;
  selection;
  rowNumber: number;
  bookingInfo;

  // Handle Login User Here
  onSearchUserFormSubmit(): void {
    let source = '';
    let destination = '';
    this.rowNumber = 5;
    source = this.searchUserForm.get('source').value.trim();
    destination = this.searchUserForm.get('destination').value.trim();
    this.dataSource = new UserDataSource(this.searchFlightService, source, destination);
    this.displayedColumns = ['select', 'flightId', 'flightNumber',
      'flightName', 'source', 'destination', 'price', 'departDate'];
    this.selection = new SelectionModel<FlightInfo>(true, []);
  }

  onClickBookTicket(): void {
    this.rowNumber = 6;
    this.bookingInfo = this.selection.selected ;
    console.log('booking info : ' + this.bookingInfo );
  }

  constructor(private searchFlightService: SearchFlightService) {

  }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = -1;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}

export class UserDataSource extends DataSource<any> {
  source = '';
  destination = '';
  constructor(private searchFlightService: SearchFlightService, source: string,
    destination: string) {
    super();
    this.source = source;
    this.destination = destination;
  }

  connect(): Observable<FlightInfo[]> {
    return this.searchFlightService.searchFlight(this.source, this.destination);
  }

  disconnect() {
  }
}
