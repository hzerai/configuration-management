import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-merge-home',
  templateUrl: './merge-home.component.html',
  styleUrls: ['./merge-home.component.css'],
})
export class MergeHomeComponent implements OnInit {
  commits = [];
  merged = 0;
  closed = 0;
  open = 0;
  showing: 'OPEN' | 'MERGED' | 'CLOSED' | 'ALL' = 'OPEN';

  constructor() {}

  ngOnInit(): void {
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    if (cm_commits_str) {
      this.commits = JSON.parse(cm_commits_str);
      this.commits.forEach((c) => {
        if (c.status === 'MERGED') {
          this.merged++;
        } else if (c.status === 'CLOSED') {
          this.closed++;
        } else {
          this.open++;
        }
      });
    }
  }

  fromNowDate(date) {
    return moment(date).fromNow();
  }

  open_commit(commit) {
    console.log(commit);
  }
}
