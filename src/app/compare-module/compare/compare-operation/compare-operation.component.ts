import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-operation',
  templateUrl: './compare-operation.component.html',
  styleUrls: ['./compare-operation.component.css'],
})
export class CompareOperationComponent implements OnInit {
  @Input('change_per_record')
  change_per_record: any;

  @Input('hr')
  hr : boolean = false;

  operation: 'UPDATE' | 'INSERT' | 'DELETE';
  constructor() {}

  ngOnInit(): void {
    this.operation = this.change_per_record.change.operation;
    console.log(this.operation)
  }
}
