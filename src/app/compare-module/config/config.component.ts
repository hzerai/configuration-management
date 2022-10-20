import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  configs: Configuration[] = [];
  configs_backup: Configuration[] = [];

  configssSearch: string;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    const dbString = window.localStorage.getItem('configuration_management_db');
    if (dbString) {
      this.configs = JSON.parse(dbString);
      this.configs_backup = JSON.parse(dbString);
    }
  }

  deleteConfig(name: string) {
    if (confirm('Are you sure to delete this configuration [' + name + '] ?')) {
      this.configs = this.configs.filter((c) => c.name !== name);
    }
  }

  configsFilter() {
    if (!this.configssSearch) {
      if (this.configs.length != this.configs_backup.length) {
        this.configs = this.configs_backup;
      }
      return;
    }
    this.configs = this.configs_backup.filter((c) =>
      c.name
        .toLowerCase()
        .replace(' ', '')
        .includes(this.configssSearch.replace(' ', ''.toLowerCase()))
    );
  }

  step(config) {
    this.stepEvent.emit(config);
  }
}
