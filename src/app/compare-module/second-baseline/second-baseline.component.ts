import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-second-baseline',
  templateUrl: './second-baseline.component.html',
  styleUrls: ['./second-baseline.component.css'],
})
export class SecondBaselineComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  advanced: boolean = false;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.advanced = this.current_configuration.baseline.generate;
  }

  step() {
    this.stepEvent.emit(null);
  }

  step_back() {
    this.current_configuration.baseline.generated =
      this.current_configuration.baseline.generate;
    this.step_back_event.emit();
  }

  generateChanged() {
    this.current_configuration.baseline.download =
      this.current_configuration.baseline.commit =
        this.current_configuration.baseline.generate;
  }

  generate() {
    this.current_configuration.baseline.generate = true;
  }
}
