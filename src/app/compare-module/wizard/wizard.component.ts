import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit {
  currentStep: number = 1;
  constructor() {}

  ngOnInit(): void {}

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

  goto(step) {}
}
