import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-update-operation',
  templateUrl: './compare-update-operation.component.html',
  styleUrls: ['./compare-update-operation.component.css'],
})
export class CompareUpdateOperationComponent implements OnInit {
  @Input('old')
  old: any;

  @Input('new')
  new: any;

  dirtyKeys: string[] = [];

  allKeys: string[] = [];

  expand: 'A' | 'B' | 'C' = 'A';

  @Input('identifier')
  identifier: string;
  constructor() {}

  ngOnInit(): void {
    this.allKeys = Object.keys(this.old);
    this.allKeys.forEach((k) => {
      if (this.old[k] != this.new[k]) {
        this.dirtyKeys.push(k);
      }
    });
  }
}
