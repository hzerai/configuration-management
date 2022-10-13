import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitRoutingModule } from './init-routing.module';
import { FormsModule } from '@angular/forms';
import { ConnectComponent } from './connect/connect.component';
import { TablesComponent } from './tables/tables.component';
import { GitComponent } from './git/git.component';
import { BaseLineComponent } from './baseline/baseline.component';
import { SummaryComponent } from './summary/summary.component';
import { InitializationComponent } from './initialization/initialization.component';
import { InitWizardComponent } from './init-wizard/init-wizard.component';

@NgModule({
  declarations: [
    InitWizardComponent,
    ConnectComponent,
    TablesComponent,
    SummaryComponent,
    BaseLineComponent,
    GitComponent,
    InitializationComponent,
  ],
  imports: [FormsModule, CommonModule, CommonModule, InitRoutingModule],
})
export class InitModule {}
