export class Configuration {
  name: string;
  source_connection: Connection;
  git: Git;
  tables: string[];
  tables_source: string;
  all_tables: any[];
  baseline: Baseline;
  created_at: Date;
  deltas: Delta[];
  initialized : boolean = false;
}

export class Connection {
  hostname: string;
  port: number;
  database: string;
  user: string;
  password: string;
  databaseType: string;
  scripts: Script;
  summary: string;
  valid: boolean;
}

export class Git {
  repository: string;
  branch: string;
  folder: { name: string; create: boolean };
  triggers: { name: string; create: boolean };
  baseline: { name: string; create: boolean };
  delivery: { name: string; create: boolean };
  tables: { name: string; create: boolean };
  valid: boolean;
}

export class Baseline {
  generate: boolean;
  generated: boolean;
  download: boolean;
  downloaded: boolean;
  commit: boolean;
  commited: boolean;
  uploaded: boolean;
}

export class Script {
  generated: boolean;
  execute: boolean;
  executed: boolean;
  download: boolean;
  downloaded: boolean;
  commit: boolean;
  commited: boolean;
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
  issues: string;
  modules: string;
  date: any;
  user: string;
  query: string;
  state: any;
}

// export class Entity {
//   table_name: string;
//   entity_name: string;
//   identifier : string;
//   super_class: string;
//   sub_classes: string[];
//   owner: { name: string; role: string; fk_table: string; fk_col: string };
//   fields: Field[];
// }

// export class Field {
//   field_name: string;
//   symetric_role: string;
//   column_name: string;
//   composition: boolean;
//   aggregation: boolean;
//   entity_name: string;
// }
