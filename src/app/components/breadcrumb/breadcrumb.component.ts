import { Component } from '@angular/core';
import { PagePath } from '../../models/pagePath';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  pagePaths: Array<PagePath> = new Array<PagePath>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.breadcrumbSubject$.subscribe({
      next: (breadcrumb) => {
        this.pagePaths = breadcrumb
      }
    });
  }

}
