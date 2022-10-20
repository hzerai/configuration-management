import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css'],
})
export class GitComponent implements OnInit {
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

  constructor(
    private location: Location,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    if (!this.current_configuration.git.valid) {
      this.current_configuration.git.folder.name = '/config';
      this.refreshAttributes();
      this.current_configuration.git.branch = 'Select a branch';
    }
    this.branches = [this.current_configuration.git.branch];
  }

  validateInput(): boolean {
    const invalids = [];

    return true;
  }

  validateGitConnection(): boolean {
    if (
      this.current_configuration.git.repository &&
      this.current_configuration.git.branch != 'Select a branch'
    ) {
      this.current_configuration.git.valid = true;
      this.notifierService.notify(
        'success',
        `connection to ${this.current_configuration.git.repository} was successful`
      );
      return true;
    } else if (!this.current_configuration.git.repository) {
      this.current_configuration.git.valid = false;
      this.notifierService.notify('error', 'Missing repository name');
      return false;
    } else if (this.current_configuration.git.branch == 'Select a branch') {
      this.current_configuration.git.valid = false;
      this.notifierService.notify('error', 'Missing branch name');
      return false;
    } else {
      this.current_configuration.git.valid = false;
      this.notifierService.notify(
        'error',
        'Connection to git was unsuccessful'
      );
      return false;
    }
  }

  step() {
    this.stepEvent.emit(null);
  }

  step_back() {
    this.step_back_event.emit(null);
  }

  refreshBranches() {
    this.branches = [
      'Select a branch',
      'dev',
      '23.1.0-RC1',
      '23.1.0-RC1_SPRINT-1',
      '23.1.0-RC1_SPRINT-2',
      '22.1.0-RC-SNAPSHOT',
      '21.7.0-RC-SNAPSHOT',
      '21.1.0-RC-SNAPSHOT',
      '20.7.0-RC-SNAPSHOT',
    ];
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
      this.current_configuration.git.folder.name + '/tables.json';
    this.current_configuration.git.delivery.name =
      this.current_configuration.git.folder.name + '/delivery_scripts';
  }

  back() {
    this.location.back();
  }
}
