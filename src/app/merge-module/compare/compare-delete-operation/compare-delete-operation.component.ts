import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-delete-operation',
  templateUrl: './compare-delete-operation.component.html',
  styleUrls: ['./compare-delete-operation.component.css'],
})
export class CompareDeleteOperationComponent implements OnInit {
  @Input('old')
  old: any;

  allKeys: string[] = [];

  expanded: boolean = false;

  @Input('identifier')
  identifier: string;

  constructor() {}

  ngOnInit(): void {
    this.allKeys = Object.keys(this.old);
  }
}
