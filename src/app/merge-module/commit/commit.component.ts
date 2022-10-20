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
  pipeline: any;
  nb_lines = 0;
  showing: 'OVERVIEW' | 'CHANGES' = 'OVERVIEW';

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    const commit_id = this.activatedRouter.snapshot.queryParams['id'];
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    var cm_commits = JSON.parse(cm_commits_str);
    if (cm_commits_str) {
      this.commit = cm_commits.find((c) => c.commit_id == commit_id);
      var changes = [];
      this.commit.changed_tables = [];
      this.commit.changes.forEach((c) => {
        changes[c.table] = c.lines;
        this.nb_lines += c.lines.length;
        this.commit.changed_tables.push(c.table);
      });
      this.commit.change_with_initial = changes;
      this.merged =
        this.commit.status == 'MERGED' || this.commit.status == 'CLOSED';
      this.pipeline = this.commit.pipeline
        ? this.commit.pipeline
        : {
            current_stage: 1,
            status: 'pending',
            id: '#' + cm_commits.length,
            stages: [
              {
                stage: 1,
                title: 'generate update scripts',
                style: 'secondary',
                status: 'pending',
              },
              {
                stage: 2,
                title: 'generate rollback scripts',
                style: 'secondary',
                status: 'pending',
              },
              {
                stage: 3,
                title: 'create delivery file',
                style: 'secondary',
                status: 'pending',
              },
              {
                stage: 4,
                title: 'track_changes update',
                style: 'secondary',
                status: 'pending',
              },
              {
                stage: 5,
                title: 'push to HEAD',
                style: 'secondary',
                status: 'pending',
              },
            ],
          };
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
    this.pipeline.status = 'running';
    this.execute_pipeline(0, () => {
      this.commit.status = 'MERGED';
      this.pipeline.status = 'passed with warnings';
      this.commit.pipeline = this.pipeline;
      this.saveCommit();
      this.notifierService.hide('MERGING');
      this.notifierService.notify(
        'success',
        'Your commit was merged successfully!'
      );
      this.merging = false;
      this.merged = true;
    });

    this.merging = true;

    this.notifierService.notify(
      'info',
      `Merging ${this.commit.commit_id} now!`,
      'MERGING'
    );
  }

  execute_pipeline(index, callback) {
    if (index >= this.pipeline.stages.length) {
      callback();
      return;
    }
    var stage = this.pipeline.stages[index];
    ++index;
    stage.style = 'primary';
    stage.status = 'running';
    setTimeout(() => {
      this.pipeline.current_stage++;
      if (index == this.pipeline.stages.length) {
        stage.style = 'warning';
        stage.status = 'warning';
      } else {
        stage.style = 'success';
        stage.status = 'done';
      }

      this.execute_pipeline(index, callback);
    }, index * 1500);
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
    cm_commits.unshift(this.commit);
    window.localStorage.setItem('cm_commits', JSON.stringify(cm_commits));
  }
}
