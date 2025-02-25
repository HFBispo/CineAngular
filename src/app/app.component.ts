import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  constructor(private translate: TranslateService, private languageService: LanguageService) {
    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.translate.addLangs(this.languageService.getLanguagesValue);
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      },
    });
  }

}