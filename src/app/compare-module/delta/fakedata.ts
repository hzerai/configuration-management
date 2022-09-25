import { Record, Table } from 'src/app/models/models';
import * as moment from 'moment';

const record11: Record = {
  identifier: 'SCREEN_1',
  operation: 'INSERT',
  issues: ['PALM-1541'],
  modules: ['presentation'],
  date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
  user: 'configurator_1',
  query: 'INSERT INTO ent_screen values (...)',
  state: {
    key1: 'new_value_1',
    key2: 'new_value_2',
    key3: 'new_value_3',
    key4: 'new_value_4',
  },
};
const record12: Record = {
  identifier: 'SCREEN_2',
  operation: 'UPDATE',
  issues: ['PALM-1541'],
  modules: ['presentation'],
  date: moment('2022-03-12 10:55:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
  user: 'configurator_7',
  query: 'UPDATE ent_screen SET (...)',
  state: {
    key1: 'value_11_updated',
    key2: 'value_22_updaed',
    key3: 'value_33_updated',
    key4: 'value_44_updated',
  },
};
const record22: Record = {
  identifier: 'MAPPING_1',
  operation: 'UPDATE',
  issues: ['PALM-1545'],
  modules: ['mapping'],
  date: moment('2022-04-13 12:51:50', 'YYYY-MM-DD HH:mm::ss').toDate(),
  user: 'configuration_2',
  query: 'UPDATE ent_mapping set (....)',
  state: {
    key1: 'value_1_updated',
    key2: 'value_2_updaed',
    key3: 'value_3_updated',
    key4: 'value_4_updated',
  },
};
const record33: Record = {
  identifier: 'ST_DIAG_1',
  operation: 'DELETE',
  issues: ['PALM-1511'],
  modules: ['life-cycle'],
  date: moment('2022-03-11 09:15:20', 'YYYY-MM-DD HH:mm::ss').toDate(),
  user: 'configuration_1',
  query: 'DELETE FROM state_lifecycle WHERE (...)',
  state: null,
};

const table1: Table = {
  table_name: 'ent_screen',
  deletes: 0,
  inserts: 1,
  updates: 1,
  records: [record11, record12,record11],
};

const table2: Table = {
  table_name: 'ent_mapping',
  deletes: 0,
  inserts: 0,
  updates: 1,
  records: [record22,record22],
};

const table3: Table = {
  table_name: 'state_lifecycle',
  deletes: 1,
  inserts: 0,
  updates: 0,
  records: [record33,record33,record33,record33],
};

export const fake_tables_changes = [table1, table2, table3];
