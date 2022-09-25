import { Component, Input, OnInit } from '@angular/core';
import { Configuration, Delta } from 'src/app/models/models';
import { fake_tables_changes } from './fakedata';

@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css'],
})
export class DeltaComponent implements OnInit {
  delta: Delta = {
    start_date: null,
    end_date: null,
    issues: null,
    modules: null,
    user: null,
    tables: null,
    changes: null,
  };

  generatingDelta: boolean = false;
  generatedDelta: boolean = false;

  @Input('current_configuration')
  current_configuration: Configuration;

  constructor() {}

  ngOnInit(): void {}

  generateDelta() {
    this.generatingDelta = true;

    setTimeout(() => {
      this.generatedDelta = true;
      this.generatingDelta = false;
      this.delta.changes = fake_tables_changes;
    }, 1000);
  }
}
