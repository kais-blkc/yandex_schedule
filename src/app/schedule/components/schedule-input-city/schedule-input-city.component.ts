import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeWhile } from 'rxjs';
import { SuggestDataComponent } from '../suggest-data/suggest-data.component';
import { ScheduleApiService } from '../../../services/schedule.api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ISuggest } from '../../../types/schedule.interface';
import { MatInputModule } from '@angular/material/input';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Self,
} from '@angular/core';

@Component({
  selector: 'app-schedule-input-city',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, SuggestDataComponent, FormsModule],
  templateUrl: './schedule-input-city.component.html',
  styleUrl: './schedule-input-city.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleInputCityComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input() label: string;
  @Output() cityCode: EventEmitter<string> = new EventEmitter<string>();
  private onChange: (value: string) => void;
  private onTouch: () => void;
  private valueSubject = new Subject<string>();
  private alive: boolean = true;
  public suggestData: ISuggest[];
  public value: string = '';

  constructor(
    @Self() private ngControl: NgControl,
    private changeDetection: ChangeDetectorRef,
    private scheduleApiService: ScheduleApiService,
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.subscribeOnValueSubject();
  }

  subscribeOnValueSubject() {
    this.valueSubject
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(this.getSuggestData.bind(this));
  }

  getSuggestData(city: string) {
    this.scheduleApiService
      .getSuggest(city)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        this.suggestData = res;
        this.changeDetection.markForCheck();
      });
  }

  onInputValueChange(event: Event): void {
    const targetElement = event.target as HTMLInputElement;
    const value = targetElement.value;

    this.onChange(value);
    this.valueSubject.next(value);
  }

  onSuggestSelect(city: string[]) {
    const cityName = city[1];
    const cityCode = city[0];

    this.value = cityName;
    this.onChange(cityName);
    this.valueSubject.next(cityName);
    this.cityCode.emit(cityCode);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  writeValue(value: string): void {
    this.value = value;
    this.changeDetection.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
