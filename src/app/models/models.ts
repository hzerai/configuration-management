export class Configuration {
  name: string;
  source_connection: Connection;
  target_connection: Connection;
  tables: string[];
  scripts: Script;
  initial_state: InitialState;
  created_at: Date;
  deltas: Delta[];
}

export class Connection {
  hostname: string;
  port: number;
  database: string;
  user: string;
  password: string;
  databaseType: string;
  valid: boolean;
}

export class InitialState {
  generated: boolean;
  skipped: boolean;
  downloaded: boolean;
}

export class Script {
  generated: boolean;
  executed: boolean;
  downloaded: boolean;
}

export class Delta {
  start_date: Date;
  end_date: Date;
  issues: string;
  modules: string;
  user: string;
  tables: string;
  changes: Table[];
}

export class Table {
  table_name: string;
  deletes: number;
  inserts: number;
  updates: number;
  records: Record[];
}

export class Record {
  identifier: string;
  operation: string;
  issues: string[];
  modules: string[];
  date: Date;
  user: string;
  query: string;
  state: any;
}

export class Entity {
  table_name: string;
  entity_name: string;
  super_class: string;
  sub_classes: string[];
  owner_class_name : string;
  fields: Field[];
}

export class Field {
  field_name: string;
  column_name: string;
  composition: boolean;
  aggregation: boolean;
  class_name : string;
}
