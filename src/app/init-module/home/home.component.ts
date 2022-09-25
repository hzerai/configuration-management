import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentStep: number = 1;

  current_configuration: Configuration;
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
        }
      }
    }
    if (!this.current_configuration) {
      this.current_configuration = {
        name: null,
        source_connection: {
          hostname: null,
          port: null,
          database: null,
          user: null,
          password: null,
          databaseType: null,
          valid: null,
        },
        target_connection: {
          hostname: null,
          port: null,
          database: null,
          user: null,
          password: null,
          databaseType: null,
          valid: null,
        },
        tables: null,
        scripts: {
          generated: null,
          executed: null,
          downloaded: null,
        },
        initial_state: {
          generated: null,
          skipped: null,
          downloaded: null,
        },
        created_at: null,
      };
    }
  }

  getStepsCss(htmlStep) {
    return htmlStep == this.currentStep
      ? {
          'background-color': 'royalblue',
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
    } else if (
      step == 2 &&
      this.current_configuration.target_connection.valid
    ) {
      this.currentStep = 2;
    } else if (
      step == 3 &&
      this.current_configuration.source_connection.valid &&
      this.current_configuration.target_connection.valid
    ) {
      this.currentStep = 3;
    } else if (
      step == 4 &&
      this.current_configuration.tables &&
      this.current_configuration.source_connection &&
      this.current_configuration.target_connection
    ) {
      this.currentStep = 4;
    } else if (
      step == 5 &&
      this.current_configuration.tables &&
      this.current_configuration.source_connection &&
      this.current_configuration.target_connection
    ) {
      this.currentStep = 5;
    }
  }

  save(event) {
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
  }
}
