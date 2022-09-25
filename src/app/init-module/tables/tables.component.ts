import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

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
  tables_ready: boolean = false;

  allTablesSearch: string = null;
  selectedTablesSearch: string = null;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    const tables = [
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
    this.all_tables = tables.map((t) => {
      return { table: t, selected: false };
    });
    this.all_tables_temps = [...this.all_tables];
    if (
      this.current_configuration.tables &&
      this.current_configuration.tables.length > 0
    ) {
      this.current_configuration.tables.forEach((t) =>
        this.selected_tables.unshift({ table: t, selected: false })
      );
      this.selected_tables_filtered = [...this.selected_tables];
      this.all_tables_temps = this.all_tables_temps.filter(
        (t) => !this.selected_tables.find((r) => r.table == t.table)
      );
    }
    this.all_tables_temps_filtered = [...this.all_tables_temps];
    this.tables_ready = true;
    // get tables list from service
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

  addSelected() {
    this.all_tables_temps
      .filter((t) => t.selected)
      .forEach((t) => {
        this.selected_tables.unshift(t);
        t.selected = false;
      });
    this.all_tables_temps = this.all_tables_temps.filter(
      (t) => !this.selected_tables.find((r) => r.table == t.table)
    );

    this.selected_tables_filtered = [...this.selected_tables];
    this.all_tables_temps_filtered = [...this.all_tables_temps];
    this.allTableFilter();
    this.selectedTableFilter();
  }
  removeSelected() {
    this.selected_tables
      .filter((t) => t.selected)
      .forEach((t) => {
        this.all_tables_temps.unshift(t);
        t.selected = false;
      });
    this.selected_tables = this.selected_tables.filter(
      (t) => !this.all_tables_temps.find((r) => r.table == t.table)
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
    this.current_configuration.tables = this.selected_tables.map(
      (t) => t.table
    );
    this.stepEvent.emit(null);
  }

  step_back() {
    this.current_configuration.tables = this.selected_tables.map(
      (t) => t.table
    );
    this.step_back_event.emit(null);
  }
}
