import { AfterViewInit, Component } from '@angular/core';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-movies',
  imports: [MovieListComponent, SearchBarComponent, TranslatePipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements AfterViewInit {

  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  ngAfterViewInit(): void {   
    this.breadcrumbService.breadcrumbSubject$.next([
      { 
        path: 'sidenav.home', 
        link: '/' 
      },
      { 
        path: 'sidenav.movies', 
        link: '/movies' 
      }
    ]);
  }
  
}
