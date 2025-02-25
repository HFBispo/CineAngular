import { Component, Input } from '@angular/core';
import { CommonButtonComponent } from "../common-button/common-button.component";
import { AvatarComponent } from "../avatar/avatar.component";
import { MovieDetails } from '../../models/movieDetails';
import { ModalComponent } from '../modal/modal.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details-cast-movie',
  imports: [CommonButtonComponent, AvatarComponent, ModalComponent, TranslatePipe],
  templateUrl: './details-cast-movie.component.html',
  styleUrl: './details-cast-movie.component.scss'
})
export class DetailsCastMovieComponent {

  @Input() movieDetails!: MovieDetails;

}
