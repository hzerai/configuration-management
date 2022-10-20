import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.css'],
})
export class BaseLineComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (
      !this.current_configuration.baseline.source &&
      this.current_configuration.baseline.generate
    )
      this.current_configuration.baseline.source = 'DB';
  }

  step() {
    this.current_configuration.baseline.generated =
      this.current_configuration.baseline.generate;
    if (this.current_configuration.baseline.source == 'SCRATCH') {
      this.current_configuration.baseline.commit = true;
      this.current_configuration.baseline.generate = true;
    }
    this.stepEvent.emit(null);
  }

  step_back() {
    this.current_configuration.baseline.generated =
      this.current_configuration.baseline.generate;
    this.step_back_event.emit();
  }

  generateChanged() {
    if (!this.current_configuration.baseline.generate) {
      this.current_configuration.baseline.download = false;
      this.current_configuration.baseline.commit = false;
    } else {
      this.current_configuration.baseline.commit = true;
    }
  }
}
