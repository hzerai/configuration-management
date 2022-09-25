import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})
export class HeadComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  generating: boolean = false;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  generateInitialState() {
    this.generating = true;
    setTimeout(() => {
      this.generating = false;
      this.current_configuration.initial_state.generated = true;
    }, 3000);
  }

  download() {
    this.current_configuration.initial_state.downloaded = true;
  }

  step() {
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit();
  }
}
