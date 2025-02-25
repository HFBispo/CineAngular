import { Component, Input } from '@angular/core';
import { MovieDetails } from '../../models/movieDetails';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details-overview-movie',
  imports: [TranslatePipe],
  templateUrl: './details-overview-movie.component.html',
  styleUrl: './details-overview-movie.component.scss'
})
export class DetailsOverviewMovieComponent {

  @Input() movieDetails!: MovieDetails;

}
