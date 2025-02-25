import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DetailsCardMovieComponent } from '../../components/details-card-movie/details-card-movie.component';
import { DetailsCastMovieComponent } from '../../components/details-cast-movie/details-cast-movie.component';
import { DetailsOverviewMovieComponent } from '../../components/details-overview-movie/details-overview-movie.component';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../models/movieDetails';
import { Movie } from '../../models/movie';
import { Credits } from '../../models/credits';
import { LanguageService } from '../../services/language.service';
import { DetailsReviewMovieComponent } from "../../components/details-review-movie/details-review-movie.component";
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [
    DetailsCardMovieComponent,
    DetailsCastMovieComponent,
    DetailsOverviewMovieComponent,
    DetailsReviewMovieComponent
],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {

  languageValue: string = "";
  movie!: Movie;
  credits!: Credits;
  movieDetails: MovieDetails = {movie: this.movie, credits: this.credits};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private languageService: LanguageService,
    private breadcrumbService: BreadcrumbService
  ) { 
    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.languageValue = lang
      }
    });
  }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.setMovie(movieId);
    this.setCredits(movieId);
  }

  ngAfterViewInit(): void {
    this.breadcrumbService.breadcrumbSubject$.next([
      { 
        path: 'sidenav.home', 
        link: '/' 
      },
      { 
        path: 'sidenav.movies', 
        link: '/movies' 
      },
      { 
        path: this.movie.title,
        link: '/movie/' + this.movie.id 
      }
    ]);    
  }

  setMovie(movieId: number) {
    this.movieService.getMovieDetails(movieId, this.languageValue).subscribe({
      next: (res) => { 
        this.movie = res;
        this.movieDetails.movie = this.movie;
      }
    });
  }

  setCredits(movieId: number) {
    this.movieService.getMovieCredits(movieId, this.languageValue).subscribe({
      next: (res) => { 
        this.credits = res;
        this.movieDetails.credits = this.credits;
      }
    });
  }

}
