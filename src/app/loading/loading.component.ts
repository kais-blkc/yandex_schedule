import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  public loadingState$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loadingState$ = this.loadingService.loading$;
  }
}
