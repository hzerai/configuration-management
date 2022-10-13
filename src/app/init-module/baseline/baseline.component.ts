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

  advanced: boolean = false;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  step() {
    this.current_configuration.baseline.generated =
      this.current_configuration.baseline.generate;
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
}
