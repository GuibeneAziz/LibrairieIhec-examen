import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseUrl = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/subjects/computers.json`);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/works/${id}.json`);
  }

  searchByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search.json?title=${encodeURIComponent(title)}`);
  }

  searchByYear(year: number): Observable<any> {
    // Recherche des livres d'informatique publiés cette année
    return this.http.get(`${this.baseUrl}/search.json?subject=computers&first_publish_year=${year}&limit=50`);
  }

  searchByTitleAndYear(title: string, year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/search.json?title=${encodeURIComponent(title)}&first_publish_year=${year}`);
  }
}