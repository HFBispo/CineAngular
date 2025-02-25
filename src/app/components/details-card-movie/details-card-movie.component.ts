import { Component, Input } from '@angular/core';
import { BadgeComponent } from "../badge/badge.component";
import { MovieDetails } from '../../models/movieDetails';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-details-card-movie',
  imports: [BadgeComponent, DatePipe, TranslatePipe],
  templateUrl: './details-card-movie.component.html',
  styleUrl: './details-card-movie.component.scss'
})
export class DetailsCardMovieComponent {
  
  languageValue: string = "";
  @Input() movieDetails!: MovieDetails;

  constructor(private languageService: LanguageService) {
    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.languageValue = lang
      }
    });
  }

  getMovieDirecting(): string | undefined {
    return this.movieDetails.credits.crew
      .find((crew) => crew.known_for_department === "Directing")?.original_name;
  }

}
