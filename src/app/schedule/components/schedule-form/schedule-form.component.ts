import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleInputCityComponent } from '../schedule-input-city/schedule-input-city.component';
import { SuggestDataComponent } from '../suggest-data/suggest-data.component';
import { ISearchStationsParams, ScheduleApiService } from '../../../services/schedule.api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { formatDate } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-schedule-form',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    SuggestDataComponent,
    ScheduleInputCityComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleFormComponent implements OnInit {
  public scheduleForm: FormGroup;
  public searchParams: ISearchStationsParams = {
    from: 'c11508',
    to: 'c28',
    date: '',
    transportType: '',
  };

  public transportTypeList = [
    { slug: 'suburban', name: 'электричка' },
    { slug: 'plane', name: 'самолет' },
    { slug: 'train', name: 'поезд' },
    { slug: 'bus', name: 'автобус' },
  ];

  constructor(
    private fb: FormBuilder,
    private scheduleApiService: ScheduleApiService,
  ) {
    this.scheduleForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: [''],
      transportType: [''],
    });
  }

  ngOnInit(): void {}

  setFormDateControl() {
    const formDateControl = this.scheduleForm.controls['date'];

    if (formDateControl.value) {
      this.searchParams.date = formatDate(formDateControl.value, 'yyyy-MM-dd', 'en');
    }
  }

  setFormTransportTypeControl() {
    this.searchParams.transportType = this.scheduleForm.controls['transportType'].value;
  }

  onSubmit() {
    this.setFormDateControl();
    this.setFormTransportTypeControl();
    console.log(this.searchParams);

    this.scheduleApiService.searchStationsData(this.searchParams).subscribe((res) => {
      console.log(res);
    });
  }
}
