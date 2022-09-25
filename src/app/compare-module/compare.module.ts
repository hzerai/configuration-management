import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareRoutingModule } from './compare-routing.module';
import { HomeComponent } from './home/home.component';
import { WizardComponent } from './wizard/wizard.component';
import { DeltaComponent } from './delta/delta.component';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './delta/view/view.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ViewOneChangeComponent } from './delta/view-one-change/view-one-change.component';
import { ViewChangeRecordsComponent } from './delta/view-change-records/view-change-records.component';
import { ViewRecordStateComponent } from './delta/view-record-state/view-record-state.component';
import { PrintjsonPipe } from '../printjson.pipe';
import { ViewFilterComponent } from './delta/view-filter/view-filter.component';

@NgModule({
  declarations: [
    PrintjsonPipe,
    HomeComponent,
    WizardComponent,
    DeltaComponent,
    ViewComponent,
    ViewOneChangeComponent,
    ViewChangeRecordsComponent,
    ViewRecordStateComponent,
    ViewFilterComponent,
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
