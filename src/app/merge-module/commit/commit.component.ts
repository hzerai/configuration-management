import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css'],
})
export class CommitComponent implements OnInit {
  commit: any;

  merged: boolean = false;
  merging: boolean = false;
  loading: boolean = true;
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    const commit_id = this.activatedRouter.snapshot.queryParams['id'];
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    if (cm_commits_str) {
      this.commit = JSON.parse(cm_commits_str).find(
        (c) => c.commit_id == commit_id
      );
      var changes = [];
      this.commit.changed_tables = [];
      this.commit.changes.forEach((c) => {
        changes[c.table] = c.lines;
        this.commit.changed_tables.push(c.table);
      });
      this.commit.change_with_initial = changes;
      this.merged =
        this.commit.status == 'MERGED' || this.commit.status == 'CLOSED';
      this.loading = false;
    }
  }

  fromNowDate(date) {
    return moment(date).fromNow();
  }

  merge() {
    if (this.merged) {
      this.router.navigate(['']);
      return;
    }
    this.merging = true;

    this.notifierService.notify(
      'info',
      `Merging ${this.commit.commit_id} now!`,
      'MERGING'
    );
    this.commit.status = 'MERGED';
    this.saveCommit();
    setTimeout(() => {
      this.notifierService.hide('MERGING');
      this.notifierService.notify(
        'success',
        'Your commit was merged successfully!'
      );
      this.merging = false;
      this.merged = true;
    }, 2000);
  }

  close() {
    this.commit.status = 'CLOSED';
    this.saveCommit();
    this.merged = true;
    this.notifierService.notify('warning', 'Merged request closed!');
  }

  saveCommit() {
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    var cm_commits = [];
    if (cm_commits_str) {
      cm_commits = JSON.parse(cm_commits_str);
    }
    cm_commits = cm_commits.filter((c) => this.commit.commit_id != c.commit_id);
    cm_commits.push(this.commit);
    window.localStorage.setItem('cm_commits', JSON.stringify(cm_commits));
  }
}
