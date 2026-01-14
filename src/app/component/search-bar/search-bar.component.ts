import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  searchTitle = '';
  searchYear: number | null = null;

  @Output() searchByTitle = new EventEmitter<string>();
  @Output() searchByYear = new EventEmitter<number>();
  @Output() searchByTitleAndYear = new EventEmitter<{title: string, year: number}>();
  @Output() resetSearch = new EventEmitter<void>();

  onSearchByTitle() {
    const title = this.searchTitle.trim();
    if (title && this.searchYear && this.isYearValid()) {
      // Recherche combinée
      this.searchByTitleAndYear.emit({ title, year: this.searchYear });
    } else if (title) {
      // Recherche par titre uniquement
      this.searchByTitle.emit(title);
    }
  }

  onSearchByYear() {
    if (this.searchYear !== null && this.isYearValid()) {
      this.searchByYear.emit(this.searchYear);
    }
  }

  onReset() {
    this.searchTitle = '';
    this.searchYear = null;
    this.resetSearch.emit();
  }

  isYearValid(): boolean {
    return this.searchYear !== null && this.searchYear > 0 && this.searchYear <= new Date().getFullYear();
  }
}
