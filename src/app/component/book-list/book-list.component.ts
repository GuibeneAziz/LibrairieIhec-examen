import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  booksList: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.booksList = data.works || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors du chargement des livres. Veuillez réessayer.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSearchByTitle(title: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.bookService.searchByTitle(title).subscribe({
      next: (data) => {
        this.booksList = data.docs || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => { 
        this.errorMessage = 'Erreur lors de la recherche. Veuillez réessayer.';
        this.isLoading = false; 
        this.cdr.markForCheck(); 
      }
    });
  }

  onSearchByYear(year: number) {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.bookService.searchByYear(year).subscribe({
      next: (data) => {
        this.booksList = data.docs || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => { 
        this.errorMessage = 'Erreur lors de la recherche. Veuillez réessayer.';
        this.isLoading = false; 
        this.cdr.markForCheck(); 
      }
    });
  }

  onSearchByTitleAndYear(params: {title: string, year: number}) {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.bookService.searchByTitleAndYear(params.title, params.year).subscribe({
      next: (data) => {
        this.booksList = data.docs || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => { 
        this.errorMessage = 'Erreur lors de la recherche. Veuillez réessayer.';
        this.isLoading = false; 
        this.cdr.markForCheck(); 
      }
    });
  }

  onResetSearch() {
    this.loadBooks();
  }

  getCoverUrl(book: any): string {
    // Pour les résultats de recherche (docs), utiliser cover_i
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    // Pour les works, utiliser cover_id
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
    }
    // Essayer avec covers array
    if (book.covers && book.covers.length > 0 && book.covers[0] !== -1) {
      return `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;
    }
    // Image par défaut
    return 'https://via.placeholder.com/200x300?text=No+Cover';
  }

  onBookClick(book: any) {
    // Extraire la clé du livre
    let key = book.key;
    
    // Si la clé contient /works/, on extrait juste l'ID
    if (key && key.includes('/works/')) {
      key = key.replace('/works/', '');
    } else if (key) {
      key = key.split('/').pop();
    }
    
    if (key) {
      this.router.navigate(['/book', key]);
    }
  }

  onImageError(event: any) {
    // Si l'image ne charge pas, remplacer par le placeholder
    event.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
  }
}