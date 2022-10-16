import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-view-record-state',
  templateUrl: './view-record-state.component.html',
  styleUrls: ['./view-record-state.component.css'],
})
export class ViewRecordStateComponent implements OnInit {
  @Input('record')
  record: any;
  allKeys: string[];
  constructor() {}

  ngOnInit(): void {
    if(this.record.state){
      this.allKeys = Object.keys(this.record.state);
    }
  }
}
