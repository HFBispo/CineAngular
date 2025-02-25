import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [CommonButtonComponent, MovieCardComponent, DatePipe, TranslatePipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit, AfterViewInit {

  languageValue: string = "";
  movieList: Array<Movie> = new Array<Movie>();
  viewMovieList: Array<Movie> = new Array<Movie>();
  page: number = 1;
  listedMovies: string = "00";

  constructor(
    private movieService: MovieService,
    private languageService: LanguageService
  ) {
    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.languageValue = lang
      }
    });
  }

  ngOnInit(): void {
    this.movieService.getTopRatedMovies(this.page, this.languageValue).subscribe({
      next: (res) => {
        this.movieList = res.results;
        this.viewMovieList = this.movieList;
        this.setListedMovies(this.movieList.length);
      },
    });
  }

  ngAfterViewInit(): void {
    this.movieService.searchedMoviesSubject$.subscribe({
      next: (searchValue) => {
        if (searchValue !== '') {
          this.viewMovieList = this.movieList.filter((movie) =>
            movie.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        } else {
          this.viewMovieList = this.movieList;
        }
        this.setListedMovies(this.viewMovieList.length);
      },
    });
  }

  loadMoreMovies(): void {
    this.page += 1;
    this.movieService.getTopRatedMovies(this.page, this.languageValue).subscribe({
      next: (res) => {
        this.movieList = [...this.movieList, ...res.results];
        this.viewMovieList = this.movieList;
        this.setListedMovies(this.movieList.length);
      },
    });
  }

  setListedMovies(number: number): void {
    if (number < 10) {
      this.listedMovies = '0' + number;
    } else {
      this.listedMovies = number.toString();
    }
  }
  
}
