import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareRoutingModule } from './compare-routing.module';
import { HomeComponent } from './home/home.component';
import { WizardComponent } from './wizard/wizard.component';
@NgModule({
  declarations: [HomeComponent, WizardComponent],
  imports: [CommonModule, CompareRoutingModule],
})
export class CompareModule {}
