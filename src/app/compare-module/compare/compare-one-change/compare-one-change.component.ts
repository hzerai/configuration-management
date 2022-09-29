import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/models/models';

@Component({
  selector: 'app-compare-one-change',
  templateUrl: './compare-one-change.component.html',
  styleUrls: ['./compare-one-change.component.css'],
})
export class CompareOneChangeComponent implements OnInit {
  @Input('change')
  change: Table;

  @Input('initial_state')
  initial_state: any;

  @Input('metadata')
  metadata: any;
  constructor() {}

  diffs: any[] = [];

  ngOnInit(): void {
    var entity_md = this.metadata.find(
      (m) => m.table_name === this.change.table_name
    );
    var initial_state_records: any = this.initial_state.find(
      (i) => i.table_name === this.change.table_name
    ).records;
    var changed_tables_records = this.change.records;
    changed_tables_records.forEach((r) => {
      if (r.operation === 'UPDATE') {
        entity_md.fields.forEach((f) => {
          let old_value = initial_state_records.find(
            (cr) => cr.identifier === r.identifier
          ).state[f.column_name];
          let new_value = r.state[f.column_name];
          var one_diff = {
            field_name: f.field_name,
            old_value: old_value,
            new_value: old_value,
            changed: new_value != old_value,
          };
          if (!this.diffs.find((d) => d.entity_name === entity_md.entity_name)) {
            this.diffs.push({
              entity_name: entity_md.entity_name,
              table_name: entity_md.table_name,
              diffs: [one_diff],
            });
          } else {
            this.diffs
              .find((d) => d.entity_name === entity_md.entity_name)
              .diffs.push(one_diff);
          }
        });
      }
    });
  }
}
