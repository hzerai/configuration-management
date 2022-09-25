import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Configuration, Delta } from 'src/app/models/models';

@Component({
  selector: 'app-delta-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @Input('delta')
  delta: any;

  @Input('current_configuration')
  current_configuration: Configuration;

  saved: boolean = false;

  total_inserts: number = 0;
  total_deletes: number = 0;
  total_updates: number = 0;
  total_changes: number = 0;
  changes_summary: string = null;

  table_names: string[] = [];
  selectedTable: string;

  constructor() {}

  ngOnInit(): void {
    this.delta.changes.forEach((t) => {
      this.table_names.push(t.table_name);
      this.total_inserts += t.inserts;
      this.total_updates += t.updates;
      this.total_deletes += t.inserts;
    });
    this.total_changes =
      this.total_inserts + this.total_deletes + this.total_updates;

    let insertsString =
      this.total_inserts > 0
        ? '<b>' +
          this.total_inserts +
          (this.total_inserts > 1 ? ' inserts' : ' insert') +
          '</b>'
        : null;
    let updatesString =
      this.total_updates > 0
        ? '<b>' +
          this.total_updates +
          (this.total_updates > 1 ? ' updates' : ' update') +
          '</b>'
        : null;
    let deletesString =
      this.total_deletes > 0
        ? '<b>' +
          this.total_deletes +
          (this.total_deletes > 1 ? ' deletes' : ' delete') +
          '</b>'
        : null;
    if (insertsString) {
      this.changes_summary = insertsString;
    }
    if (updatesString) {
      this.changes_summary = insertsString
        ? this.changes_summary + ' and ' + updatesString
        : updatesString;
    }
    if (deletesString) {
      this.changes_summary =
        insertsString || updatesString
          ? this.changes_summary + ' and ' + deletesString
          : deletesString;
    }
    if (this.changes_summary.match('.* and .* and .*')) {
      var pos = this.changes_summary.indexOf(' and ');
      this.changes_summary =
        this.changes_summary.substring(0, pos) +
        ', ' +
        this.changes_summary.substring(pos + 5);
    }
    this.changes_summary =
      'Showing <b>' +
      this.total_changes +
      ' changed records </b> with ' +
      this.changes_summary;
  }

  saveDelta() {
    if (!this.delta.name || this.delta.name.length == 0)
      this.current_configuration.deltas.push(this.delta);
    this.saved = true;
  }

  scroll(t) {
    document.getElementById(t).scrollIntoView(false);
  }

  download() {
    var a = document.createElement('a');
    const blob = new Blob([JSON.stringify(this.delta)], { type: 'json' });
    a.href = URL.createObjectURL(blob);
    a.download =
      this.current_configuration.name +
      '-delta-' +
      formatDate(new Date(), 'YYYY-MM-dd_HH:mm:ss', 'en') +
      '.json';
    a.click();
  }
}
