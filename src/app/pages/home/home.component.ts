import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { CommonButtonComponent } from "../../components/common-button/common-button.component";
import { RouterLink } from '@angular/router';
import { FavoriteMovieService } from '../../services/favorite-movie.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MovieCardComponent, DatePipe, TranslatePipe, CommonButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  languageValue: string = "";
  viewMovieList: Array<Movie> = new Array<Movie>;

  constructor(
    private movieService: MovieService,
    private breadcrumbService: BreadcrumbService, 
    private languageService: LanguageService,
    private favoriteMovieService: FavoriteMovieService
  ) {
    this.languageService.languageSubject$
    .subscribe({
      next: (lang) => {
        this.languageValue = lang
      }
    });
  }

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  ngAfterViewInit() {
    this.breadcrumbService.breadcrumbSubject$.next([]);
  }

  loadFavoriteMovies() {
    this.viewMovieList = new Array<Movie>;
    this.favoriteMovieService.getFavoriteMovies(1)
      .subscribe({
        next: (favoriteMovies) => {  
                  
          favoriteMovies.forEach((fav) => {
            this.movieService.getMovieDetails(fav.movieId, this.languageValue)
              .subscribe({
                next: (movie) => {     
                  this.viewMovieList.push(movie);
                },
              });
          });

        }

      });  
  }

  deleteFavoriteMovieByMovieId() {
    this.loadFavoriteMovies();
  }

}
