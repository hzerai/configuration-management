import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-insert-operation',
  templateUrl: './compare-insert-operation.component.html',
  styleUrls: ['./compare-insert-operation.component.css'],
})
export class CompareInsertOperationComponent implements OnInit {
  @Input('new')
  new: any;

  allKeys: string[] = [];

  expanded: boolean = false;

  @Input('identifier')
  identifier: string;

  constructor() {}

  ngOnInit(): void {
    this.allKeys = Object.keys(this.new);
  }
}
