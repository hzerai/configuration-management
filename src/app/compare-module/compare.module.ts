import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareRoutingModule } from './compare-routing.module';
import { HomeComponent } from './home/home.component';
import { DeltaComponent } from './delta/delta.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './delta/view/view.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ViewOneChangeComponent } from './delta/view-one-change/view-one-change.component';
import { ViewChangeRecordsComponent } from './delta/view-change-records/view-change-records.component';
import { ViewRecordStateComponent } from './delta/view-record-state/view-record-state.component';
import { PrintjsonPipe } from '../printjson.pipe';
import { ViewFilterComponent } from './delta/view-filter/view-filter.component';
import { CompareComponent } from './compare/compare.component';
import { CompareWithInitialStateComponent } from './compare/compare-with-initial-state/compare-with-initial-state.component';
import { CompareOperationComponent } from './compare/compare-operation/compare-operation.component';
import { CompareInsertOperationComponent } from './compare/compare-insert-operation/compare-insert-operation.component';
import { CompareDeleteOperationComponent } from './compare/compare-delete-operation/compare-delete-operation.component';
import { CompareUpdateOperationComponent } from './compare/compare-update-operation/compare-update-operation.component';
import { SecondBaselineComponent } from './second-baseline/second-baseline.component';
import { CompareWizardComponent } from './compare-wizard/compare-wizard.component';

@NgModule({
  declarations: [
    PrintjsonPipe,
    HomeComponent,
    CompareWizardComponent,
    DeltaComponent,
    ViewComponent,
    ViewOneChangeComponent,
    ViewChangeRecordsComponent,
    ViewRecordStateComponent,
    ViewFilterComponent,
    CompareComponent,
    CompareWithInitialStateComponent,
    CompareOperationComponent,
    CompareInsertOperationComponent,
    CompareDeleteOperationComponent,
    CompareUpdateOperationComponent,
    SecondBaselineComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    CommonModule,
    CompareRoutingModule,
    TypeaheadModule.forRoot(),
  ],
})
export class CompareModule {}
