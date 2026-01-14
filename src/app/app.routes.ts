import { Routes } from '@angular/router';
import { BookListComponent } from './component/book-list/book-list.component';
import { BookDetailComponent } from './component/book-detail/book-detail.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:key', component: BookDetailComponent },
  { path: '**', redirectTo: '' }
];
