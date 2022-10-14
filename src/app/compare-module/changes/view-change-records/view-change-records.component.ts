import { Component, Input, OnInit } from '@angular/core';
import { Record } from 'src/app/models/models';

@Component({
  selector: 'app-view-change-records',
  templateUrl: './view-change-records.component.html',
  styleUrls: ['./view-change-records.component.css'],
})
export class ViewChangeRecordsComponent implements OnInit {
  @Input('records')
  records: any[];
  expanded: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
