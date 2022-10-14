import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

const tables_mock = [
  'com_employee',
  'com_person',
  'config_presentation',
  'config_widgets',
  'config_resources',
  'sla_config',
  'lifecycle_configs',
  'mappings_conf',
  'traces_config',
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  all_tables: any[];
  all_tables_temps: any[];
  all_tables_temps_filtered: any[];
  selected_tables: any[] = [];
  selected_tables_filtered: any[] = [];
  tables_loading: boolean = false;

  allTablesSearch: string = null;
  selectedTablesSearch: string = null;

  tables_source: string;

  file: any;

  loaded: boolean = false;

  apiLink: string;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (
      this.current_configuration.tables &&
      this.current_configuration.tables.length > 0
    ) {
      this.prepareTables(
        this.current_configuration.all_tables
          ? this.current_configuration.all_tables.map((t) => t.table)
          : tables_mock
      );
    }
  }

  prepareTables(tables) {
    this.all_tables = tables.map((t) => {
      return { table: t, selected: false };
    });
    this.all_tables_temps = [...this.all_tables];
    if (
      this.current_configuration.tables &&
      this.current_configuration.tables.length > 0
    ) {
      this.tables_source = this.current_configuration.tables_source;
      this.current_configuration.tables.forEach((t) =>
        this.selected_tables.unshift({ table: t, selected: false })
      );
      this.selected_tables_filtered = [...this.selected_tables];
      this.all_tables_temps = this.all_tables_temps.filter(
        (t) => !this.selected_tables.find((r) => r.table == t.table)
      );
    }
    this.all_tables_temps_filtered = [...this.all_tables_temps];
    this.tables_loading = false;
  }

  allTableFilter() {
    setTimeout(() => {
      if (this.allTablesSearch) {
        this.all_tables_temps_filtered = this.all_tables_temps.filter((v) =>
          v.table.toLowerCase().includes(this.allTablesSearch.toLowerCase())
        );
      } else {
        this.all_tables_temps_filtered = [...this.all_tables_temps];
      }
    }, 1);
  }
  selectedTableFilter() {
    setTimeout(() => {
      if (this.selectedTablesSearch) {
        this.selected_tables_filtered = this.selected_tables.filter((v) =>
          v.table
            .toLowerCase()
            .includes(this.selectedTablesSearch.toLowerCase())
        );
      } else {
        this.selected_tables_filtered = [...this.selected_tables];
      }
    }, 1);
  }

  add(table) {
    table.selected = true;
    this.selected_tables.unshift(table);

    this.all_tables_temps = this.all_tables_temps.filter(
      (t) => t.table != table.table
    );

    this.selected_tables_filtered = [...this.selected_tables];
    this.all_tables_temps_filtered = [...this.all_tables_temps];
    this.allTableFilter();
    this.selectedTableFilter();
  }
  remove(table) {
    table.selected = false;
    this.all_tables_temps.unshift(table);

    this.selected_tables = this.selected_tables.filter(
      (t) => t.table != table.table
    );

    this.all_tables_temps_filtered = [...this.all_tables_temps];
    this.selected_tables_filtered = [...this.selected_tables];
    this.allTableFilter();
    this.selectedTableFilter();
  }

  step() {
    if (this.selected_tables.length == 0) {
      return;
    }
    this.current_configuration.tables_source = this.tables_source;
    this.current_configuration.all_tables = this.all_tables;
    this.current_configuration.tables = this.selected_tables.map(
      (t) => t.table
    );
    this.stepEvent.emit(null);
  }

  step_back() {
    this.current_configuration.tables_source = this.tables_source;
    this.current_configuration.all_tables = this.all_tables;
    this.current_configuration.tables = this.selected_tables.map(
      (t) => t.table
    );
    this.step_back_event.emit(null);
  }

  loadFromGit() {
    this.tables_loading = true;
    setTimeout(() => {
      this.prepareTables(tables_mock);
      this.all_tables_temps.forEach((t) => this.add(t));
    }, 1500);
  }

  loadFromAPI() {
    this.tables_loading = true;
    setTimeout(() => {
      this.prepareTables(tables_mock);
      this.all_tables_temps.forEach((t) => this.add(t));
    }, 1500);
  }

  loadFromDB() {
    this.tables_loading = true;
    setTimeout(() => {
      this.prepareTables(tables_mock);
    }, 1500);
  }

  resetTables() {
    this.loaded = false;
    this.all_tables = null;
    this.all_tables_temps = null;
    this.all_tables_temps_filtered = null;
    this.selected_tables = [] = [];
    this.selected_tables_filtered = [] = [];
    this.tables_loading = false;
    this.allTablesSearch = null;
    this.selectedTablesSearch = null;
  }

  loadFromFile(event) {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    }
    this.tables_loading = true;
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const tabs = fileContent
        .toString()
        .split('\n')
        .map((t) => t.trim())
        .filter((t) => !t.includes(' ') && !(t === ''));
      setTimeout(() => {
        this.tables_source = 'FILE';
        this.prepareTables(tabs);
      }, 1500);
    };
  }
}
