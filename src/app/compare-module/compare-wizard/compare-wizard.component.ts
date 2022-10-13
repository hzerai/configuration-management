import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-compare-wizard',
  templateUrl: './compare-wizard.component.html',
  styleUrls: ['./compare-wizard.component.css'],
})
export class CompareWizardComponent implements OnInit {
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
    this.currentStep = step;
  }
}
