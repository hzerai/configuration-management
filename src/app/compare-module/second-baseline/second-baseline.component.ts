import { Component, Input, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-second-baseline',
  templateUrl: './second-baseline.component.html',
  styleUrls: ['./second-baseline.component.css'],
})
export class SecondBaselineComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  advanced: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
