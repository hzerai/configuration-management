import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-compare-wizard',
  templateUrl: './compare-wizard.component.html',
  styleUrls: ['./compare-wizard.component.css'],
})
export class CompareWizardComponent implements OnInit {
  delta = {
    start_date: null,
    end_date: null,
    issues: null,
    modules: null,
    user: null,
    tables: null,
    changes: null,
  };
  currentStep: number = 1;
  current_configuration: Configuration;
  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    const conf_name = this.activatedRouter.snapshot.params['name'];
    if (conf_name) {
      if (conf_name) {
        const dbString = window.localStorage.getItem(
          'configuration_management_db'
        );
        var db: any[] = [];
        if (dbString) {
          db = [...JSON.parse(dbString)];
          const toEdit = db.find((c) => c.name == conf_name);
          if (toEdit) {
            this.current_configuration = toEdit;
          }
        }
      }
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
          'background-color': 'white',
          color: 'black',
          height: '40px',
          width: '40px',
        };
  }

  step(step) {
    if (this.currentStep == 1) {
      this.current_configuration = step;
    }
    this.currentStep++;
  }

  step_back(step) {
    this.currentStep--;
  }

  goto(step) {
    // this.currentStep = step;
  }
}
