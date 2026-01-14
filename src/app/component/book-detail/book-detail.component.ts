import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  book: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.loadBookDetails(key);
    }
  }

  loadBookDetails(key: string) {
    this.isLoading = true;
    this.cdr.markForCheck();
    
    console.log('Chargement du livre avec la clé:', key);
    
    this.bookService.getBookById(key).subscribe({
      next: (data) => {
        console.log('Données reçues:', data);
        this.book = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getCoverUrl(): string {
    if (this.book?.covers && this.book.covers.length > 0 && this.book.covers[0] !== -1) {
      return `https://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`;
    }
    return 'https://via.placeholder.com/400x600?text=No+Cover';
  }

  getDescription(): string {
    if (!this.book?.description) return 'Aucune description disponible.';
    if (typeof this.book.description === 'string') return this.book.description;
    return this.book.description.value || 'Aucune description disponible.';
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onImageError(event: any) {
    // Si l'image ne charge pas, remplacer par le placeholder
    event.target.src = 'https://via.placeholder.com/400x600?text=No+Cover';
  }
}
