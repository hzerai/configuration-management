import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Configuration, Connection } from 'src/app/models/models';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
})
export class ConnectComponent implements OnInit {
  advanced: boolean = false;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor(private notifierService: NotifierService) {}

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
      this.current_configuration.source_connection.valid = false;
      this.notifierService.notify('error', 'Invalid ' + invalids.join(', '));
      return false;
    }
    this.current_configuration.source_connection.valid = true;
    return true;
  }

  validateConnection(): boolean {
    if (this.validateInput()) {
      this.notifierService.notify('success', ' Connection successful');
      return true;
    }
    return false;
  }

  defaultPort() {
    if (
      this.current_configuration.source_connection.databaseType === 'PostgreSQL'
    ) {
      this.current_configuration.source_connection.port = 5432;
    } else if (
      this.current_configuration.source_connection.databaseType === 'Oracle'
    ) {
      this.current_configuration.source_connection.port = 1521;
    } else if (
      this.current_configuration.source_connection.databaseType === 'SQL Server'
    ) {
      this.current_configuration.source_connection.port = 1433;
    } else if (
      this.current_configuration.source_connection.databaseType === 'MySQL'
    ) {
      this.current_configuration.source_connection.port = 3306;
    }
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
