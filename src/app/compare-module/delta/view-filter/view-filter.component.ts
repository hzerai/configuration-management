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

  delta_copy: any;

  constructor() {}

  ngOnInit(): void {
    this.delta_copy = JSON.parse(JSON.stringify(this.delta));
    this.delta.changes.forEach((t) => {
      this.tables.push(t.table_name);
      t.records.forEach((r) => {
        this.modules.push(...r.modules);
        this.issues.push(...r.issues);
        this.users.push(r.user);
      });
    });
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.tables = this.tables.filter(onlyUnique);
    this.issues = this.issues.filter(onlyUnique);
    this.modules = this.modules.filter(onlyUnique);
    this.users = this.users.filter(onlyUnique);
  }

  filter(filter) {
    if (!this.filters) {
      this.filters = [];
    }
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
    var changes = JSON.parse(JSON.stringify(this.delta_copy)).changes;
    if (this.filters['table'] && this.filters['table'].length > 0) {
      changes = changes.filter((t) =>
        this.filters['table'].find((tf) => tf === t.table_name)
      );
    }
    if (this.filters['issue'] && this.filters['issue'].length > 0) {
      changes.forEach((t) => {
        let records = t.records.filter((r) =>
          r.issues.find((i) => this.filters['issue'].find((fi) => fi === i))
        );
        t.records = records;
      });
    }
    if (this.filters['module'] && this.filters['module'].length > 0) {
      changes.forEach((t) => {
        let records = t.records.filter((r) =>
          r.modules.find((i) => this.filters['module'].find((fi) => fi === i))
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
  }
  resetFilter() {
    this.delta.changes = JSON.parse(JSON.stringify(this.delta_copy)).changes;
  }
}
