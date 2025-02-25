import { AfterViewInit, Component } from '@angular/core';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeSelectorComponent } from "../../components/theme-selector/theme-selector.component";
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-configurations',
  imports: [LanguageSelectorComponent, TranslatePipe, ThemeSelectorComponent],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent implements AfterViewInit {

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
        path: 'sidenav.config', 
        link: '/config' 
      }
    ]);
  }

}
