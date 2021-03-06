import { Component } from '@angular/core';
import { BlueriqComponent, BlueriqSession, DashboardTimeline } from '@blueriq/angular';
import { Container } from '@blueriq/core';
import { dateFromNowHumanReadable, dateToShortTime } from '@shared/date/bq-date-parser';

@Component({
  selector: 'bq-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [DashboardTimeline]
})
@BlueriqComponent({
  type: Container,
  selector: 'timeline'
})
export class TimelineComponent {

  constructor(public readonly timeline: DashboardTimeline, private readonly session: BlueriqSession) {
  }

  dateToHumanReadableFormat(date: Date): string {
    return dateFromNowHumanReadable(date, this.session, false);
  }

  dateToShortTime(date: Date): string {
    return dateToShortTime(date, this.session);
  }
}
