import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Configuration, Table } from 'src/app/models/models';

const table_changes: Table[] = [
  {
    table_name: 'flow_flowin',
    deletes: 1,
    inserts: 0,
    updates: 2,
    records: [
      {
        identifier: 'FLOW_1',
        operation: 'UPDATE',
        issues: ['PALM-1541'],
        modules: ['flow'],
        date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
        user: 'administrator',
        query: 'UPDATE flow_flowin SET (...)',
        state: {
          identifier_: 'FLOW_1',
          name_: 'a simple flow 1',
          nb_: '22',
          description_: 'we updated the description here ',
          inputDevice_identifier_: 'Q1',
        },
      },
      {
        identifier: 'FLOW_2',
        operation: 'UPDATE',
        issues: ['PALM-1541'],
        modules: ['flow'],
        date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
        user: 'administrator',
        query: 'UPDATE flow_flowin SET (...)',
        state: {
          identifier_: 'FLOW_2',
          name_: 'a simple flow 2',
          description_: 'we updated the description here ',
          inputDevice_identifier_: 'Q2',
        },
      },
      {
        identifier: 'FLOW_3',
        operation: 'DELETE',
        issues: ['PALM-1541'],
        modules: ['flow'],
        date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
        user: 'administrator',
        query: 'DELETE flow_flowin SET (...)',
        state: null,
      },
    ],
  },
  {
    table_name: 'io_inputDevice',
    deletes: 0,
    inserts: 1,
    updates: 1,
    records: [
      {
        identifier: 'Q1',
        operation: 'UPDATE',
        issues: ['PALM-1541'],
        modules: ['flow'],
        date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
        user: 'administrator',
        query: 'UPDATE io_inputDevice SET (...)',
        state: {
          identifier_: 'Q1',
          qName_: 'this is a bigger queue',
          qDesc_: 'we changed max connection for the Q ',
        },
      },
      {
        identifier: 'Qq5',
        operation: 'INSERT',
        issues: ['PALM-1541'],
        modules: ['flow'],
        date: moment('2022-04-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
        user: 'administrator',
        query: 'INSERT INTO io_inputDevice VALUES (...)',
        state: {
          identifier_: 'Qq5',
          qName_: 'a new qu',
          qDesc_: 'insert of a new q ',
        },
      },
    ],
  },
];
const initial_state_mock: any[] = [
  {
    table_name: 'flow_flowin',
    records: [
      {
        identifier: 'FLOW_1',
        state: {
          identifier_: 'FLOW_1',
          name_: 'a simple flow 1',
          nb_: null,
          description_: 'testing flow',
          inputDevice_identifier_: 'Q1',
        },
      },
      {
        identifier: 'FLOW_2',
        state: {
          identifier_: 'FLOW_2',
          name_: 'another flow 2',
          description_: 'again, testing flow',
          inputDevice_identifier_: 'Q2',
        },
      },
      {
        identifier: 'FLOW_3',
        state: {
          identifier_: 'FLOW_3',
          name_: 'another flow 3',
          description_: 'again, testing flow',
          inputDevice_identifier_: null,
        },
      },
    ],
  },
  {
    table_name: 'io_inputDevice',
    records: [
      {
        identifier: 'Q1',
        state: {
          identifier_: 'Q1',
          qName_: 'this is a  queue',
          qDesc_: 'max connection 10',
        },
      },
      {
        identifier: 'Q2',
        state: {
          identifier_: 'Q2',
          qName_: 'a Q',
          qDesc_: 'a Q desc',
        },
      },
    ],
  },
];

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  initial_state = initial_state_mock;
  table_changes = table_changes;
  change_with_initial: any[][any] = [];
  changed_tables: string[] = [];
  change_with_initial_temp: any[][any] = [];

  search: string;

  constructor() {}

  ngOnInit(): void {
    this.table_changes.forEach((tc) => {
      let ris = this.initial_state.find(
        (is) => is.table_name === tc.table_name
      );
      tc.records.forEach((r) => {
        if (!this.change_with_initial[tc.table_name]) {
          this.change_with_initial[tc.table_name] = [];
          this.changed_tables.push(tc.table_name);
        }
        this.change_with_initial[tc.table_name].push({
          old_state: ris.records.find(
            (oris) => oris.identifier === r.identifier
          )?.state,
          new_state: r?.state,
          change: r,
          table_name: tc.table_name,
          identifier: r.identifier,
        });
      });
    });
    this.filter();
  }

  filter() {
    if (!this.search || this.search.length < 3) {
      this.changed_tables.forEach((ct) => {
        this.change_with_initial_temp[ct] = JSON.parse(
          JSON.stringify(this.change_with_initial[ct])
        );
      });
      return;
    }
    this.change_with_initial_temp = [];
    this.changed_tables.forEach((ct) => {
      var a = JSON.stringify(this.change_with_initial[ct]);
      if (a.toLowerCase().includes(this.search.toLowerCase())) {
        this.change_with_initial_temp[ct] = JSON.parse(a);
      }
    });
  }
}
