import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareWizardComponent } from './compare-wizard/compare-wizard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':name', component: CompareWizardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}
