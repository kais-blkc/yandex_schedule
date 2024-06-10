import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ScheduleApiService } from '../../../services/schedule.api.service';
import { MatCardModule } from '@angular/material/card';
import { ISegment } from '../../../types/schedule.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleListComponent implements OnInit {
  public searchDataSegments: ISegment[] | null = null;

  constructor(
    private scheduleService: ScheduleApiService,
    private changeDetection: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.scheduleService.searchData$.subscribe((res) => {
      this.searchDataSegments = res.segments;
      this.changeDetection.detectChanges();
    });
  }

  formatMinuteToHour(seconds: number) {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor(seconds / 60) - hours * 60;
    return `${hours} ч ${minutes} мин`;
  }
}
