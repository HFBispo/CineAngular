import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FavoriteMovie } from '../models/favoriteMovie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {

  private apiUrl = 'http://localhost:3000/favoriteMovies';

  constructor(private http: HttpClient) { }

  public getFavoriteMovie(userId: number, movieId: number): Observable<FavoriteMovie> {
    return this.http.get<Array<FavoriteMovie>>(
      `${this.apiUrl}/?userId=${userId}&movieId=${movieId}`
    ).pipe(
      map(res => ({
        id: res[0].id,
        userId: res[0].userId,
        movieId: res[0].movieId
      } as FavoriteMovie))
    );
  }

  public getFavoriteMovies(userId: number): Observable<Array<FavoriteMovie>> {
    return this.http.get<Array<FavoriteMovie>>(
      `${this.apiUrl}/?userId=${userId}`
    );
  }

  public createFavoriteMovie(favoriteMovie: Omit<FavoriteMovie, 'id'>): Observable<FavoriteMovie> {
    return this.http.post<FavoriteMovie>(
      `${this.apiUrl}`, {...favoriteMovie}
    );
  }

  public deleteFavoriteMovie(id: number): Observable<FavoriteMovie> {
    return this.http.delete<FavoriteMovie>(
      `${this.apiUrl}/${id}`
    );
  }

}
