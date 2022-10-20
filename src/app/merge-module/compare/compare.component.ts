import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  @Input('changed_tables')
  changed_tables: string[] = [];

  @Input('change_with_initial')
  change_with_initial: any[][any] = [];

  @Input('commit')
  commit;
  change_with_initial_temp: any[][any] = [];
  table_names_filtered: string[] = [];
  selectedTable: string;
  search: string;
  se;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);
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

  scroll(t) {
    document.getElementById(t).scrollIntoView(false);
  }

  back() {
    this.router.navigateByUrl('/merge');
  }

  scrollEvent = (event: any): void => {
    const se: any = !event.srcElement?.scrollingElement;
    if (!se) {
      return;
    }
    const n = se.scrollTop;
    if (n > 150) {
      document.getElementById('nav_left_merge').style.top = '2%';
      document.getElementById('nav_left_merge').style.height = '97%';
      // document.getElementById('tables_list').style.height = '550px';
    } else {
      // document.getElementById('tables_list').style.height = '400px';
      document.getElementById('nav_left_merge').style.height = '65%';
      document.getElementById('nav_left_merge').style.top = '32%';
    }
  };
}
