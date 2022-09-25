import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css'],
})
export class ScriptsComponent implements OnInit {
  generating: boolean = false;
  running: boolean = false;
  downloading: boolean = false;
  messages: any[] = [];

  @Input('current_configuration')
  current_configuration: Configuration;

  constructor() {}

  ngOnInit(): void {}

  generateScripts() {
    this.generating = true;
    setTimeout(() => {
      this.generating = false;
      this.current_configuration.scripts.generated = true;
      const msg = {
        type: 'primary',
        title: 'Scripts generated successfully!',
        message: 'You can now run or download the generated scripts',
      };
      this.messages.unshift(msg);
    }, 5000);
  }

  runScripts() {
    this.running = true;
    setTimeout(() => {
      this.running = false;
      this.current_configuration.scripts.executed = true;
      const msg = {
        type: 'success',
        title: 'Scripts executed successfully!',
        message: 'You can still download the executed scripts',
      };
      this.messages.unshift(msg);
    }, 5000);
  }

  downloadScripts() {
    this.downloading = true;
    setTimeout(() => {
      this.downloading = false;
      this.current_configuration.scripts.downloaded = true;
      const msg = {
        type: 'info',
        title: 'Scripts downloaded successfully!',
        message: this.current_configuration.scripts.executed
          ? 'The scripts are already executed!'
          : 'You can now execute the execute the scripts manually or by clicking the Run script button',
      };
      this.messages.unshift(msg);
    }, 5000);
  }

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  step_back() {
    this.step_back_event.emit(null);
  }

  saved: boolean = false;

  @Output('save')
  save = new EventEmitter<any>();

  saveConfig() {
    if (!this.current_configuration.name) {
      return;
    }
    this.save.emit(null);
    this.saved = true;
  }
}
