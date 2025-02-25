import {
  AfterViewInit,
  Component
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Language } from '../../models/language';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent implements AfterViewInit {

  selectedValue: string = "";
  actualLanguage: Language | undefined = undefined;
  languages: Array<Language>;

  constructor(
    private languageService: LanguageService
  ) {
    this.languages = this.languageService.getLanguages;
  }

  ngAfterViewInit(): void { 
    this.languageService.languageSubject$.subscribe({
      next: (lang) => {
        this.setActualLanguageByValue(lang);
      },
    });
  }

  changeSelectedValue(selected: string): void {
    this.languageService.languageSubject$.next(selected);
  }

  setActualLanguageByValue(value: string) {
    this.actualLanguage = this.languages.find((lang) => lang.value === value);
  }
  
}
