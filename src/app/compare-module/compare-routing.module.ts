import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareWizardComponent } from './compare-wizard/compare-wizard.component';

const routes: Routes = [{ path: '', component: CompareWizardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}
