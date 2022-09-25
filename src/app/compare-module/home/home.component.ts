import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  configs: Configuration[] = [];
  constructor() {}

  ngOnInit(): void {
    const dbString = window.localStorage.getItem('configuration_management_db');
    if (dbString) {
      this.configs = JSON.parse(dbString);
    }
  }

  deleteConfig(name: string) {
    if (confirm('Are you sure to delete this configuration [' + name + '] ?')) {
      this.configs = this.configs.filter((c) => c.name !== name);
    }
  }
}
