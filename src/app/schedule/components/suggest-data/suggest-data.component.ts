import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ISuggest } from '../../../types/schedule.interface';

@Component({
  selector: 'app-suggest-data',
  standalone: true,
  imports: [],
  templateUrl: './suggest-data.component.html',
  styleUrl: './suggest-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestDataComponent {
  @Input({ required: true }) suggestData: ISuggest[];
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
}
