import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-with-initial-state',
  templateUrl: './compare-with-initial-state.component.html',
  styleUrls: ['./compare-with-initial-state.component.css']
})
export class CompareWithInitialStateComponent implements OnInit {

  @Input('change_per_table')
  change_per_table: any;

  @Input('table')
  table : string;
  constructor() { }

  ngOnInit(): void {
  }

}
