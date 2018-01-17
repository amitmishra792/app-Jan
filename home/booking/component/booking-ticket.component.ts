import { FlightInfo } from './../../search/model/flight-info';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.css'],
})
export class BookingTicketComponent implements OnInit {

  @Input() bookingInfo: Array<FlightInfo>;

  constructor() { }

  ngOnInit() {
    console.log('booking : ' + this.bookingInfo);
  }

}
