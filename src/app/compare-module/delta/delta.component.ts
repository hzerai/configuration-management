import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cursor } from 'src/app/Cursor';
import { Configuration, Delta } from 'src/app/models/models';
import { table_changes } from '../changes/fakedata';

@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css'],
})
export class DeltaComponent implements OnInit {
  @Input('delta')
  delta: Delta;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  generatingDelta: boolean = false;

  advanced: boolean = false;

  @Input('current_configuration')
  current_configuration: Configuration;
  constructor() {}

  ngOnInit(): void {}

  generateDelta() {
    this.generatingDelta = true;
    Cursor.startLoading(1000)
    setTimeout(() => {
      this.delta.changes = table_changes;
      this.step();
    }, 1000);
  }

  step() {
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit(null);
  }
}
