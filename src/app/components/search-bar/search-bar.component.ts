import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements AfterViewInit {

  searchedValue: string = "";

  @ViewChild('searchBarInput') searchBarInput!: ElementRef;

  constructor(
    private movieService: MovieService
  ) { }

  ngAfterViewInit(): void {
    this.searchBarInput.nativeElement.focus();
  }

  inputSearchedValue(): void  {
    if (this.searchedValue.length >= 3 || this.searchedValue === "") {
      this.movieService.searchedMoviesSubject$.next(this.searchedValue);
    }
  }

}