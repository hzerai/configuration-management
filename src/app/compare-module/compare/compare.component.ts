import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Configuration, Delta } from 'src/app/models/models';
import { table_changes } from '../changes/fakedata';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { initial_state_mock } from '../changes/initial_state_mock';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  @Input('current_configuration')
  current_configuration: Configuration;

  @Input('delta')
  delta: Delta;

  @Output('step')
  stepEvent = new EventEmitter<any>();

  @Output('step_back')
  step_back_event = new EventEmitter<any>();

  initial_state = initial_state_mock;
  table_changes;
  change_with_initial: any[][any] = [];
  changed_tables: string[] = [];
  change_with_initial_temp: any[][any] = [];
  table_names_filtered: string[] = [];
  selectedTable: string;
  search: string;
  commit_message: string;

  commit_author: string = 'root';
  commit_date: Date = new Date();

  pushing: boolean = false;
  pushed: boolean = false;

  constructor(
    private router: Router,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);

    // this.table_changes = this.delta.changes; // TO DO CHANGES BACK
    this.table_changes = table_changes; // TO DO CHANGES BACK
    this.table_changes.forEach((tc) => {
      let ris = this.initial_state.find(
        (is) => is.table_name === tc.table_name
      );
      tc.records.forEach((r) => {
        if (!this.change_with_initial[tc.table_name]) {
          this.change_with_initial[tc.table_name] = [];
          this.changed_tables.push(tc.table_name);
        }
        this.change_with_initial[tc.table_name].push({
          old_state: ris.records.find(
            (oris) => oris.identifier === r.identifier
          )?.state,
          new_state: r?.state,
          change: r,
          table_name: tc.table_name,
          identifier: r.identifier,
        });
      });
    });
    this.table_names_filtered = [...this.changed_tables];
    this.filter();
  }

  filter() {
    if (!this.search || this.search.length < 3) {
      this.changed_tables.forEach((ct) => {
        this.change_with_initial_temp[ct] = JSON.parse(
          JSON.stringify(this.change_with_initial[ct])
        );
      });
      return;
    }
    this.change_with_initial_temp = [];
    this.changed_tables.forEach((ct) => {
      var a = JSON.stringify(this.change_with_initial[ct]);
      if (a.toLowerCase().includes(this.search.toLowerCase())) {
        this.change_with_initial_temp[ct] = JSON.parse(a);
        this.change_with_initial_temp[ct].filtered = true;
      }
    });
  }

  filterTablNames() {
    if (this.selectedTable && this.selectedTable.length > 0) {
      this.table_names_filtered = this.changed_tables.filter((t) =>
        t.toLowerCase().includes(this.selectedTable.toLowerCase())
      );
    } else {
      this.table_names_filtered = [...this.changed_tables];
    }
  }

  commit() {
    if (this.pushed) {
      this.router.navigate(['']);
      return;
    }
    // var commits;
    // const commitsString = window.localStorage.getItem(
    //   'configuration_management_commits'
    // );
    // if (commitsString) {
    //   commits = JSON.parse(commitsString);
    // } else {
    //   commits = [];
    // }
    // commits.push(this.table_changes);
    // window.localStorage.setItem(
    //   'configuration_management_commits',
    //   JSON.stringify(commits)
    // );
    this.notifierService.notify('info', 'Pushing to GIT!', 'COMMIT');
    this.pushing = true;
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    var cm_commits = [];
    if (cm_commits_str) {
      cm_commits = JSON.parse(cm_commits_str);
    }
    var commit_id =
      this.current_configuration.name + '#' + (cm_commits.length + 1);
    cm_commits = cm_commits.filter((c) => commit_id != c.commit_id);
    var commit = {
      commit_id: commit_id,
      commit_message: this.commit_message,
      commit_author: this.commit_author,
      commited_at: this.commit_date,
      configuration_name: this.current_configuration.name,
      changes: this.changed_tables.map((t) => {
        return { table: t, lines: this.change_with_initial[t] };
      }),
    };
    cm_commits.unshift(commit);
    window.localStorage.setItem('cm_commits', JSON.stringify(cm_commits));
    setTimeout(() => {
      this.notifierService.hide('COMMIT');
      this.notifierService.notify(
        'success',
        'Merge request created successfully!'
      );
      this.pushing = false;
      this.pushed = true;
    }, 2000);
  }

  scroll(t) {
    document.getElementById(t).scrollIntoView(false);
  }

  step_back() {
    this.step_back_event.emit(null);
  }

  scrollEvent = (event: any): void => {
    const se: any = !event.srcElement?.scrollingElement;
    if (!se) {
      return;
    }
    const n = se.scrollTop;
    if (n > 0) {
      document.getElementById('right_nav').style.top = '17px';
      document.getElementById('right_nav_tables').style.height = '72vh';
      // document.getElementById('tables_list').style.height = '550px';
    } else {
      // document.getElementById('tables_list').style.height = '400px';
      document.getElementById('right_nav_tables').style.height = '58vh';
      document.getElementById('right_nav').style.top = '100px';
    }
  };
}
