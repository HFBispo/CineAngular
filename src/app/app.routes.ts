import { Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';

export const routes: Routes = [
    
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: HomeComponent
            },
            {
                path: 'movies',
                component: MoviesComponent
            },
            {
                path:'movie/:id',
                component: MovieDetailsComponent
            },
            {
                path:'config',
                component: ConfigurationsComponent
            }
        ]
    },

    {
        path: '**',
        component: NotFoundComponent,
    }

];
