import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  imports: [],
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.scss'
})
export class CommonButtonComponent {

  @Input() buttonClass: string = "";
  @Input() buttonType: string = "";

}
