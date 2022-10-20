import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-filter',
  templateUrl: './view-filter.component.html',
  styleUrls: ['./view-filter.component.css'],
})
export class ViewFilterComponent implements OnInit {
  modules: string[] = [];

  issues: string[] = [];

  tables: string[] = [];

  users: string[] = [];

  filters: any[][];

  @Input('delta')
  delta: any;

  delta_changes_copy: any;

  constructor() {}

  ngOnInit(): void {
    this.delta_changes_copy = JSON.parse(JSON.stringify(this.delta.changes));
    this.delta.changes.forEach((t) => {
      this.tables.push(t.table_name);
      t.records.forEach((r) => {
        this.modules.push(
          r.modules.includes(',') ? r.modules.split(',') : r.modules
        );
        this.issues.push(
          r.issues.includes(',') ? r.issues.split(',') : r.issues
        );
        this.users.push(r.user);
      });
    });

    function onlyUnique(value: string, index, self) {
      return self.indexOf(value) === index;
    }

    this.tables = this.tables
      .filter(onlyUnique)
      .filter((o) => o && o.trim() != '')
      .map((o) => o.toLowerCase())
      .sort();
    this.issues = this.issues
      .filter(onlyUnique)
      .filter((o) => o && o.trim() != '')
      .sort();
    this.modules = this.modules
      .filter(onlyUnique)
      .filter((o) => o && o.trim() != '')
      .map((o) => o.toLowerCase())
      .sort();
    this.users = this.users
      .filter(onlyUnique)
      .filter((o) => o && o.trim() != '')
      .map((o) => o.toLowerCase())
      .sort();
    // this.users.push(...this.users)
    // this.users.push(...this.users)
    // this.users.push(...this.users)
    // this.modules.push(...this.modules)
    // this.modules.push(...this.modules)
    // this.issues.push(...this.issues)
    // this.issues.push(...this.issues)
  }

  filter(filter) {
    if (!this.filters) {
      this.filters = [];
    }
    if (filter) {
      if (!this.filters[filter.key]) {
        this.filters[filter.key] = [];
        this.filters[filter.key].push(filter.value);
      } else if (this.filters[filter.key].find((k) => k === filter.value)) {
        this.filters[filter.key] = this.filters[filter.key].filter(
          (k) => k !== filter.value
        );
      } else {
        this.filters[filter.key].push(filter.value);
      }
      var changes = JSON.parse(JSON.stringify(this.delta_changes_copy));
      if (this.filters['table'] && this.filters['table'].length > 0) {
        changes = changes.filter((t) =>
          this.filters['table'].find((tf) => tf === t.table_name)
        );
      }
      if (this.filters['issue'] && this.filters['issue'].length > 0) {
        changes.forEach((t) => {
          let records = t.records.filter((r) =>
            r.issues
              .split(',')
              .find((i) => this.filters['issue'].find((fi) => fi === i))
          );
          t.records = records;
        });
      }
      if (this.filters['module'] && this.filters['module'].length > 0) {
        changes.forEach((t) => {
          let records = t.records.filter((r) =>
            r.modules
              .split(',')
              .find((i) => this.filters['module'].find((fi) => fi === i))
          );
          t.records = records;
        });
      }
      if (this.filters['user'] && this.filters['user'].length > 0) {
        changes.forEach((t) => {
          let records = t.records.filter((r) =>
            this.filters['user'].find((fi) => fi === r.user)
          );
          t.records = records;
        });
      }
      this.delta.changes = changes.filter(
        (c) => c.records && c.records.length > 0
      );
    } else {
      this.delta.changes = changes;
    }
  }
  resetFilter() {
    this.filter(null);
    Array.of(...this.users, ...this.issues, ...this.modules, ...this.tables)
      .map((u) => document.getElementById(u))
      .filter((u: any) => u.checked)
      .forEach((u) => u.click());
  }
}
