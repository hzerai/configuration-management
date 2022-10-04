import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Configuration, Entity, Record, Table } from 'src/app/models/models';

const table_changes: Table[] = [
  {
    table_name: 'flow_flowin',
    deletes: 0,
    inserts: 0,
    updates: 1,
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
          description_: 'we updated the description here ',
        },
      },
    ],
  },
  {
    table_name: 'io_inputDevice',
    deletes: 0,
    inserts: 0,
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
    ],
  },
];
const initial_state_mock = [
  {
    table_name: 'flow_flowin',
    records: [
      {
        identifier: 'FLOW_1',
        state: {
          identifier_: 'FLOW_1',
          name_: 'a simple flow 1',
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

const metadata_mock: Entity[] = [
  {
    entity_name: 'com.palmyra.flow.FlowIn',
    table_name: 'flow_flowin',
    identifier: 'identifier_',
    owner: null,
    sub_classes: null,
    super_class: null,
    fields: [
      {
        field_name: 'identifier',
        symetric_role: null,
        aggregation: false,
        entity_name: null,
        column_name: 'identifier_',
        composition: false,
      },
      {
        field_name: 'name',
        symetric_role: null,
        aggregation: false,
        entity_name: null,
        column_name: 'name_',
        composition: false,
      },
      {
        field_name: 'description',
        aggregation: false,
        symetric_role: null,
        entity_name: null,
        column_name: 'description_',
        composition: false,
      },
      {
        field_name: 'inputDevice',
        symetric_role: 'flow',
        aggregation: false,
        entity_name: 'com.palmyra.io.InputDevice',
        column_name: 'inputDevice_identifier_',
        composition: true,
      },
    ],
  },
  {
    entity_name: 'com.palmyra.io.InputDevice',
    table_name: 'io_inputDevice',
    identifier: 'identifier_',
    owner: {
      name: 'com.palmyra.flow.FlowIn',
      role: 'flow',
      fk_table: 'owner',
      fk_col: 'inputDevice_identifier_',
    },
    sub_classes: null,
    super_class: null,
    fields: [
      {
        field_name: 'identifier',
        aggregation: false,
        symetric_role: null,
        entity_name: null,
        column_name: 'identifier_',
        composition: false,
      },
      {
        field_name: 'qName',
        aggregation: false,
        symetric_role: null,
        entity_name: null,
        column_name: 'qName_',
        composition: false,
      },
      {
        field_name: 'qDesc',
        aggregation: false,
        symetric_role: null,
        entity_name: null,
        column_name: 'qDesc_',
        composition: false,
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

  metadata = metadata_mock;
  initial_state = initial_state_mock;
  table_changes = table_changes;
  mergedChanges: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.table_changes.forEach((oneChange) => {
      oneChange.records.forEach((r) => {
        this.findOwnerAndAttachSelf(
          null,
          oneChange,
          r,
          null,
          this.metadata.find((m) => m.table_name === oneChange.table_name),
          this.mergedChanges
        );
      });
    });
    console.log(this.mergedChanges);
  }

  findOwnerAndAttachSelf(
    obj,
    tableChanges: Table,
    record: Record,
    newRole: string,
    entityMD: Entity,
    mergedChanges
  ) {
    if (record && entityMD.owner) {
      let obj = {};
      let ownerMd = this.metadata.find(
        (m) => m.entity_name === entityMD.owner.name
      );
      let role = ownerMd.fields.find(
        (f) => entityMD.owner.role === f.symetric_role
      ).field_name;
      obj[role] = record.state;

      return this.findOwnerAndAttachSelf(
        obj,
        tableChanges,
        null,
        role,
        ownerMd,
        mergedChanges
      );
    } else if (record && !entityMD.owner) {
      return this.findOwnerAndAttachSelf(
        record.state,
        tableChanges,
        null,
        null,
        entityMD,
        mergedChanges
      );
    } else if (!record && !entityMD.owner) {
      console.log(obj)
      let oldObj = mergedChanges.find(
        (mc) =>
          mc.entity_name === entityMD.entity_name &&
          mc.identifier === obj[entityMD.identifier]
      );
      if (!oldObj) {
        oldObj = {
          entity_name: entityMD.entity_name,
          object: obj,
          identifier: obj[entityMD.identifier],
          old_state: this.initial_state.find(
            (is) => is.table_name === entityMD.table_name
          ),
        };
        mergedChanges.push(oldObj);
      } else {
        oldObj.object[newRole] = obj[newRole];
      }
      return oldObj;
    }
  }
}
