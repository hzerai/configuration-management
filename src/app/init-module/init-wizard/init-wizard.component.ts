import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/models/models';
import { InitializationComponent } from '../initialization/initialization.component';

@Component({
  selector: 'app-init-wizard',
  templateUrl: './init-wizard.component.html',
  styleUrls: ['./init-wizard.component.css'],
})
export class InitWizardComponent implements OnInit {
  currentStep: number = 1;

  current_configuration: Configuration;

  starting: boolean = false;
  started: boolean = false;
  saved : boolean = false;
  @ViewChild(InitializationComponent)
  private initialization = {} as InitializationComponent;

  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    const edit = this.activatedRouter.snapshot.queryParams['edit'];
    if (edit) {
      const dbString = window.localStorage.getItem(
        'configuration_management_db'
      );
      var db: any[] = [];
      if (dbString) {
        db = [...JSON.parse(dbString)];
        const toEdit = db.find((c) => c.name == edit);
        if (toEdit) {
          this.current_configuration = toEdit;
          this.current_configuration.source_connection.scripts.generated =
            false;
          this.current_configuration.source_connection.scripts.executed = false;
          this.current_configuration.source_connection.scripts.downloaded =
            false;
        }
      }
    }
    if (!this.current_configuration) {
      this.current_configuration = {
        initialized: false,
        name: null,
        source_connection: {
          hostname: null,
          port: null,
          database: null,
          user: null,
          password: null,
          databaseType: null,
          valid: null,
          summary: null,
          scripts: {
            generated: null,
            executed: null,
            downloaded: null,
            commit: null,
            commited: null,
            download: null,
            execute: null,
          },
        },
        git: {
          repository: null,
          branch: null,
          folder: { name: null, create: null },
          baseline: { name: null, create: null },
          delivery: { name: null, create: null },
          tables: { name: null, create: null },
          triggers: { name: null, create: null },
          valid: false,
        },
        tables: null,
        tables_source: null,
        all_tables: null,

        baseline: {
          generate: null,
          generated: null,
          downloaded: null,
          commit: null,
          commited: null,
          download: null,
          uploaded: null,
        },
        created_at: null,
        deltas: [],
      };
    }
  }

  getStepsCss(htmlStep) {
    return htmlStep == this.currentStep
      ? {
          'background-color': 'rgb(13,110,253)',
          color: 'white',
          height: '40px',
          width: '40px',
        }
      : {
          'background-color': '#e7eeec',
          color: 'rgba(0, 0, 0, 0.482)',
          height: '40px',
          width: '40px',
        };
  }

  step(step) {
    this.currentStep++;
  }

  step_back(step) {
    this.currentStep--;
  }

  goto(step) {
    if (step == 1) {
      this.currentStep = 1;
    } else if (step == 2 && this.current_configuration.git.valid) {
      this.currentStep = 2;
    } else if (
      step == 3 &&
      this.current_configuration.source_connection.valid &&
      this.current_configuration.git.valid
    ) {
      this.currentStep = 3;
    } else if (
      step == 4 &&
      this.current_configuration.tables &&
      this.current_configuration.source_connection &&
      this.current_configuration.git
    ) {
      this.currentStep = 4;
    } else if (
      step == 5 &&
      this.current_configuration.tables &&
      this.current_configuration.source_connection &&
      this.current_configuration.git
    ) {
      this.currentStep = 5;
    }
  }

  save() {
    this.current_configuration.created_at = new Date();
    const dbString = window.localStorage.getItem('configuration_management_db');
    var db: any[] = [];
    if (dbString) {
      db = [...JSON.parse(dbString)];
    }

    db = db.filter((c) => c.name != this.current_configuration.name);
    db.push(this.current_configuration);
    window.localStorage.setItem(
      'configuration_management_db',
      JSON.stringify(db)
    );
    this.saved = true;
  }

  start() {
    this.starting = true;
    setTimeout(() => {
      this.initialization.init();
      this.starting = false;
      this.started = true;
    }, 2700);
  }
}
