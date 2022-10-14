import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeRoutingModule } from './compare-routing.module';
import { FormsModule } from '@angular/forms';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { CommitComponent } from './commit/commit.component';

@NgModule({
  declarations: [
    MergeHomeComponent,
    CommitComponent
  ],
  imports: [CommonModule, MergeRoutingModule, FormsModule],
})
export class MergeModule {}
