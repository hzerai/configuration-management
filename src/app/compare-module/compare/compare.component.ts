import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Configuration, Entity, Table } from 'src/app/models/models';

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
        },
      },
      {
        identifier: 'FLOW_2',
        state: {
          identifier_: 'FLOW_2',
          name_: 'another flow 2',
          description_: 'again, testing flow',
        },
      },
    ],
  },
  {
    table_name: 'ver_messagedescription',
    records: [
      {
        identifier: 'md_1',
        state: {
          identifier_: 'md_1',
          name_: 'an md state',
          pattern_: '***/l',
        },
      },
      {
        identifier: 'md_2',
        state: {
          identifier_: 'scr2',
          name_: 'another md state',
          pattern_: '[+(...+)]',
        },
      },
    ],
  },
];

const metadata_mock: Entity[] = [
  {
    entity_name: 'com.palmyra.flow.FlowIn',
    table_name: 'flow_flowin',
    owner_class_name: null,
    sub_classes: null,
    super_class: null,
    fields: [
      {
        field_name: 'identifier',
        aggregation: false,
        class_name: null,
        column_name: 'identifier_',
        composition: false,
      },
      {
        field_name: 'name',
        aggregation: false,
        class_name: null,
        column_name: 'name_',
        composition: false,
      },
      {
        field_name: 'description',
        aggregation: false,
        class_name: null,
        column_name: 'description_',
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
  constructor() {}

  ngOnInit(): void {}
}
