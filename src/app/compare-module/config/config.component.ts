import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  configs: Configuration[] = [];

  @Output('step')
  stepEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    const dbString = window.localStorage.getItem('configuration_management_db');
    if (dbString) {
      this.configs = JSON.parse(dbString);
    }
  }

  deleteConfig(name: string) {
    if (confirm('Are you sure to delete this configuration [' + name + '] ?')) {
      this.configs = this.configs.filter((c) => c.name !== name);
    }
  }

  step(config) {
    this.stepEvent.emit(config);
  }
}
