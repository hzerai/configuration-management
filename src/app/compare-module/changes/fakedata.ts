import * as moment from 'moment';
import { Table } from 'src/app/models/models';

export const table_changes: Table[] = [
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
