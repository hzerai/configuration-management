import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeRoutingModule } from './compare-routing.module';
import { FormsModule } from '@angular/forms';
import { MergeHomeComponent } from './merge-home/merge-home.component';
import { CommitComponent } from './commit/commit.component';
import { CompareComponent } from './compare/compare.component';
import { CompareWithInitialStateComponent } from './compare/compare-with-initial-state/compare-with-initial-state.component';
import { CompareOperationComponent } from './compare/compare-operation/compare-operation.component';
import { CompareInsertOperationComponent } from './compare/compare-insert-operation/compare-insert-operation.component';
import { CompareDeleteOperationComponent } from './compare/compare-delete-operation/compare-delete-operation.component';
import { CompareUpdateOperationComponent } from './compare/compare-update-operation/compare-update-operation.component';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    MergeHomeComponent,
    CommitComponent,
    CompareComponent,
    CompareWithInitialStateComponent,
    CompareOperationComponent,
    CompareInsertOperationComponent,
    CompareDeleteOperationComponent,
    CompareUpdateOperationComponent,
  ],
  imports: [CommonModule, MergeRoutingModule, FormsModule, QuillModule.forRoot()],
})
export class MergeModule {}
