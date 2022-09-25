export class Configuration {
  name: string;
  source_connection: Connection;
  target_connection: Connection;
  tables: string[];
  scripts: Script;
  initial_state: InitialState;
  created_at: Date;
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
