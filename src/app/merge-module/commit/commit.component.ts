import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css'],
})
export class CommitComponent implements OnInit {
  commit: any;
  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    const commit_id = this.activatedRouter.snapshot.queryParams['id'];
    var cm_commits_str = window.localStorage.getItem('cm_commits');
    if (cm_commits_str) {
      this.commit = JSON.parse(cm_commits_str).find(
        (c) => (c.commit_id = commit_id)
      );
      console.log(this.commit)
    }
  }

  fromNowDate(date) {
    return moment(date).fromNow();
  }
}
