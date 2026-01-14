import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  templateUrl: './head-bar.component.html',
  styleUrl: './head-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadBarComponent {
  title = 'Open Library - IHEC';
}