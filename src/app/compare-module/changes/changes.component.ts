import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cursor } from 'src/app/Cursor';
import { Configuration, Delta } from 'src/app/models/models';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css'],
})
export class ChangesComponent implements OnInit {
  @Input('delta')
  delta: Delta;

  @Input('current_configuration')
  current_configuration: Configuration;

  // saved: boolean = false;

  total_inserts: number = 0;
  total_deletes: number = 0;
  total_updates: number = 0;
  total_changes: number = 0;
  changes_summary: string = null;

  table_names: string[] = [];
  table_names_filtered: string[] = [];
  selectedTable: string;
  commiting : boolean = false;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.delta.changes.forEach((t) => {
      this.table_names.push(t.table_name);
      this.total_inserts += t.inserts;
      this.total_updates += t.updates;
      this.total_deletes += t.inserts;
    });
    this.table_names_filtered = [...this.table_names];

    // DATA AUGMENTATION
    // this.delta.changes.push(...this.delta.changes);
    // this.delta.changes.push(...this.delta.changes);
    // this.delta.changes.push(...this.delta.changes);
    // this.delta.changes.push(...this.delta.changes);
    // this.delta.changes.push(...this.delta.changes);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);
    // this.table_names_filtered.push(...this.table_names);

    // this.table_names_filtered.push(...this.table_names);

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
      'Showing  <b>' +
      this.total_changes +
      ' changed records </b> with ' +
      this.changes_summary;
    document.getElementById('changes_summary').innerHTML = this.changes_summary;
  }

  // saveDelta() {
  //   if (!this.delta.name || this.delta.name.length == 0)
  //     this.current_configuration.deltas.push(this.delta);
  //   this.saved = true;
  // }

  filterTablNames() {
    if (this.selectedTable && this.selectedTable.length > 0) {
      this.table_names_filtered = this.table_names.filter((t) =>
        t.toLowerCase().includes(this.selectedTable.toLowerCase())
      );
    } else {
      this.table_names_filtered = [...this.table_names];
    }
  }

  scroll(t) {
    document.getElementById(t).scrollIntoView(false);
  }

  // download() {
  //   var a = document.createElement('a');
  //   const blob = new Blob([JSON.stringify(this.delta)], { type: 'json' });
  //   a.href = URL.createObjectURL(blob);
  //   a.download =
  //     this.current_configuration.name +
  //     '-delta-' +
  //     formatDate(new Date(), 'YYYY-MM-dd_HH:mm:ss', 'en') +
  //     '.json';
  //   a.click();
  // }
  step() {
    this.commiting = true;
    Cursor.startLoading(1500);
    setTimeout(() => {
      this.commiting = false;
      this.stepEvent.emit(null);
    }, 1000);
  }

  step_back() {
    this.step_back_event.emit(null);
  }
}
