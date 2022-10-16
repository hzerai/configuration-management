import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Configuration } from 'src/app/models/models';
import mermaid from 'mermaid';

const current_mock = {
  initialized: false,
  name: null,
  source_connection: {
    hostname: 'dsqd',
    port: 2,
    database: 'dsqd',
    user: 'dsq',
    password: 'dqs',
    databaseType: 'Oracle',
    valid: true,
    summary: 'Oracle://dsq:********@dsqd:2/dsqd',
    scripts: {
      generated: null,
      executed: null,
      downloaded: null,
      commit: true,
      commited: null,
      download: true,
      execute: true,
    },
  },
  git: {
    repository: '123',
    branch: 'dev',
    folder: {
      name: '/configdsqd',
      create: true,
    },
    baseline: {
      name: '/configdsqd/baseline',
      create: true,
    },
    delivery: {
      name: '/configdsqd/delivery_scripts',
      create: true,
    },
    tables: {
      name: '/configdsqd/tables.txt',
      create: true,
    },
    triggers: {
      name: '/configdsqd/triggers',
      create: true,
    },
    valid: true,
  },
  tables: ['com_employee'],
  tables_source: 'FILE',
  all_tables: [
    {
      table: 'com_employee',
      selected: false,
    },
    {
      table: 'com_person',
      selected: false,
    },
    {
      table: 'config_presentation',
      selected: false,
    },
    {
      table: 'config_widgets',
      selected: false,
    },
    {
      table: 'config_resources',
      selected: false,
    },
    {
      table: 'sla_config',
      selected: false,
    },
    {
      table: 'lifecycle_configs',
      selected: false,
    },
    {
      table: 'mappings_conf',
      selected: false,
    },
    {
      table: 'traces_config',
      selected: false,
    },
  ],
  baseline: {
    generate: true,
    generated: null,
    downloaded: null,
    commit: true,
    commited: null,
    download: true,
    uploaded: null,
  },
  created_at: null,
  deltas: [],
};

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.css'],
})
export class InitializationComponent {
  @Input('current_configuration')
  current_configuration: Configuration;

  flowChart: string[];
  started: boolean = false;
  finished: boolean = false;
  executed: boolean = false;
  executing: boolean = false;
  hasErrors: boolean = true;
  constructor() {
    mermaid.initialize({ theme: 'neutral' });
  }

  init(): void {
    this.started = true;
    this.createFlowchart();
  }

