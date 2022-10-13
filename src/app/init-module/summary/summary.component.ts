import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  @Output('starter')
  starter = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  @Input('current_configuration')
  current_configuration: Configuration;

  constructor() {}

  ngOnInit(): void {}

  step_back() {
    this.step_back_event.emit(null);
  }

  start() {
    this.starter.emit(null);
  }
}
