import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) { }

  public getReviews(movieId: number): Observable<Array<Review>> {
    return this.http.get<Array<Review>>(
      `${this.apiUrl}?movieId=${movieId}`
    );
  }

  public createReview(review: Omit<Review, 'id'>): Observable<Review> {
    review.reviewDate = new Date().toISOString();
    return this.http.post<Review>(`${this.apiUrl}`, {...review});
  }

}
