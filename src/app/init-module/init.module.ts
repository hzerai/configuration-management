import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitRoutingModule } from './init-routing.module';
import { FormsModule } from '@angular/forms';
import { ConnectComponent } from './connect/connect.component';
import { TablesComponent } from './tables/tables.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';

@NgModule({
  declarations: [
    HomeComponent,
    ConnectComponent,
    TablesComponent,
    ScriptsComponent,
    HeadComponent,
  ],
  imports: [FormsModule, CommonModule, CommonModule, InitRoutingModule],
})
export class InitModule {}
