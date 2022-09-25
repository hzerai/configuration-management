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
  connection: Connection;
  disabled: boolean = false;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Input('con_step')
  con_step: number;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (this.con_step == 1) {
      this.connection = this.current_configuration.source_connection;
      if (this.connection.valid) {
        this.disabled = true;
      }
    } else if (this.con_step == 2) {
      this.connection = this.current_configuration.target_connection;
      if (this.connection.valid) {
        this.disabled = true;
      }
    }
  }

  validateInput(): boolean {
    const invalids = [];
    if (!this.connection.hostname || '' == this.connection.hostname) {
      invalids.push('hostname');
    }
    if (!this.connection.port || this.connection.port < 0) {
      invalids.push('port');
    }
    if (!this.connection.database || '' == this.connection.database) {
      invalids.push('database');
    }
    if (!this.connection.user || '' == this.connection.user) {
      invalids.push('username');
    }
    if (!this.connection.databaseType || '' == this.connection.databaseType) {
      invalids.push('databaseType');
    }
    if (invalids.length > 0) {
      this.errorMessage = 'Invalid ' + invalids.join(',');
      return false;
    }
    this.connection.valid = true;
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
    if (!this.connection.valid) {
      return;
    }
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit(null);
  }
}
