import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css'],
})
export class GitComponent implements OnInit {
  message;
  branches: string[];

  advanced: boolean = false;

  @Input('current_configuration')
  current_configuration: Configuration;

  @Input('con_step')
  con_step: number;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (!this.current_configuration.git.folder.name) {
      this.current_configuration.git.folder.name = '/config';
      this.refreshAttributes();
      this.current_configuration.git.branch = 'select a branch';
    }else{
      this.branches = [this.current_configuration.git.branch]
    }
  }

  validateInput(): boolean {
    const invalids = [];

    return true;
  }

  validateGitConnection(): boolean {
    this.current_configuration.git.valid = true;
    this.message = 'connection to git was successful';
    return false;
  }

  step() {
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit(null);
  }

  refreshBranches() {
    this.branches = ['dev', '13.2.0-RC', '13.2.0.0'];
  }

  refreshAttributes() {
    // set create true
    this.current_configuration.git.folder.create = true;
    this.current_configuration.git.baseline.create = true;
    this.current_configuration.git.triggers.create = true;
    this.current_configuration.git.tables.create = true;
    this.current_configuration.git.delivery.create = true;
    // set names
    this.current_configuration.git.baseline.name =
      this.current_configuration.git.folder.name + '/baseline';
    this.current_configuration.git.triggers.name =
      this.current_configuration.git.folder.name + '/triggers';
    this.current_configuration.git.tables.name =
      this.current_configuration.git.folder.name + '/tables.txt';
    this.current_configuration.git.delivery.name =
      this.current_configuration.git.folder.name + '/delivery_scripts';
  }
}
