import { Component, Input, OnInit } from '@angular/core';
import { CommonButtonComponent } from "../common-button/common-button.component";
import { AvatarComponent } from '../avatar/avatar.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { MovieDetails } from '../../models/movieDetails';
import { TranslatePipe } from '@ngx-translate/core';
import { ModalComponent } from '../modal/modal.component';
import { LanguageService } from '../../services/language.service';
import moment from 'moment';
import { AlertComponent } from '../alert/alert.component';
import { ShowAlert } from '../../models/showAlert';
import { ReviewService } from '../../services/review.service';


@Component({
  selector: 'app-details-review-movie',
  imports: [CommonButtonComponent, 
    AvatarComponent, 
    ReactiveFormsModule, 
    FormsModule, 
    CommonModule, 
    TranslatePipe,
    ModalComponent,
    AlertComponent
  ],
  templateUrl: './details-review-movie.component.html',
  styleUrl: './details-review-movie.component.scss'
})
export class DetailsReviewMovieComponent implements OnInit {

  languageValue: string = "";
  alertAll: boolean = false;
  formReview: FormGroup;
  reviews: Array<Review> = new Array<Review>;
  showAlert: ShowAlert = { value: false, type: "" };
  @Input() movieDetails!: MovieDetails;

  constructor(
    private reviewService: ReviewService,
    private languageService: LanguageService
  ) {
    this.formReview = new FormGroup({
      watchedDate: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required ]),
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      reviewContent: new FormControl('', [Validators.minLength(10), Validators.required]),
    });

    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.languageValue = lang
      }
    });
  }

  ngOnInit(): void {
    this.setReviewsList(); 
  }

  onSubmit() {
    const review = {
      movieId: this.movieDetails.movie.id,
      author: this.formReview.value.name,
      rating: this.formReview.value.rating,
      reviewContent: this.formReview.value.reviewContent,
      watchedDate: this.formReview.value.watchedDate,
    };

    if (this.formReview.valid && this.validatorDate(this.formReview.value.watchedDate)) {
      this.reviewService.createReview(review).subscribe({
        next: () => {
          this.setReviewsList(); 
          this.showAlert.value = true;
          this.showAlert.type = "success";
          setTimeout(() => {
            this.showAlert.value = false;
          }, 2000);
        },
        error: () => {
          this.showAlert.value = true;
          this.showAlert.type = "error";
          setTimeout(() => {
            this.showAlert.value = false;
          }, 2000);
        }
      }); 
      
      this.alertAll = false;
      this.formReview.reset();   
    }
    else {
      this.alertAll = true;
    }  
  }

  setReviewsList() {
    this.reviewService.getReviews(this.movieDetails.movie.id).subscribe({
      next: (reviews) => this.reviews = reviews
    });
  }

  validatorDate(date: string): boolean {
    const actualDate = moment();
    const releaseDate =  moment(this.movieDetails.movie.release_date);
    const dateMoment = moment(date);

    return actualDate.isAfter(dateMoment) && dateMoment.isAfter(releaseDate);
  }
  
}
