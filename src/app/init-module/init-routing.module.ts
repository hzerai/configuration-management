import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitWizardComponent } from './init-wizard/init-wizard.component';

const routes: Routes = [{ path: '', component: InitWizardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitRoutingModule {}
