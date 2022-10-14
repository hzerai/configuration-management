import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/models/models';

@Component({
  selector: 'app-view-one-change',
  templateUrl: './view-one-change.component.html',
  styleUrls: ['./view-one-change.component.css'],
})
export class ViewOneChangeComponent implements OnInit {
  @Input('table')
  table: Table;
  expanded: boolean = true;
  changes_summary: string;
  total_changes: number;
  changes_style: any[];
  constructor() {}

  ngOnInit(): void {
    this.total_changes =
      this.table.inserts + this.table.deletes + this.table.updates;

    let insertsString =
      this.table.inserts > 0
        ? this.table.inserts + (this.table.inserts > 1 ? ' inserts' : ' insert')
        : null;
    let updatesString =
      this.table.updates > 0
        ? this.table.updates + (this.table.updates > 1 ? ' updates' : ' update')
        : null;
    let deletesString =
      this.table.deletes > 0
        ? this.table.deletes + (this.table.deletes > 1 ? ' deletes' : ' delete')
        : null;
    if (insertsString) {
      this.changes_summary = insertsString;
    }
    if (updatesString) {
      this.changes_summary = insertsString
        ? this.changes_summary + ' & ' + updatesString
        : updatesString;
    }
    if (deletesString) {
      this.changes_summary =
        insertsString || updatesString
          ? this.changes_summary + ' & ' + deletesString
          : deletesString;
    }
    if (this.changes_summary.match('.* & .* & .*')) {
      var pos = this.changes_summary.indexOf(' & ');
      this.changes_summary =
        this.changes_summary.substring(0, pos) +
        ', ' +
        this.changes_summary.substring(pos + 5);
    }
    this.changes_summary =
      this.total_changes + ' changes: ' + this.changes_summary;
    this.changes_style = [
      { nb: this.table.inserts, style: this.table.inserts > 0 ? 'green' : '' },
      { nb: this.table.updates, style: this.table.updates > 0 ? 'yellow' : '' },
      { nb: this.table.deletes, style: this.table.deletes > 0 ? 'red' : '' },
    ].sort((s1, s2) => s2.nb - s1.nb);
  }
}
