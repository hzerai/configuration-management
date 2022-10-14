import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-merge-home',
  templateUrl: './merge-home.component.html',
  styleUrls: ['./merge-home.component.css'],
})
export class MergeHomeComponent implements OnInit {
  commits = [];
  constructor() {}

  ngOnInit(): void {
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    if (cm_commits_str) {
      this.commits = JSON.parse(cm_commits_str);
    }
  }

  fromNowDate(date) {
    return moment(date).fromNow();
  }

  open_commit(commit) {
    console.log(commit);
  }
}
