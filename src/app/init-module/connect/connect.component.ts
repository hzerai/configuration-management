import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration, Connection } from 'src/app/models/models';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
})
export class ConnectComponent implements OnInit {
  errorMessage: string;
  connectionStatus: string;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (!this.current_configuration.source_connection.valid) {
      this.current_configuration.source_connection.scripts.commit = true;
      this.current_configuration.source_connection.scripts.download = false;
      this.current_configuration.source_connection.scripts.execute = true;
    }
  }

  validateInput(): boolean {
    const invalids = [];
    if (
      !this.current_configuration.source_connection.hostname ||
      '' == this.current_configuration.source_connection.hostname
    ) {
      invalids.push('hostname');
    }
    if (
      !this.current_configuration.source_connection.port ||
      this.current_configuration.source_connection.port < 0
    ) {
      invalids.push('port');
    }
    if (
      !this.current_configuration.source_connection.database ||
      '' == this.current_configuration.source_connection.database
    ) {
      invalids.push('database');
    }
    if (
      !this.current_configuration.source_connection.user ||
      '' == this.current_configuration.source_connection.user
    ) {
      invalids.push('username');
    }
    if (
      !this.current_configuration.source_connection.databaseType ||
      '' == this.current_configuration.source_connection.databaseType
    ) {
      invalids.push('databaseType');
    }
    if (invalids.length > 0) {
      this.errorMessage = 'Invalid ' + invalids.join(',');
      return false;
    }
    this.current_configuration.source_connection.valid = true;
    this.errorMessage = null;
    return true;
  }

  validateConnection(): boolean {
    if (this.validateInput()) {
      this.connectionStatus = 'SUCCESS';
      return true;
    }
    this.connectionStatus = 'INVALID';
    return false;
  }

  step() {
    if (!this.current_configuration.source_connection.valid) {
      return;
    }
    this.current_configuration.source_connection.summary = `${this.current_configuration.source_connection.databaseType}://${this.current_configuration.source_connection.user}:********@${this.current_configuration.source_connection.hostname}:${this.current_configuration.source_connection.port}/${this.current_configuration.source_connection.database}`;
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit(null);
  }
}
