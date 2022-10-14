import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitComponent } from './commit/commit.component';
import { MergeHomeComponent } from './merge-home/merge-home.component';

const routes: Routes = [
  { path: '', component: MergeHomeComponent },
  { path: 'commit', component: CommitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MergeRoutingModule {}
