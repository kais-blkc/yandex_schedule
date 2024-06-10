import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ScheduleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