  createFlowchart() {
    // this.current_configuration = current_mock; // USE MOCK
    this.flowChart = [
      'flowchart LR',
      'subgraph GIT ["GIT Initialization"]',
      // 'direction TB',
      // `creation>fa:fa-spinner Folders creation] -.-> |${
      //   this.current_configuration.git.folder.create
      //     ? 'fa:fa-spinner'
      //     : 'fa:fa-ban'
      // }| folder["${this.current_configuration.git.folder.name}"]`,
      // `creation -.-> |${
      //   this.current_configuration.git.triggers.create
      //     ? 'fa:fa-spinner'
      //     : 'fa:fa-ban'
      // }| triggers["${this.current_configuration.git.triggers.name}"]`,
      // `creation -.-> |${
      //   this.current_configuration.git.baseline.create
      //     ? 'fa:fa-spinner'
      //     : 'fa:fa-ban'
      // }| baseline["${this.current_configuration.git.baseline.name}"]`,
      // `creation -.-> |${
      //   this.current_configuration.git.tables.create
      //     ? 'fa:fa-spinner'
      //     : 'fa:fa-ban'
      // }| tables["${this.current_configuration.git.tables.name}"]`,
      // `creation -.-> |${
      //   this.current_configuration.git.delivery.create
      //     ? 'fa:fa-spinner'
      //     : 'fa:fa-ban'
      // }| delivery["${this.current_configuration.git.delivery.name}"]`,
      'end',
      `subgraph TRIGGER ["Triggers script"]`,
      'direction TB',
      `generatescripts[(fa:fa-spinner Generation)] --> |${
        this.current_configuration.source_connection.scripts.commit
          ? 'fa:fa-spinner'
          : 'fa:fa-ban'
      }| commitscripts[Commit]`,
      `generatescripts --> |${
        this.current_configuration.source_connection.scripts.download
          ? 'fa:fa-spinner'
          : 'fa:fa-ban'
      }| downloadScripts[Download]`,
      `generatescripts --> |${
        this.current_configuration.source_connection.scripts.execute
          ? 'fa:fa-spinner'
          : 'fa:fa-ban'
      }| executeScripts[Execute]`,
      'end',
      `subgraph BASELINE ["Baseline"]`,
      'direction TB',
      `baselinegeneration{{"fa:fa-spinner Baseline generation"}} --> |${
        this.current_configuration.baseline.commit
          ? 'fa:fa-spinner'
          : 'fa:fa-ban'
      }| baselineCommit[Commit]`,
      `baselinegeneration --> |${
        this.current_configuration.baseline.download
          ? 'fa:fa-spinner'
          : 'fa:fa-ban'
      }| baselineDownload[Download]`,

      'end',
      'START((Start)) ==> GIT',
      // `GIT ==>|fa:fa-${
      //   this.current_configuration.tables_source !== 'GIT' ? 'spinner' : 'ban'
      // }| TABLES[Commit configuration's tables]`,
      'GIT ===> TRIGGER',
      'GIT ==> BASELINE',

      // `TABLES ==>|fa:fa-${
      //   this.current_configuration.tables_source !== 'GIT' ? 'spinner' : 'ban'
      // }| END((End))`,
      'BASELINE ===> END((End))',
      'TRIGGER ==> END((End))',
      'class START fw-bold',
      'class END fw-bold',
    ];
    var flow = document.getElementById('flow');
    flow.removeAttribute('data-processed');
    flow.innerHTML = this.flowChart.join('\n');
    mermaid.init(undefined, flow);
    setTimeout(() => {
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 0);
  }

  execute() {
    setTimeout(() => {
      this.flowChart.push('style START fill:#3bd44b');
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
      this.executing = true;
      this.mock();
    }, 0);
  }

  mock() {
    setTimeout(() => {
      // folder created event

      this.flowChart = this.flowChart.map((l) => {
        if (l.startsWith('creation')) {
          return l.replace('spinner', 'check').replace('spinner', 'check');
        // } else if (l === 'GIT ===>|fa:fa-spinner| TRIGGER') {
        //   return 'GIT ===>|fa:fa-check| TRIGGER';
        // } else if (l === 'GIT ==>|fa:fa-spinner| BASELINE') {
        //   return 'GIT ==>|fa:fa-check| BASELINE';
        // } else if (l === 'TABLES ==>|fa:fa-spinner| END((End))') {
        //   return 'TABLES ==>|fa:fa-check| END((End))';
        // } else if (
        //   l === 'GIT ==>|fa:fa-spinner| TABLES[Configuration tables]'
        // ) {
        //   return 'GIT ==>|fa:fa-check| TABLES[Configuration tables]';
        } else {
          return l;
        }
      });
      console.log(this.flowChart);
      // this.flowChart.push('style TABLES fill:#3bd44b');
      this.flowChart.push('style GIT fill:#3bd44b');
      // this.flowChart.push('style creation fill:#3bd44b');
      // this.flowChart.push(
      //   `style folder fill:#${
      //     this.current_configuration.git.folder.create ? '3bd44b' : 'd8e619'
      //   }`
      // );
      // this.flowChart.push(
      //   `style triggers fill:#${
      //     this.current_configuration.git.triggers.create ? '3bd44b' : 'd8e619'
      //   }`
      // );

      // this.flowChart.push(
      //   `style tables fill:#${
      //     this.current_configuration.git.tables.create ? '3bd44b' : 'd8e619'
      //   }`
      // );
      // this.flowChart.push(
      //   `style baseline fill:#${
      //     this.current_configuration.git.baseline.create ? '3bd44b' : 'd8e619'
      //   }`
      // );
      // this.flowChart.push(
      //   `style delivery fill:#${
      //     this.current_configuration.git.delivery.create ? '3bd44b' : 'c4d113'
      //   }`
      // );
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 2000);

    setTimeout(() => {
      // scripts generated
      this.flowChart = this.flowChart.map((l) =>
        l.startsWith('generatescripts')
          ? l.replace('fa:fa-spinner Generation', 'fa:fa-check Generation')
          : l
      );
      this.flowChart.push('style generatescripts fill:#3bd44b');

      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 5000);

    setTimeout(() => {
      // scripts executed
      this.flowChart = this.flowChart.map((l) => {
        if (l.startsWith('generatescripts')) {
          return l
            .replace(
              '|fa:fa-spinner| executeScripts',
              '|fa:fa-check| executeScripts'
            )
            .replace(
              '|fa:fa-spinner| downloadScripts',
              '|fa:fa-check| downloadScripts'
            );
        // } else if (l === 'TRIGGER ==>|fa:fa-spinner| END((End))') {
        //   return 'TRIGGER ==>|fa:fa-check| END((End))';
        } else {
          return l;
        }
      });
      this.flowChart.push(
        `style executeScripts fill:#${
          this.current_configuration.source_connection.scripts.execute
            ? '3bd44b'
            : 'd8e619'
        }`
      );
      this.flowChart.push(
        `style downloadScripts fill:#${
          this.current_configuration.source_connection.scripts.download
            ? '3bd44b'
            : 'd8e619'
        }`
      );
      this.flowChart.push('style END fill:#3bd44b');

      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 9000);

    setTimeout(() => {
      // scripts commited
      this.flowChart = this.flowChart.map((l) =>
        l.startsWith('generatescripts')
          ? l.replace(
              '|fa:fa-spinner| commitscripts',
              '|fa:fa-check| commitscripts'
            )
          : l
      );
      this.flowChart.push(
        `style commitscripts fill:#${
          this.current_configuration.source_connection.scripts.commit
            ? '3bd44b'
            : 'd8e619'
        }`
      );

      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 6000);

    setTimeout(() => {
      // baseline generated
      this.flowChart = this.flowChart.map((l) =>
        l.startsWith('baselinegeneration')
          ? l.replace(
              'fa:fa-spinner Baseline generation',
              'fa:fa-check Baseline generation'
            )
          : l
      );
      if (this.current_configuration.baseline.generate) {
        this.flowChart.push('style baselinegeneration fill:#3bd44b');
      }
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 4000);

    setTimeout(() => {
      // baseline commited
      this.flowChart = this.flowChart.map((l) => {
        if (l.startsWith('baselinegeneration')) {
          return l
            .replace(
              '|fa:fa-spinner| baselineCommit',
              '|fa:fa-bomb| baselineCommit'
            )
            .replace(
              '|fa:fa-spinner| baselineDownload',
              '|fa:fa-check| baselineDownload'
            );
        // } else if (l === 'BASELINE ===>|fa:fa-spinner| END((End))') {
        //   return 'BASELINE ===>|fa:fa-check| END((End))';
        } else {
          return l;
        }
      });
      //

      this.flowChart.push(
        'click baselineCommit mermaid_call_back "Commit failed due to timeout : GIT connection reset"'
      );
      this.flowChart.push(
        `style baselineDownload fill:#${
          this.current_configuration.baseline.download ? '3bd44b' : 'd8e619'
        }`
      );
      this.flowChart.push(
        `style baselineCommit fill:#${
          this.current_configuration.baseline.commit ? 'fa2a2e' : 'd8e619'
        }`
      );
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 7000);

    setTimeout(() => {
      this.finished = true;
      this.current_configuration.initialized = true;
    }, 10000);
  }

  retryFailedTasks() {
    this.hasErrors = false;
    setTimeout(() => {
      this.flowChart = this.flowChart.map((l) => {
        if (l.startsWith('baselinegeneration')) {
          return l.replace(
            '|fa:fa-bomb| baselineCommit',
            '|fa:fa-check| baselineCommit'
          );
        } else {
          return l;
        }
      });
      this.flowChart.push(
        `style baselineCommit fill:#${
          this.current_configuration.baseline.commit ? '3bd44b' : 'd8e619'
        }`
      );
      var flow = document.getElementById('flow');
      flow.removeAttribute('data-processed');
      flow.innerHTML = this.flowChart.join('\n');
      mermaid.init(undefined, flow);
    }, 2000);
  }
}
