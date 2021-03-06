import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule, MatIconModule } from '@angular/material';
import { BlueriqCommonModule, BlueriqComponents } from '@blueriq/angular';
import { TimelineComponent } from './timeline.component';

const BQ_TIMELINE_COMPONENTS = [
  TimelineComponent
];

@NgModule({
  declarations: [
    BQ_TIMELINE_COMPONENTS
  ],
  providers: [
    BlueriqComponents.register(BQ_TIMELINE_COMPONENTS)
  ],
  imports: [
    /* Basic */
    CommonModule,
    BlueriqCommonModule,
    FlexLayoutModule,

    /* Material modules */
    MatIconModule,
    MatDividerModule
  ],
  exports: [BQ_TIMELINE_COMPONENTS]
})
export class TimelineModule {

}
