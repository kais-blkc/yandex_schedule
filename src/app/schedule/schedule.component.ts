import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ScheduleFormComponent, ScheduleListComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  constructor() {}
}
