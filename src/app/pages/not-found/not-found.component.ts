import { Component } from '@angular/core';
import { CommonButtonComponent } from "../../components/common-button/common-button.component";
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [CommonButtonComponent, RouterLink, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
