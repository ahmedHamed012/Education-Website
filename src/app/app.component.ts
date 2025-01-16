import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './Core/Services/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Fresh Harvest';
  loading: boolean = false;
  constructor(private loadingService: LoadingService) {}
  ngOnInit() {
    this.listenToLoading();
  }
  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    });
  }
}
